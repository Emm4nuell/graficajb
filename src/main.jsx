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
import MyResumePage from "./pages/MyResume/MyResume.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.tsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const router = createBrowserRouter([
  { path: "/", element: <RegisterPage /> },
  { path: "register", element: <RegisterPage /> },
  { path: "signin", element: <SignInPage /> },
  { path: "overview", element: <OverviewPage /> },
  { path: "opportunity", element: <OpportunityPage /> },
  {
    element: <PrivateRoute />, // <- tudo abaixo aqui é privado
    children: [
        { path: "myresume", element: <MyResumePage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer toastStyle={{ backgroundColor: '#3a3a3a', color: 'white' }}/>
    </AuthProvider>
  </StrictMode>
);
