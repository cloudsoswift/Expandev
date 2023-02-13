import React, { Fragment } from "react";
import MainNavBar from "@/components/Navbar/MainNavBar";
// import IndexPage from "@/pages/Index/IndexPage";
import WelcomePage from "@/pages/Welcome/WelcomePage"
import { Outlet, Route, Routes } from "react-router-dom";
import RoadmapPage from "@/pages/Roadmap/RoadmapPage";
import SignIn from "@/pages/Sign/SignIn";
import SignUp from "@/pages/Sign/SignUp";
import BlogListPage from "@/pages/Blog/BlogListPage";
import BlogPostPage from "@/pages/Blog/BlogPostPage";
import BlogEditPage from "@/pages/Blog/BlogEditPage";
import BlogWritePage from "@/pages/Blog/BlogWritePage";
import UserMainPage from "@/pages/User/UserMainPage";
import UserInfoEditPage from "./pages/User/UserInfoEditPage";

import "@/style/basic.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import SignDone from "./pages/Sign/SignDone";


function App() {
  return (
    <Fragment>
      <MainNavBar />
      <Routes>
        {/* <Route index element={<IndexPage />} /> */}
        <Route index element={<WelcomePage />} />
        <Route path="roadmap" element={<RoadmapPage />} />
        <Route path="login" element={<SignIn />} />
        <Route path="done" element={<SignDone />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="blog" element={<Outlet />}>
          <Route index element={<BlogListPage />} />
          <Route path="recent" element={<BlogListPage />} />
          <Route path="tag/:tagName" element={<BlogListPage />} />
          <Route path="post/:postId" element={<Outlet />}>
            <Route index element={<BlogPostPage />} />
            <Route path="edit" element={<BlogEditPage />} />
          </Route>
          <Route path="write" element={<BlogWritePage />} />
        </Route>
        {/* <Route path="user" element={<UserMainPage />} /> */}
        <Route path="user" element={<Outlet />}>
          <Route path=":nickname" element={<UserMainPage/>} />
          <Route path=":nickname/edit" element={<UserInfoEditPage/>}/>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
