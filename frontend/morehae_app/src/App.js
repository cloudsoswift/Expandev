import React, { Fragment } from "react";
import MainNavBar from "@/components/Navbar/MainNavBar";
import IndexPage from "@/pages/Index/IndexPage";
import { Route, Routes } from "react-router-dom";
import MainPage from "@/pages/Main/MainPage";
import Example from "@/pages/Roadmap/example";
import SignIn from "@/pages/Sign/SignIn";
import SignUp from "@/pages/Sign/SignUp";

import "@/style/basic.css";

function App() {
  return (
    <Fragment>
      <MainNavBar />
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="roadmap" element={<Example />} />
        <Route path="login" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </Fragment>
  );
}

export default App;