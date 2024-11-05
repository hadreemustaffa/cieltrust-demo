import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// components import
import Layout from "./components/Layout";
import Home from "./routes/Home/Home";
import Careers from "./routes/Careers/Careers";
import About from "./routes/About/About";
import Security from "./routes/Security/Security";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/yourbank/" element={<Home />} />
      <Route path="/yourbank/careers/" element={<Careers />} />
      <Route path="/yourbank/about/" element={<About />} />
      <Route path="/yourbank/security/" element={<Security />} />

      {/* <Route path='/404' element={<NotFound />} /> */}

      {/* <Route path='*' element={<Navigate to='/404' replace />} /> */}
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
