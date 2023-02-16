import axios from "axios";
import store from "@/utils/store/store";
import { userActions } from "./store/user-slice";

// redux state에 저장해놓은 AccessToken 있으면 반환하는 함수.
const loadAccessToken = () => {
  const state = store.getState();
  const user = state.user.user;
  const accessToken = state.user.access_token;
  if (!(user && accessToken)) {
    // 유저, AccessToken 둘 중 하나만 존재 => 유효하지 않은 로그인 상태
    store.dispatch(userActions.setUser({}));
    store.dispatch(userActions.setAccessToken(""));
  }
  return accessToken;
};
const loadRefreshToken = () => {
  const state = store.getState();
  const refreshToken = state.user.refresh_token;
  return refreshToken;
};
const changeAccessToken = (accessToken) => {
  store.dispatch(userActions.setAccessToken(accessToken));
};
const deleteAllUserData = () => {
  store.dispatch(userActions.setAccessToken(""));
  store.dispatch(userActions.setRefreshToken(""));
  store.dispatch(userActions.setUser({}));
};

const httpWithURL = (URL) => {
  const http = axios.create({
    baseURL: URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFTOKEN",
  });
  http.interceptors.request.use(
    (config) => {
      // 매 요청 전 AccessToken 있는지 확인하고, 있으면 header에 set하고 없으면 set 안 함.
      // console.log("쿠키값들:", document.cookie);
      const accessToken = loadAccessToken();
      config.headers["Authorization"] = accessToken
        ? `Bearer ${accessToken}`
        : "";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  http.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error);
      switch (error.response.status) {
        case 401:
        case 403:
          //Forbbiden
          const refreshToken = loadRefreshToken();
          axios
            .post(
              `${process.env.REACT_APP_USER_URL}token/refresh/`,
              { refresh: refreshToken },
              {
                withCredentials: true,
                xsrfCookieName: "csrftoken",
                xsrfHeaderName: "X-CSRFTOKEN",
              }
            )
            .then((response) => {
              switch (response.status) {
                case 200:
                  changeAccessToken(response.data.access);
                  break;
                default:
                  deleteAllUserData();
              }
              window.location.reload();
            })
            .catch((e) => {
              deleteAllUserData();
              window.location.reload();
            });
          break;
        default:
          break;
      }
      return Promise.reject(error);
    }
  );
  return http;
};

export default httpWithURL;
