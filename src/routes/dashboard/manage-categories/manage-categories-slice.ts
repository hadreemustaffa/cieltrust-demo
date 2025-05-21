import { EntityState } from '@reduxjs/toolkit';

import { Table } from '@/routes/dashboard/budget/budget.types';
import { Category } from '@/routes/dashboard/categories/categories.types';

export type NewCategory = Pick<Category, 'name'> & { dashboardId: number };
export type UpdateCategory = Category & { dashboardId: number };
export interface DeleteCategory {
  categoryIds: number[];
  dashboardId: number;
  tables: Table[];
}

export interface manageCategoriesState extends EntityState<Category, number> {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}
