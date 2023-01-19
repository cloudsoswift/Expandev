import React, { Fragment } from "react";
import IndexPage from "./pages/index/IndexPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route index element={<IndexPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
