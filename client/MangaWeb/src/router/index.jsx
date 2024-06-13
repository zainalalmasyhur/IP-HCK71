import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../Pages/Login";
import RootLayout from "../layout/Layout";
import Homepage from "../Pages/Homepage";
import Detail from "../Pages/Detail";
import Chapter from "../Pages/Chapter";
import Register from "../Pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    loader: () => {
      return localStorage.getItem("access_token")
        ? redirect("/homepage")
        : null;
    },
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/homepage",
    element: <RootLayout />,
    loader: () => {
      return !localStorage.getItem("access_token") ? redirect("/") : null;
    },
    children: [
      {
        path: "/homepage",
        element: <Homepage />,
      },
      {
        path: "/homepage/detail/:id",
        element: <Detail />,
      },
      {
        path: "/homepage/chapter/:chapterId", // Tambahkan rute baru untuk Chapter
        element: <Chapter />,
      },
    ],
  },
]);

export default router;
