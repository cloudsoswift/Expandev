import { createSlice } from "@reduxjs/toolkit";
import http, { setAccessToken } from "@/utils/http";
import Cookies from "universal-cookie";

// CRA에는 dotenv가 내장되어 있어 별도로 호출할 필요가 없다.

const userSlice = createSlice({
  name: "user",
  initialState: {
    access_token: "",
    user: {},
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const userLogin = (loginData, navigate) => {
  return (dispatch) => {
    http(process.env.REACT_APP_USER_URL)
      .post("login/", loginData, {
        withCredentials: true,
      })
      .then(({ status, data }) => {
        switch (status) {
          case 200:
            return data;
          default:
            break;
        }
      })
      .then((data) => {
        // refresh token을 86,400초 (60초 * 60분 * 24시간 = 1일) 유지되는 httpOnly Cookie로 설정.
        // document.cookie = `refresh_token=${data.refresh_token};path=/;max-age=86400;httpOnly;`;
        const cookies = new Cookies();
        cookies.set("refresh_token", data.refresh_token, {
          path: "/",
          // httpOnly: true,
          maxAge: 86400,
        });
        console.log(cookies);
        setAccessToken(data.access_token);
        dispatch(
          userActions.setUser({
            ...data.user,
          })
        );
        // 로그인 후 로드맵 페이지로 이동
        navigate(-1, { replace: true });
      })
      .catch((e) => {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      });
  };
};

export const userLogout = (navigate) => {
  return (dispatch) => {
    http(process.env.REACT_APP_USER_URL)
      .post(process.env.REACT_APP_USER_URL + "logout/")
      .then((response) => {
        switch (response.status) {
          case 200:
          default:
            // Axios Default Header에 설정된 Access Token 삭제
            setAccessToken();
            dispatch(userActions.setUser({}));
            // 로그아웃 후 로드맵 페이지로 이동
            navigate("/roadmap");
        }
      })
      .catch((e) => {
        // Axios Default Header에 설정된 Access Token 삭제
        setAccessToken();
        dispatch(userActions.setUser({}));
        // 로그아웃 후 로드맵 페이지로 이동
        navigate("/roadmap");
      });
  };
};
export const userActions = userSlice.actions;
export default userSlice;
