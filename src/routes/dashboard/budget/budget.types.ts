import React from 'react';

export interface AddBudgetFormProps {
  id: number | null;
  name: string;
  is_recurring?: boolean;
  recurrence: string;
  start_date: string | null;
  amount: number;
  fields?: Category[];
  new_category?: string;
  addCategories?: Category[];
  state?: Table[];
}

export interface EditBudgetFormProps {
  id: number | null;
  name: string;
  amount: number;
  is_recurring?: boolean;
  recurrence: string;
  start_date: string | null;
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
  is_recurring: boolean;
  recurrence: string;
  start_date: string | null;
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
  id?: number;
  name: string;
  selected?: boolean;
};

export type CategoryWithAmount = Category & {
  amount: number;
  spent: number;
};

export interface BudgetTableCategoryProps {
  category: CategoryWithAmount;
}
