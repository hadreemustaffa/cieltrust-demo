import { SkeletonTheme } from 'react-loading-skeleton';
import { RouterProvider } from 'react-router-dom';

import { SessionProvider } from '@/context/session-context';

import { router } from '@/router';

const skeletonTheme = {
  baseColor: 'hsl(220, 13%, 15%)',
  highlightColor: 'hsl(220, 13%, 18%)',
};

function App() {
  return (
    <SessionProvider>
      <SkeletonTheme {...skeletonTheme}>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </SkeletonTheme>
    </SessionProvider>
  );
}

export default App;
