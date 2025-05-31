import { SkeletonTheme } from 'react-loading-skeleton';
import { RouterProvider } from 'react-router-dom';

import { SessionProvider } from '@/context/session-context';

import { router } from '@/router';

const skeletonTheme = {
  baseColor: 'hsla(var(--skeleton), 0.85)',
  highlightColor: 'hsla(var(--skeleton),0.5)',
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
