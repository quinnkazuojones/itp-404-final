import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { GlobalStyles } from "./config/GlobalStyles";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./config/Context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("root")
);
