import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import { lazy } from "react";
import { seriesLoader } from "./loaders/seriesLoader";
import { userLoader } from "./loaders/userLoader";
import ConfirmEmail from "./pages/Security/ConfirmEmail/ConfirmEmail";
import ForgotPassword from "./pages/Security/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Security/ResetPassword/ResetPassword";
import ProtectedRouteUserConnected from "./components/ProtectedRoute/ProtectedRouteUserConnected";
import ProtectedRouteAdmin from "./components/ProtectedRoute/ProtectedRouteAdmin";
import ProtectedRouteUserNotConnected from "./components/ProtectedRoute/ProtectedRouteUserNotCoonected";
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const Details = lazy(() => import("./pages/Details/Details"));
const Login = lazy(() => import("./pages/Forms/Login/Login"));
const Register = lazy(() => import("./pages/Forms/Register/Register"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Favorites = lazy(() => import("./pages/Favorites/Favorites"));
const Admin = lazy(() => import("./pages/Admin/Admin"));
const AddASerie = lazy(() =>
  import("./pages/Admin/components/AddASerie/AddASerie")
);
const SerieList = lazy(() =>
  import("./pages/Admin/components/SerieList/SerieList")
);

const combinedLoader = async () => {
  return { series: await seriesLoader(), users: await userLoader() };
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: combinedLoader,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
      {
        path: "/login",
        element: (
          <ProtectedRouteUserNotConnected>
            <Login />
          </ProtectedRouteUserNotConnected>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedRouteUserNotConnected>
            <Register />
          </ProtectedRouteUserNotConnected>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRouteUserConnected>
            <Profile />
          </ProtectedRouteUserConnected>
        ),
      },
      {
        path: "/confirmEmail",
        element: (
          <ProtectedRouteUserNotConnected>
            <ConfirmEmail />
          </ProtectedRouteUserNotConnected>
        ),
      },
      {
        path: "/forgotPassword",
        element: (
          <ProtectedRouteUserNotConnected>
            <ForgotPassword />
          </ProtectedRouteUserNotConnected>
        ),
      },
      {
        path: "/resetPassword",
        element: (
          <ProtectedRouteUserNotConnected>
            <ResetPassword />
          </ProtectedRouteUserNotConnected>
        ),
      },
      {
        path: "/favorites",
        element: (
          <ProtectedRouteUserConnected>
            <Favorites />
          </ProtectedRouteUserConnected>
        ),
      },
      {
        path: "/admin",
        element: (
          <ProtectedRouteAdmin>
            <Admin />
          </ProtectedRouteAdmin>
        ),
        children: [
          {
            index: true,
            element: <AddASerie />,
          },
          {
            path: "serieList",
            element: <SerieList />,
          },
          {
            path: "editSerie/:id",
            element: <AddASerie />,
          },
        ],
      },
      {
        path: "*",
        element: <Homepage />,
      },
    ],
  },
]);
