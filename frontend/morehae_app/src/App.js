import React, { Fragment } from "react";
import IndexPage from "./pages/index/IndexPage";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/Roadmap/MainPage";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route index element={<MainPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
