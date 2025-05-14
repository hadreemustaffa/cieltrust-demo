import React from 'react';

export interface AddBudgetFormProps {
  id: number | null;
  name: string;
  amount: number;
  categories?: Category[];
  new_category?: string;
  addCategories?: Category[];
  state?: Table[];
}

export interface EditBudgetFormProps {
  id: number | null;
  name: string;
  amount: number;
  editCategories?: Category[];
  state: Table[];
}

export interface BudgetProps {
  data: Table[];
}

export type Table = {
  id: number;
  name: string;
  budget_categories: CategoryWithAmount[];
  amount: number;
  remaining?: number;
};

export interface BudgetTableProps {
  table: Table;
  children: React.ReactNode;
}

export type BudgetTableFormProps =
  | {
      variant: 'add';
      table?: Table;
      tables: Table[];
      onSubmit: (data: AddBudgetFormProps) => void;
      children: React.ReactNode;
    }
  | {
      variant: 'edit';
      table: Table;
      tables: Table[];
      onSubmit: (data: EditBudgetFormProps) => void;
      children: React.ReactNode;
    };

export interface DeleteBudgetTableProps {
  id: number | null;
}

export type Category = {
  id: number;
  name: string;
  selected?: boolean;
};

export type CategoryWithAmount = Category & {
  budget_id: number;
  category_id: number;
  amount: number;
  spent: number;
};

export interface BudgetTableCategoryProps {
  category: CategoryWithAmount;
}
