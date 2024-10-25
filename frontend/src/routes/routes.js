import { createBrowserRouter } from "react-router-dom";
import Register from "pages/Register";
import Login from "pages/Login";
import Dashboard from "pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: "",
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
