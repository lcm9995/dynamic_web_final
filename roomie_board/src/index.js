import React from "react";
import { createRoot } from "react-dom/client";
//import { Provider } from "react-redux";
import {UserProvider} from "./context/UserContext";
//import { store } from "./store";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
