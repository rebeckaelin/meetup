import { createBrowserRouter } from "react-router-dom";

import StartPage from "../pages/StartPage";
import Profile from "../pages/Profile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export default router;
