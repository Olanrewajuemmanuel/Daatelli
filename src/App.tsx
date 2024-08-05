import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/404/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { routesMap } from "./constants";

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
    path: routesMap.feed,
    element: "<div>Feed</div>",
  },
];

const router = createBrowserRouter(routes);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
