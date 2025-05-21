export type Category = {
  id: number;
  name: string;
  created_at: string;
  selected?: boolean;
};

export type Categories = Category[];

export type CategoryWithAmount = Category & {
  budget_id: number;
  category_id: number;
  amount: number;
  spent: number;
};

export type CategoriesWithAmount = CategoryWithAmount[];
