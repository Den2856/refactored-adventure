import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster
        position="top-center"
        richColors
        duration={4000}
        closeButton={false}
        icons={{
          error: null,
          success: null,
          info: null,
          warning: null,
          loading: null,
        }}
        toastOptions={{
          classNames: {
            toast: "!items-center",
            content: "!items-center",
            title: "!w-full !text-center",
            description: "!w-full !text-center",
          },
        }}
      />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);