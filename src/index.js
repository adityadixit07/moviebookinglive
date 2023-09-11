import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer, toast } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById("root"));
// backend server
axios.defaults.baseURL = "https://moviebookingserver.onrender.com";
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer
          toastStyle={{}}
          autoClose={1000}
          limit={3}
          position={toast.POSITION.TOP_CENTER}
        />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
