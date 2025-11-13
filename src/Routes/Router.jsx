import { createBrowserRouter } from "react-router"; // ✅ fix
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import HomePage from "../Page/HomePage";
import Login from "../Page/Login";
import Register from "../Page/Register";
import ErrorPage from "../Page/ErrorPage";
import AllIssues from "../Page/AllIssues";
import AddIssue from "../Page/AddIssue";
import MyIssues from "../Page/MyIssues";
import Profile from "../Page/Profile";
import MyContribution from "../Page/MyContribution";
import IssueDetails from "../Page/IssueDetails";
import PrivateRoute from "../provider/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "all-issues",
        element: (
          <PrivateRoute>
            <AllIssues />
          </PrivateRoute>
        ),
      },
      {
        path: "addissue",
        element: (
          <PrivateRoute>
            <AddIssue />
          </PrivateRoute>
        ),
      },
      {
        path: "my-issues",
        element: (
          <PrivateRoute>
            <MyIssues />
          </PrivateRoute>
        ),
      },
      {
        path: "my-contribution",
        element: (
          <PrivateRoute>
            <MyContribution />
          </PrivateRoute>
        ),
      },
      {
        path: "issue/:id",
        element: (
          <PrivateRoute>
            <IssueDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  { path: "*", element: <ErrorPage /> },
]);

export default router;
