import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import Registration from "../pages/authentication/Register";
import Login from './../pages/authentication/Login';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        // loader: () => fetch(`${import.meta.env.VITE_SERVER}/allBlogs`),
      },
    ],
  },
      {
        path: "/login",
        element: <Login />,
        // loader: () => fetch(`${import.meta.env.VITE_SERVER}/allBlogs`),
      },
      {
        path: "/registration",
        element: <Registration />,
        // loader: () => fetch(`${import.meta.env.VITE_SERVER}/allBlogs`),
      },

]);

export default router;