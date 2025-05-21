import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import supabase from '@/utils/supabase';

import type { Category, Categories } from '@/routes/dashboard/categories/categories.types';
import {
  DeleteCategory,
  NewCategory,
  UpdateCategory,
} from '@/routes/dashboard/manage-categories/manage-categories-slice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_PUBLIC_SUPABASE_URL }),
  tagTypes: ['Categories'],
  endpoints: (build) => ({
    getCategories: build.query<Categories, number>({
      queryFn: async (dashboardId: number) => {
        try {
          const { data, error } = await supabase
            .from('categories')
            .select('id, name, created_at')
            .eq('dashboard_id', dashboardId);

          if (error) {
            return { error: error.message };
          }

          return { data };
        } catch (error) {
          console.error('Failed to fetch all categories:', error);
          return { error };
        }
      },
      providesTags: (result = [], error, arg) => [
        'Categories',
        ...result.map(({ id }) => ({ type: 'Categories', id }) as const),
      ],
    }),
    getCategory: build.query<Category, number>({
      queryFn: async (id: number) => {
        try {
          const { data, error } = await supabase
            .from('categories')
            .select('id, name, created_at')
            .eq('id', id)
            .single();

          if (error) {
            return { error: error.message };
          }

          return { data };
        } catch (error) {
          console.error('Failed to fetch single category:', error);
          return { error };
        }
      },
      providesTags: (result, error, arg) => [{ type: 'Categories', id: arg } as const],
    }),
    addNewCategory: build.mutation<Category, NewCategory>({
      queryFn: async ({ name, dashboardId }) => {
        try {
          const { data, error } = await supabase
            .from('categories')
            .insert({
              dashboard_id: dashboardId,
              name: name,
            })
            .select();

          if (error) {
            return { error: error.message };
          }

          return { data };
        } catch (error) {
          console.error('Failed to add new category:', error);
          return { error };
        }
      },
      invalidatesTags: ['Categories'],
    }),
    editCategory: build.mutation<Category, UpdateCategory>({
      queryFn: async ({ id, name, dashboardId }) => {
        try {
          const { data, error } = await supabase
            .from('categories')
            .update({
              name: name,
            })
            .eq('id', id)
            .eq('dashboard_id', dashboardId)
            .select();

          if (error) {
            return { error: error.message };
          }

          return { data };
        } catch (error) {
          console.error('Failed to update category:', error);
          return { error };
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Categories', id: arg.id }],
    }),
    deleteCategory: build.mutation<{ categoryIds: number[] }, DeleteCategory>({
      queryFn: async ({ categoryIds, dashboardId, tables }) => {
        try {
          const { error } = await supabase
            .from('categories')
            .delete()
            .in('id', [categoryIds])
            .eq('dashboard_id', dashboardId);

          if (error) {
            return { error: error.message };
          }

          const tableIds = tables.map((table) => table.id);

          const { error: budgetCategoriesError } = await supabase
            .from('budget_categories')
            .delete()
            .in('budget_id', [tableIds])
            .in('category_id', [categoryIds]);

          if (budgetCategoriesError) {
            return { error: error.message };
          }

          return { data: { categoryIds } };
        } catch (error) {
          console.error('Failed to delete category:', error);
          return { error };
        }
      },
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useAddNewCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = apiSlice;
