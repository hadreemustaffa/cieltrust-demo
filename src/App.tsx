import { Suspense, lazy } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import ErrorBoundary from '@/components/error-boundary';
import Layout from '@/components/layout';
import Loading from '@/components/loading';
import { DashboardProvider } from '@/context/dashboard-context';
import { SessionProvider } from '@/context/session-context';
import Dashboard from '@/routes/dashboard/dashboard';
import Home from '@/routes/home/home';
import Login from '@/routes/login/login';
import SignUp from '@/routes/sign-up/sign-up';

const LazyCareers = lazy(() => import('@/routes/careers/careers'));
const LazyAbout = lazy(() => import('@/routes/about/about'));
const LazySecurity = lazy(() => import('@/routes/security/security'));
const LazyNotFound = lazy(() => import('@/routes/not-found/not-found'));
const LazyProtected = lazy(() => import('@/routes/protected/protected'));
const LazyDashboard = lazy(() => import('@/routes/dashboard/dashboard'));

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
      <Route path="/signup/" element={<SignUp />} errorElement={<ErrorBoundary />} />
      <Route path="/login/" element={<Login />} errorElement={<ErrorBoundary />} />
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
          loader={Dashboard.loader}
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
      <DashboardProvider>
        <SkeletonTheme baseColor="hsl(220, 13%, 15%)" highlightColor="hsl(220, 13%, 18%)">
          <RouterProvider router={router} future={{ v7_startTransition: true }} />
        </SkeletonTheme>
      </DashboardProvider>
    </SessionProvider>
  );
}

export default App;
