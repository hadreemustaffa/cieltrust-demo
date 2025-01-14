import React, { createContext, useContext } from 'react';

import { Table } from '@/routes/dashboard/budget/budget.types';

export interface BudgetTablesContextProps {
  budgetTables: Table[];
  setBudgetTables: React.Dispatch<React.SetStateAction<Table[]>>;
}

export const BudgetTablesContext = createContext<BudgetTablesContextProps | undefined>(undefined);

export const useBudgetTables = (): BudgetTablesContextProps => {
  const context = useContext(BudgetTablesContext);
  if (!context) {
    throw new Error('useBudgetTables must be used within an BudgetTablesProvider');
  }
  return context;
};
