import axios from "axios";
import store from "@/utils/store/store";

const http = axios.create({
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

export const setAxiosAccessToken = (token) => {
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common["Authorization"];
  }
};

http.interceptors.request.use(
  (response) => response,
  (error) => error,
);

const httpWithURL = (URL) => {
  const state = store.getState();
  const accessToken = state.user.access_token;
  setAxiosAccessToken(accessToken);
  http.defaults.baseURL = URL;
  return http;
};

export default httpWithURL;
