import React, { Suspense, lazy } from 'react';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import ErrorBoundary from '@/components/error-boundary';
import Layout from '@/components/layout';
import Loading from '@/components/loading';
import Dashboard from '@/routes/dashboard/dashboard';
import ForgotPassword from '@/routes/dashboard/forgot-password/forgot-password';
import ResetPassword from '@/routes/dashboard/reset-password/reset-password';
import Home from '@/routes/home/home';
import Login from '@/routes/login/login';
import SignUp from '@/routes/sign-up/sign-up';

const LazyCareers = lazy(() => import('@/routes/careers/careers'));
const LazyAbout = lazy(() => import('@/routes/about/about'));
const LazySecurity = lazy(() => import('@/routes/security/security'));
const LazyNotFound = lazy(() => import('@/routes/not-found/not-found'));
const LazyProtected = lazy(() => import('@/routes/protected/protected'));
const LazyDashboard = lazy(() => import('@/routes/dashboard/dashboard'));

const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType>) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

// Route configuration for better organization
const routes = [
  { path: '/', element: <Home />, errorElement: <ErrorBoundary /> },
  { path: '/signup/', element: <SignUp />, errorElement: <ErrorBoundary /> },
  { path: '/login/', element: <Login />, errorElement: <ErrorBoundary /> },
  { path: '/forgot-password/', element: <ForgotPassword />, errorElement: <ErrorBoundary /> },
  { path: '/reset-password/', element: <ResetPassword />, errorElement: <ErrorBoundary /> },

  // lazy-loaded routes
  { path: '/careers/', element: withSuspense(LazyCareers), errorElement: <ErrorBoundary /> },
  { path: '/about/', element: withSuspense(LazyAbout), errorElement: <ErrorBoundary /> },
  { path: '/security/', element: withSuspense(LazySecurity), errorElement: <ErrorBoundary /> },
  { path: '/404/', element: withSuspense(LazyNotFound) },

  { path: '*', element: <Navigate to="/404/" replace /> },
];

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      {routes.map(({ path, element, errorElement }) => (
        <Route key={path} path={path} element={element} errorElement={errorElement} />
      ))}

      {/* Protected routes */}
      <Route element={withSuspense(LazyProtected)}>
        <Route
          path="/dashboard/"
          element={withSuspense(LazyDashboard)}
          loader={Dashboard.loader}
          errorElement={<ErrorBoundary />}
        />
      </Route>
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
