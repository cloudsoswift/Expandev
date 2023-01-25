import axios from "axios";

const URL = "" // 통신에 사용할 API 서버 주소

export default axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  }
});