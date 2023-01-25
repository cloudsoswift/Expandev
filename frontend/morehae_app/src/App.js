import React, { Fragment } from "react";
import MainNavBar from "@/components/Navbar/MainNavBar";
import IndexPage from "@/pages/index/IndexPage";
import { Route, Routes } from "react-router-dom";
import MainPage from "@/pages/Main/MainPage";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

import "@/style/basic.css";

function App() {
  return (
    <Fragment>
      <MainNavBar />
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="roadmap" element={<MainPage />} />
        <Route path="login" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </Fragment>
  );
}

export default App;
