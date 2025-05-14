import { createContext, useContext } from 'react';

export interface DashboardContextProps {
  dashboardId: number;
  setDashboardId: (id: number) => void;
}

export const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const useDashboard = (): DashboardContextProps => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
