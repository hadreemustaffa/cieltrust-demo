import { Categories, CategoriesWithAmount } from '@/routes/dashboard/categories/categories.types';

export interface AddBudgetTableFormData {
  id: number | null;
  name: string;
  amount: number;
  categories?: Categories;
  new_category?: string;
  addCategories?: Categories;
  state?: Table[];
}

export interface EditBudgetTableFormData {
  id: number | null;
  name: string;
  amount: number;
  editCategories?: Categories;
  state: Table[];
}

export interface BudgetProps {
  data: Table[];
}

export type Table = {
  id: number;
  name: string;
  budget_categories: CategoriesWithAmount;
  amount: number;
  remaining?: number;
};

export interface BudgetTableProps {
  table: Table;
}

export interface AddBudgetTableFormProps {
  tables: Table[];
  onSubmit: (data: AddBudgetTableFormData) => void;
}

export interface EditBudgetTableFormProps {
  table: Table;
  tables: Table[];
  onSubmit: (data: EditBudgetTableFormData) => void;
}

export interface DeleteBudgetTableData {
  id: number | null;
}
