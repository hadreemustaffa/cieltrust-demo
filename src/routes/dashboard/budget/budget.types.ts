import React from 'react';

export interface BudgetFormProps {
  id: number | null;
  name: string;
  is_recurring?: boolean;
  recurrence: string;
  start_date: string;
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
  start_date: string;
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
  start_date: string;
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
      onSubmit: (data: BudgetFormProps) => void;
      children: React.ReactNode;
    }
  | {
      variant: 'edit';
      table: Table;
      tables: Table[];
      onSubmit: (data: EditBudgetFormProps) => void;
      children: React.ReactNode;
    };

export type AddBudgetTableFormProps = {
  variant: 'add';
  tables: Table[];
  onSubmit: (data: BudgetFormProps) => void;
  children: React.ReactNode;
};

export type EditBudgetTableFormProps = {
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
