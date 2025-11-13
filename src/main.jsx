import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./Routes/Router.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
  
      <ToastContainer position="top-right" autoClose={3000} />

       
    </AuthProvider>
  </StrictMode>
);