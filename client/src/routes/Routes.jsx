import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import ProductDetails from "../pages/ProductDetails";
import Registration from "../pages/authentication/Register";
import Login from './../pages/authentication/Login';
import PrivateRoute from "./PrivateRoute";


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
    path: '/productDetails/:id',
    element: <PrivateRoute><ProductDetails /></PrivateRoute>,
    // loader: () => fetch(`${import.meta.env.VITE_SERVER}/allBlogs`),
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