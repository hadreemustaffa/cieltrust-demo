import { Navigate, Outlet } from 'react-router-dom';

import { useSession } from '@/hooks/use-session';

export default function Protected() {
  const { session } = useSession();

  if (!session) {
    return <Navigate to="/login/" />;
  } else {
    return <Outlet />;
  }
}
