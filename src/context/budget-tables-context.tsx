import { ReactNode, useState } from 'react';

import { BudgetTablesContext } from '@/hooks/use-budget-tables';
import { Table } from '@/routes/dashboard/budget/budget.types';

export const BudgetTablesProvider = ({
  children,
  initialBudgetTables,
}: {
  children: ReactNode;
  initialBudgetTables: Table[];
}) => {
  const [budgetTables, setBudgetTables] = useState<Table[]>(initialBudgetTables);

  return (
    <BudgetTablesContext.Provider value={{ budgetTables, setBudgetTables }}>{children}</BudgetTablesContext.Provider>
  );
};
