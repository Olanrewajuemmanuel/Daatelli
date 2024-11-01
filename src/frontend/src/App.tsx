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
import { FeaturesContext } from "./contexts";
import ResearchPosts from "./components/research/posts/ResearchPosts";
import Events from "./components/events";
import CollaborativeProjects from "./components/collabs";
import Topics from "./components/topics";
import TopResearchers from "./components/research/TopResearchers";
import Communities from "./components/communities";
import ResearchTrends from "./components/research/trends";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Shorts from "./components/shorts";
import ViewFinding from "./pages/Findings/ViewFinding";

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
    children: [
      {
        path: "",
        element: <ResearchPosts />,
      },
      {
        path: routesMap.shorts,
        element: <Shorts />,
      },
      {
        path: routesMap.communities,
        element: <Communities />,
      },
      {
        path: routesMap.topResearchers,
        element: <TopResearchers />,
      },
      {
        path: routesMap.trends,
        element: <ResearchTrends />,
      },
      {
        path: routesMap.hotTopics,
        element: <Topics />,
      },
      {
        path: routesMap.collaborativeProjects,
        element: <CollaborativeProjects />,
      },
      {
        path: routesMap.eventsWebinars,
        element: <Events />,
      },
    ]
  },
  {
    path: routesMap.addFindings,
    element: <ProtectedRoute><AddFinding /></ProtectedRoute>,
  },
  {
    path: `${routesMap.viewFinding}/:id`,
    element: <ProtectedRoute><ViewFinding /></ProtectedRoute>,
  },
];

const router = createBrowserRouter(routes);
function App() {
  return <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <FeaturesContext.Provider value={['auth', 'feed', 'profile', 'settings', 'findings']}>
      <Suspense fallback={<LoadingComponent />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </FeaturesContext.Provider>
    <ToastContainer />
  </CookiesProvider>;
}

export default App;
