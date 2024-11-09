import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

// components import
import Layout from "./components/Layout";
import Home from "./routes/tmp/Home/Home";
import Careers from "./routes/tmp/Careers/Careers";
import About from "./routes/tmp/About/About";
import Security from "./routes/tmp/Security/Security";
import SignUp from "./routes/tmp/SignUp/SignUp";
import Login from "./routes/tmp/Login/Login";
import NotFound from "./routes/tmp/NotFound/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/yourbank/" element={<Home />} />
      <Route path="/yourbank/careers/" element={<Careers />} />
      <Route path="/yourbank/about/" element={<About />} />
      <Route path="/yourbank/security/" element={<Security />} />
      <Route path="/yourbank/signup/" element={<SignUp />} />
      <Route path="/yourbank/login/" element={<Login />} />

      <Route path="/yourbank/404/" element={<NotFound />} />

      <Route path="*" element={<Navigate to="/yourbank/404/" replace />} />
    </Route>,
  ),
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
