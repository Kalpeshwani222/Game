import { createBrowserRouter, Navigate } from "react-router-dom";
import Register from "pages/Register";
import Login from "pages/Login";
import Dashboard from "pages/Dashboard";
import ProtectedRoute from "utils/ProtectedRoutes";
import { isLoggedIn } from "utils/localStorageOperations";

const router = createBrowserRouter([
  {
    path: "/",
    element: "",
    children: [
      {
        path: "",
        element: isLoggedIn() ? <Navigate to="/dashboard" /> : <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
