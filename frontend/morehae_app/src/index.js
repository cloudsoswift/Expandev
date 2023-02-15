import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import { Provider } from "react-redux";
import store from "@/utils/store/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/lib/persistStore";
import ScrollbarControl from "./components/Modal/ScrollbarControl";



const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollbarControl/>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
