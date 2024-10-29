import { createBrowserRouter } from "react-router-dom";

import StartPage from "../pages/StartPage";
import Profile from "../pages/Profile";
import MeetupsPage from "../pages/MeetupsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/meetups",
    element: <MeetupsPage />,
  },
]);

export default router;
