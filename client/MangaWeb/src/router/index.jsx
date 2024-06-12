import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../Pages/Login";
import RootLayout from "../layout/Layout";
import Homepage from "../Pages/Homepage";
import Detail from "../Pages/Detail";

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
    path: "/homepage",
    element: <RootLayout />,
    children: [
      {
        path: "/homepage",
        element: <Homepage />,
      },
      {
        path: "/homepage/detail/:id",
        element: <Detail />,
      },
    ],
  },
]);

export default router;
