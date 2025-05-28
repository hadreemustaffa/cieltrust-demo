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
