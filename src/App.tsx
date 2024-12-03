import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import { SessionProvider } from "./context/SessionContext";

// components import
import Layout from "./components/Layout";
import Home from "./routes/Home/Home";
import SignUp from "./routes/SignUp/SignUp";
import Login from "./routes/Login/Login";
import { dashboardLoader } from "./routes/Dashboard/Dashboard";
import ErrorBoundary from "./components/ErrorBoundary";
import Loading from "./components/Loading";
import { SkeletonTheme } from "react-loading-skeleton";

const LazyCareers = lazy(() => import("./routes/Careers/Careers"));
const LazyAbout = lazy(() => import("./routes/About/About"));
const LazySecurity = lazy(() => import("./routes/Security/Security"));
const LazyNotFound = lazy(() => import("./routes/NotFound/NotFound"));
const LazyProtected = lazy(() => import("./routes/Protected/Protected"));
const LazyDashboard = lazy(() => import("./routes/Dashboard/Dashboard"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} errorElement={<ErrorBoundary />} />
      <Route
        path="/careers/"
        element={
          <Suspense fallback={<Loading />}>
            <LazyCareers />
          </Suspense>
        }
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/about/"
        element={
          <Suspense fallback={<Loading />}>
            <LazyAbout />
          </Suspense>
        }
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/security/"
        element={
          <Suspense fallback={<Loading />}>
            <LazySecurity />
          </Suspense>
        }
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
      <Route
        element={
          <Suspense fallback={<Loading />}>
            <LazyProtected />
          </Suspense>
        }
      >
        <Route
          path="/dashboard/"
          element={
            <Suspense fallback={<Loading />}>
              <LazyDashboard />
            </Suspense>
          }
          loader={dashboardLoader}
          errorElement={<ErrorBoundary />}
        />
      </Route>

      <Route
        path="/404/"
        element={
          <Suspense fallback={<Loading />}>
            <LazyNotFound />
          </Suspense>
        }
      />

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
      <SkeletonTheme
        baseColor="hsl(220, 13%, 15%)"
        highlightColor="hsl(220, 13%, 18%)"
      >
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </SkeletonTheme>
    </SessionProvider>
  );
}

export default App;
