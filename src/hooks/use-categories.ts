import React, { createContext, useContext } from 'react';

import { Category } from '@/routes/dashboard/budget/budget.types';

interface CategoriesContextProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export const CategoriesContext = createContext<CategoriesContextProps | undefined>(undefined);

export const useCategories = (): CategoriesContextProps => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
};
