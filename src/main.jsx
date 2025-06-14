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
import OverviewPage from "./pages/Overview/Overview.tsx";
import OpportunityPage from "./pages/Opportunity/Opportunity.tsx";

const router = createBrowserRouter([
  { path: "/", element: <RegisterPage /> },
  { path: "signin", element: <SignInPage /> },
  { path: "overview", element: <OverviewPage /> },
  { path: "opportunity", element: <OpportunityPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
