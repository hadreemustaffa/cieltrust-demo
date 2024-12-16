import { createContext, useContext, useState, ReactNode } from "react";

interface DashboardContextProps {
  dashboardId: number | null;
  setDashboardId: (id: number) => void;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(
  undefined,
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [dashboardId, setDashboardId] = useState<number | null>(null);

  return (
    <DashboardContext.Provider value={{ dashboardId, setDashboardId }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): DashboardContextProps => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
