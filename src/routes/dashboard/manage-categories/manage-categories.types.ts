import React from 'react';

import { Category, Table } from '@/routes/dashboard/budget/budget.types';

export interface CategoryItemProps {
  category: Category;
  tables: Table[];
  dashboardId: number | null;
  onDelete: (category: Category) => void;
}

export interface addCategoryProps {
  name: string;
  dashboardId: number | null;
  setState: (value: React.SetStateAction<Category[]>) => void;
}

export interface updateCategoryProps {
  category: Category;
  dashboardId: number | null;
  tables: Table[];
  name: string;
  setState: (value: React.SetStateAction<string>) => void;
}

export interface deleteCategoryProps {
  category: Category;
  dashboardId: number | null;
  tables: Table[];
}
