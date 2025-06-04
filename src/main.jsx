import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RegisterPage from "./pages/Register/Register.tsx";
import SignInPage from "./pages/SignIn/SignIn.tsx";

const router = createBrowserRouter([
  { path: "/", element: <RegisterPage /> },
  { path: "/login", element: <SignInPage /> },
  { index: true, element: <RegisterPage /> },
  { path: "*", element: <Navigate to={"/"} replace /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
