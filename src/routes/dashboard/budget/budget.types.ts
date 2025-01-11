import React from 'react';

export interface BudgetFormProps {
  id: number | null;
  name: string;
  recurrence: string;
  start_date: string;
  amount: number;
  fields?: Category[];
  new_category?: string;
  addCategories?: Category[];
  state?: Table[];
  setState: React.Dispatch<React.SetStateAction<Table[]>>;
}

export interface EditBudgetFormProps {
  id: number | null;
  name: string;
  amount: number;
  recurrence: string;
  start_date: string;
  editCategories?: Category[];
  state: Table[];
  setState: React.Dispatch<React.SetStateAction<Table[]>>;
}

export interface BudgetProps {
  data: Table[];
  fetchedCategories: {
    id: number;
    name: string;
    selected?: boolean;
  }[];
}

export type Table = {
  id: number;
  name: string;
  budget_categories: CategoryWithAmount[];
  amount: number;
  remaining?: number;
  recurrence: string;
  start_date: string;
};

export interface BudgetTableProps {
  table: Table;
  onEdit: () => void;
  onDelete: (id: number) => void;
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
  setState: React.Dispatch<React.SetStateAction<Table[]>>;
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
  totalBudgetAmount: number;
}
