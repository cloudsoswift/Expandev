import React, { Fragment } from "react";
import MainNavBar from "@/components/Navbar/MainNavBar";
import IndexPage from "@/pages/Index/IndexPage";
import { Outlet, Route, Routes } from "react-router-dom";
import MainPage from "@/pages/Main/MainPage";
import SignIn from "@/pages/Sign/SignIn";
import SignUp from "@/pages/Sign/SignUp";
import BlogListPage from "@/pages/Blog/BlogListPage";
import BlogPostPage from "@/pages/Blog/BlogPostPage";
import BlogEditPage from "@/pages/Blog/BlogEditPage";
import BlogWritePage from "@/pages/Blog/BlogWritePage";

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
        <Route path="blog" element={<Outlet />}>
          <Route index element={<BlogListPage />} />
          <Route path="recent" element={<BlogListPage />} />
          <Route path="post/:postId" element={<BlogPostPage />}>
            <Route index element={<BlogPostPage />} />
            <Route path="edit" element={<BlogEditPage />} />
          </Route>
          <Route path="write" element={<BlogWritePage />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;