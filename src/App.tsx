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
import Dashboard, { dashboardLoader } from "./routes/Dashboard/Dashboard";
import Protected from "./routes/Protected/Protected";
import { SessionProvider } from "./context/SessionContext";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} errorElement={<ErrorBoundary />} />
      <Route
        path="/careers/"
        element={<Careers />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/about/"
        element={<About />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/security/"
        element={<Security />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/signup/"
        element={<SignUp />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/login/"
        element={<Login />}
        errorElement={<ErrorBoundary />}
      />
      <Route element={<Protected />}>
        <Route
          path="/dashboard/"
          element={<Dashboard />}
          loader={dashboardLoader}
          errorElement={<ErrorBoundary />}
        />
      </Route>

      <Route path="/404/" element={<NotFound />} />

      <Route path="*" element={<Navigate to="/404/" replace />} />
    </Route>,
  ),
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_skipActionErrorRevalidation: true,
      v7_partialHydration: true,
    },
  },
);

function App() {
  return (
    <SessionProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </SessionProvider>
  );
}

export default App;
