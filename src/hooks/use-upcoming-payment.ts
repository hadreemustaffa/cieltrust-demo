import React, { createContext, useContext } from 'react';

import { Table } from '@/routes/dashboard/budget/budget.types';

export interface UpcomingPaymentContextProps {
  budgetTables: Table[];
  setBudgetTables: React.Dispatch<React.SetStateAction<Table[]>>;
}

export const UpcomingPaymentContext = createContext<UpcomingPaymentContextProps | undefined>(undefined);

export const useUpcomingPayment = (): UpcomingPaymentContextProps => {
  const context = useContext(UpcomingPaymentContext);
  if (!context) {
    throw new Error('useUpcomingPayment must be used within an UpcomingPaymentProvider');
  }
  return context;
};
