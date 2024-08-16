import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        // index: true,
        // element: <Home />,
        // loader: () => fetch(`${import.meta.env.VITE_SERVER}/allBlogs`),
      },
    ],
  },
]);

export default router;