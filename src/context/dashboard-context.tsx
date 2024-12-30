import { ReactNode, useState } from 'react';

import { DashboardContext } from '@/hooks/use-dashboard';

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [dashboardId, setDashboardId] = useState<number | null>(null);

  return <DashboardContext.Provider value={{ dashboardId, setDashboardId }}>{children}</DashboardContext.Provider>;
};
