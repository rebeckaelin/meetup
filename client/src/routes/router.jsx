import { createBrowserRouter } from "react-router-dom";

import StartPage from "../pages/StartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
]);

export default router;
