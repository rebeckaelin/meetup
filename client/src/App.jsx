import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import "./App.css";

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
