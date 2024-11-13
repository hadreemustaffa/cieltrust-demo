import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

// components import
import Layout from "./components/Layout";
import Home from "./routes/Home/Home";
import Careers from "./routes/Careers/Careers";
import About from "./routes/About/About";
import Security from "./routes/Security/Security";
import SignUp from "./routes/SignUp/SignUp";
import Login from "./routes/Login/Login";
import NotFound from "./routes/NotFound/NotFound";
import Dashboard from "./routes/Dashboard/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/careers/" element={<Careers />} />
      <Route path="/about/" element={<About />} />
      <Route path="/security/" element={<Security />} />
      <Route path="/signup/" element={<SignUp />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/dashboard/" element={<Dashboard />} />

      <Route path="/404/" element={<NotFound />} />

      <Route path="*" element={<Navigate to="/404/" replace />} />
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
