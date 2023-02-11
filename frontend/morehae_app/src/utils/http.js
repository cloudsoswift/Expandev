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
      console.log(document.cookie);
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
          axios
            .post(
              `${process.env.REACT_APP_USER_URL}verify/token/refresh/cookie`,
              {},
              {
                withCredentials: true,
              }
            )
            .then((response) => {
              console.log(response);
            });
          console.log("토큰이 만료되었읍니다.");
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
