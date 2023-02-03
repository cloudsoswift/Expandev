import axios from "axios";

const http = axios.create({
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

export const setAccessToken = (token) => {
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
  http.defaults.baseURL = URL;
  return http;
};

export default httpWithURL;
