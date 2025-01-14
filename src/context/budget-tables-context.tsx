import { ReactNode, useState } from 'react';

import { UpcomingPaymentContext } from '@/hooks/use-upcoming-payment';
import { Table } from '@/routes/dashboard/budget/budget.types';

export const UpcomingPaymentProvider = ({
  children,
  initialBudgetTables,
}: {
  children: ReactNode;
  initialBudgetTables: Table[];
}) => {
  const [budgetTables, setBudgetTables] = useState<Table[]>(initialBudgetTables);

  return (
    <UpcomingPaymentContext.Provider value={{ budgetTables, setBudgetTables }}>
      {children}
    </UpcomingPaymentContext.Provider>
  );
};
