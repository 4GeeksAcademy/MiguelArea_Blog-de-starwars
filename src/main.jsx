import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./hooks/useGlobalReducer"; // <- Aquí está el hook con el contexto
import Layout from "./pages/Layout";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);
