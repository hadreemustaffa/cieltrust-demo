import React from 'react';

import { Table } from '@/routes/dashboard/budget/budget.types';
import { CategoryWithAmount } from '@/routes/dashboard/categories/categories.types';

export interface BudgetTableCategoryProps {
  category: CategoryWithAmount;
}

export interface AddBudgetTableCategoryFormData {
  category: CategoryWithAmount;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  setTable: React.Dispatch<React.SetStateAction<Table[]>>;
}
