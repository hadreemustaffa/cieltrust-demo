import { ReactNode, useState } from 'react';

import { OverviewContext } from '@/hooks/use-overview';

import { Overview } from '@/routes/dashboard/account-overview/account-overview.types';

export const OverviewProvider = ({ children, initialOverview }: { children: ReactNode; initialOverview: Overview }) => {
  const [overview, setOverview] = useState<Overview>(initialOverview);

  return <OverviewContext.Provider value={{ overview, setOverview }}>{children}</OverviewContext.Provider>;
};
