import { Table } from '@/routes/dashboard/budget/budget.types';
import { Categories, Category } from '@/routes/dashboard/categories/categories.types';

export interface CategoryItemProps {
  category: Category;
  dashboardId: number;
}

export interface CategoriesListProps {
  checkedCount: number;
  selectAll: boolean;
  handleSelectAll: (selectAll: boolean) => void;
  paginatedCategories: Categories;
  checkedCategories: Record<string, boolean>;
  handleCheckCategory: (categoryId: string, checked: boolean) => void;
}

export interface addCategoryProps {
  name: string;
  dashboardId: number | null;
}

export interface updateCategoryProps {
  category: Category;
  dashboardId: number | null;
  name: string;
}

export interface deleteCategoryProps {
  id: number;
  dashboardId: number | null;
  tables: Table[];
}
