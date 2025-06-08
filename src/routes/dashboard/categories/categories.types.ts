import React from 'react';

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
  category_name: string;
};

export type CategoriesWithAmount = CategoryWithAmount[];

export type DB_Category = {
  id: number;
  name: string;
  created_at: string;
};

export type DB_Categories = DB_Category[];

export type DB_CategoryWithAmount = DB_Category & {
  budget_id: number;
  category_id: number;
  amount: number;
  spent: number;
  category: {
    name: string;
  };
};

export type DB_CategoriesWithAmount = DB_CategoryWithAmount[];

export interface CategoriesProps {
  children: React.ReactNode;
  selectedCategories: number[];
}
