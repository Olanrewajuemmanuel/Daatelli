import { Suspense } from "react";
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
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import RoadMap from "./pages/RoadMap";
import AddFinding from "./pages/Findings/AddFinding";
import LoadingComponent from "./components/loading/LoadingComponent";
import Developers from "./pages/Developers";
import About from "./pages/About";
import Organisation from "./pages/Organisation";

const routes = [
  {
    path: routesMap.home,
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: routesMap.about,
    element: <About />,
  },
  {
    path: routesMap.developers,
    element: <Developers />,
  },
  {
    path: routesMap.roadmap,
    element: <RoadMap />,
  },
  {
    path: routesMap.genesis,
    element: <Organisation />
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
  {
    path: routesMap.addFindings,
    element: <ProtectedRoute><AddFinding /></ProtectedRoute>,
  },
];

const router = createBrowserRouter(routes);
function App() {
  return <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <Suspense fallback={<LoadingComponent />}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  </CookiesProvider>;
}

export default App;
