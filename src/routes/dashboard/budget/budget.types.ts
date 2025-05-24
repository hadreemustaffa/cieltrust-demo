import { Categories, CategoriesWithAmount } from '@/routes/dashboard/categories/categories.types';

export interface AddBudgetTableFormData {
  dashboardId: number;
  name: string;
  amount: number;
  categories: Categories;
}

export interface EditBudgetTableFormData {
  dashboardId: number;
  id: number;
  name: string;
  amount: number;
  table: Table;
  categories: Categories;
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
  handleModalClose: () => void;
  tables: Table[];
}

export interface EditBudgetTableFormProps {
  handleModalClose: () => void;
  table: Table;
}

export interface DeleteBudgetTableData {
  id: number | null;
}
