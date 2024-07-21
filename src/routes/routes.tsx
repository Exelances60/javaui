import Login from "@/pages/Login/login";
import Register from "@/pages/Register/register";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <div>404</div>,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <div>404</div>,
  },
]);
