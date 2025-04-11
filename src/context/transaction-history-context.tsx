import { ReactNode, useState } from 'react';

import { TransactionHistoryContext } from '@/hooks/use-transaction-history';
import { Transaction } from '@/routes/dashboard/transaction-history/transaction-history.types';

export const TransactionHistoryProvider = ({
  children,
  initialHistory,
}: {
  children: ReactNode;
  initialHistory: Transaction[];
}) => {
  const [history, setHistory] = useState<Transaction[]>(initialHistory);

  return (
    <TransactionHistoryContext.Provider value={{ history, setHistory }}>{children}</TransactionHistoryContext.Provider>
  );
};
