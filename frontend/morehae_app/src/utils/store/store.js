// Redux로 관리할 전역 상태 변수들이 저장될 객체.

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/utils/store/user-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
})

export default store;