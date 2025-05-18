import { SkeletonTheme } from 'react-loading-skeleton';
import { RouterProvider } from 'react-router-dom';

import { DashboardProvider } from '@/context/dashboard-context';
import { SessionProvider } from '@/context/session-context';

import { router } from '@/router';

const skeletonTheme = {
  baseColor: 'hsl(220, 13%, 15%)',
  highlightColor: 'hsl(220, 13%, 18%)',
};

function App() {
  return (
    <SessionProvider>
      <DashboardProvider>
        <SkeletonTheme {...skeletonTheme}>
          <RouterProvider router={router} future={{ v7_startTransition: true }} />
        </SkeletonTheme>
      </DashboardProvider>
    </SessionProvider>
  );
}

export default App;
