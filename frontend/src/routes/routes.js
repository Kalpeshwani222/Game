import { createBrowserRouter } from "react-router-dom";
import Register from "pages/Register";
import Login from "pages/Login";

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
        element: <h1>dashboard............</h1>,
      },
    ],
  },
]);

export default router;
