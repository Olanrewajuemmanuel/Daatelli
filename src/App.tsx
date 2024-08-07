import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/404/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { routesMap } from "./constants";
import { CookiesProvider } from "react-cookie";
import Feed from "./pages/Feed";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

const routes = [
  {
    path: routesMap.home,
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: routesMap.login,
    element: <Login />,
  },
  {
    path: routesMap.register,
    element: <Register />,
  },
  {
    path: routesMap.forgotPassword,
    element: <ForgotPassword />,
  },
  {
    path: routesMap.resetPassword,
    element: <ResetPassword />,
  },
  {
    path: routesMap.feed,
    element: <ProtectedRoute><Feed /></ProtectedRoute>,
  },
];

const router = createBrowserRouter(routes);
function App() {
  return <CookiesProvider defaultSetOptions={{ path: '/' }}><RouterProvider router={router}></RouterProvider></CookiesProvider>;
}

export default App;
