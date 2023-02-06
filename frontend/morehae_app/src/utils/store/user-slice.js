import { createSlice } from "@reduxjs/toolkit";

// CRA에는 dotenv가 내장되어 있어 별도로 호출할 필요가 없다.

export const userSlice = createSlice({
  name: "user",
  initialState: {
    access_token: "",
    user: {},
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setAccessToken(state, action) {
      state.access_token = action.payload;
    }
  },
});

export const userActions = userSlice.actions;
export default userSlice;
