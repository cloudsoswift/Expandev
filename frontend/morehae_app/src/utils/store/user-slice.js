import { createSlice } from "@reduxjs/toolkit"
import http, { setAccessToken } from "@/utils/http"

// CRA에는 dotenv가 내장되어 있어 별도로 호출할 필요가 없다.

const userSlice = createSlice({
  name: "user",
  initialState: {
    access_token: "",
    user: {},
  }, reducers: {
    setUser(state, action) {
      state.user = action.payload;
    }
  }
})

export const userLogin = (loginData, navigate) => {
  return (dispatch) => {
    http(process.env.REACT_APP_USER_URL).post("login/", loginData,{
      // withCredentials: true,
    })
    .then(({status, data}) => {
      switch(status){
        case 200:
          return data;
        default:
          break;
      }
    })
    .then((data) => {
      // refresh token을 86,400초 (60초 * 60분 * 24시간 = 1일) 유지되는 httpOnly Cookie로 설정.
      document.cookie = `refresh_token=${data.refresh_token}; max-age=86400; httpOnly;`;
      setAccessToken(data.access_token);
      dispatch(userActions.setUser({
        ...data.user,
      }))
      navigate("/");
    })
  }
}

export const userLogout = (navigate) => {
  return (dispatch) => {
    http(process.env.REACT_APP_USER_URL).post(process.env.REACT_APP_USER_URL + "logout/")
    .then((response) => {
      switch(response.status){
        case 200:
        default:
          // Axios Default Header에 설정된 Access Token 삭제
          setAccessToken();
          dispatch(userActions.setUser({}));
          navigate("/");
      }
    })
  }
}
export const userActions = userSlice.actions;
export default userSlice;