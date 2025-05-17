import { ReactNode, useState } from 'react';

import { CategoriesContext } from '@/hooks/use-categories';

import { Category } from '@/routes/dashboard/budget/budget.types';

export const CategoriesProvider = ({
  children,
  initialCategories,
}: {
  children: ReactNode;
  initialCategories: Category[];
}) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  return <CategoriesContext.Provider value={{ categories, setCategories }}>{children}</CategoriesContext.Provider>;
};
