import React, { Fragment } from "react";
import MainNavBar from "./components/navbar/MainNavBar";
import IndexPage from "./pages/IndexPage";
import { Route, Routes } from "react-router-dom";
import RoadMap from "./components/RoadMap";
function App() {
  return (
    <Fragment>
      <MainNavBar />
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="roadmap" element={<RoadMap />} />
      </Routes>
    </Fragment>
  );
}

export default App;
