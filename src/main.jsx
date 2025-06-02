import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./app/login/LoginPage.js";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { index: true, element: <LoginPage /> },
  { path: "*", element: <Navigate to={"/"} replace /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
