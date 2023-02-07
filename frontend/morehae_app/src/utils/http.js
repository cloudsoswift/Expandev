import axios from "axios";
import store from "@/utils/store/store";
import { userActions } from "./store/user-slice";

// const http = axios.create({
//   baseURL: process.env.REACT_APP_SERVER_URL,
//   headers: {
//     "Content-Type": "application/json;charset=utf-8",
//   },
// });

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    switch(error.response.status){
      case 401:
        //Unauthorized
        // axios.post("http://i8d212.p.ssafy.io:8000/accounts/token/refresh/", )
        console.log("토큰이 만료되었읍니다.");
        break;
      default:
        break;
    }
    return Promise.reject(error);
  },
);

const httpWithURL = (URL) => {
  const state = store.getState();
  const user = state.user.user;
  const accessToken = state.user.access_token;
  if(!(user && accessToken)) {
    // 유저, AccessToken 둘 중 하나만 존재 => 유효하지 않은 로그인 상태
    store.dispatch(userActions.setUser({}));
    store.dispatch(userActions.setAccessToken(""));
  }
  return axios.create({
    baseURL: URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      ...(accessToken ? {"Authorization": `Bearer ${accessToken}`} : {} ),
    },
  });
};

export default httpWithURL;
