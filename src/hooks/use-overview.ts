import React, { createContext, useContext } from 'react';

import { Overview } from '@/routes/dashboard/account-overview/account-overview.types';

interface OverviewContextProps {
  overview: Overview;
  setOverview: React.Dispatch<React.SetStateAction<Overview>>;
}

export const OverviewContext = createContext<OverviewContextProps | undefined>(undefined);

export const useOverview = (): OverviewContextProps => {
  const context = useContext(OverviewContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
};
