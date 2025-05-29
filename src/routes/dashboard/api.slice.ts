import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { calculateNextPaymentDate } from '@/utils/calculateNextPaymentDate';
import { getPagination } from '@/utils/getPagination';
import supabase from '@/utils/supabase';

import { Overview } from '@/routes/dashboard/account-overview/account-overview.types';
import {
  AddTransactionExpensesFormData,
  AddTransactionIncomeFormData,
} from '@/routes/dashboard/add-transaction/add-transaction.types';
import {
  AddBudgetTableFormData,
  DB_Table,
  EditBudgetTableCategoryFormData,
  EditBudgetTableFormData,
  Table,
} from '@/routes/dashboard/budget/budget.types';
import type { Category, Categories } from '@/routes/dashboard/categories/categories.types';
import {
  DeleteCategory,
  NewCategory,
  UpdateCategory,
} from '@/routes/dashboard/manage-categories/manage-categories-slice';
import {
  DeleteTransactionHistory,
  GetPaginatedTransactionHistory,
  Transaction,
  TransactionHistory,
} from '@/routes/dashboard/transaction-history/transaction-history.types';
import {
  AddUpcomingPaymentFormData,
  DeleteUpcomingPayment,
  EditUpcomingPaymentFormData,
  GetUpcomingPayment,
  UpcomingPayment,
} from '@/routes/dashboard/upcoming-payment/upcoming-payment.types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_PUBLIC_SUPABASE_URL }),
  tagTypes: ['Overview', 'Categories', 'TransactionHistory', 'BudgetTables', 'UpcomingPayment'],
  endpoints: (build) => ({
    // Overview
    getOverview: build.query<Overview, number>({
      queryFn: async (dashboardId: number) => {
        try {
          const { data, error } = await supabase
            .from('overview')
            .select('balance, income, expenses, savings, previous_month')
            .eq('dashboard_id', dashboardId)
            .single();

          if (error) {
            return { error: error.message };
          }

          return { data };
        } catch (error) {
          console.error('Failed to fetch overview:', error);
          return { error };
        }
      },
      providesTags: ['Overview'],
    }),
    // Categories
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
      invalidatesTags: (result, error, arg) => [{ type: 'Categories', id: arg.id }, 'BudgetTables'],
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
      invalidatesTags: ['Categories', 'BudgetTables'],
    }),
    // Transaction History
    getAllTransactionHistory: build.query<TransactionHistory, number>({
      queryFn: async (dashboardId: number) => {
        try {
          const { data, error } = await supabase
            .from('transactions')
            .select('*')
            .eq('dashboard_id', dashboardId)
            .order('transaction_date', { ascending: false });

          if (error) {
            return { error: error.message };
          }

          return { data };
        } catch (error) {
          console.error('Failed to fetch transaction history:', error);
          return { error };
        }
      },
      providesTags: ['TransactionHistory'],
    }),
    getPaginatedTransactionHistory: build.query<TransactionHistory, GetPaginatedTransactionHistory>({
      queryFn: async ({ dashboardId, page = 0, type, limit = 5 }) => {
        const { from, to } = getPagination(page, limit);
        try {
          const { data, count, error } = await supabase
            .from('transactions')
            .select('*', { count: 'exact' })
            .eq('dashboard_id', dashboardId)
            .eq('type', type)
            .range(from, to)
            .order('transaction_date', { ascending: false });

          if (error) {
            return { error: error.message };
          }

          return { data: { history: data, count: count, page: +page, limit } };
        } catch (error) {
          console.error('Failed to fetch transaction history:', error);
          return { error };
        }
      },
      providesTags: ['TransactionHistory'],
    }),
    deleteTransactionHistory: build.mutation<Transaction, DeleteTransactionHistory>({
      queryFn: async ({ id }) => {
        try {
          const { data, error } = await supabase.from('transactions').delete().in('id', [id]);

          if (error) {
            return { error: error.message };
          }

          return { data };
        } catch (error) {
          console.error('Failed to delete transaction history:', error);
          return { error };
        }
      },
      invalidatesTags: ['TransactionHistory'],
    }),
    // Budget Tables
    getAllBudgetTables: build.query<Table[], number>({
      queryFn: async (dashboardId: number) => {
        try {
          const { data, error } = await supabase
            .from('budget')
            .select(
              `id, name, amount, created_at, budget_categories (budget_id, category_id, amount, spent, category:categories (name))`,
            )
            .eq('dashboard_id', dashboardId);

          if (error) {
            return { error: error.message };
          }
          // Transform budget_categories to include category_name
          const transformed = data.map((table: DB_Table) => ({
            ...table,
            budget_categories: (table.budget_categories || []).map((bc) => ({
              budget_id: bc.budget_id,
              category_id: bc.category_id,
              amount: bc.amount,
              spent: bc.spent,
              category_name: bc.category.name,
            })),
          }));

          return { data: transformed };
        } catch (error) {
          console.error('Failed to fetch all budget tables:', error);
          return { error };
        }
      },
      providesTags: (result = [], error, arg) => [
        'BudgetTables',
        ...result.map(({ id }) => ({ type: 'BudgetTables', id }) as const),
      ],
    }),
    getBudgetTable: build.query<Table, number>({
      queryFn: async (id: number) => {
        try {
          const { data, error } = await supabase
            .from('budget')
            .select(
              `id, name, amount, created_at, budget_categories (budget_id, category_id, amount, spent, category:categories (name))`,
            )
            .eq('id', id)
            .select()
            .single();

          if (error) {
            return { error: error.message };
          }

          // Transform budget_categories to include category_name
          const transformed = data.map((table: DB_Table) => ({
            ...table,
            budget_categories: (table.budget_categories || []).map((bc) => ({
              budget_id: bc.budget_id,
              category_id: bc.category_id,
              amount: bc.amount,
              spent: bc.spent,
              category_name: bc.category.name,
            })),
          }));

          return { data: transformed };
        } catch (error) {
          console.error('Failed to fetch budget table:', error);
          return { error };
        }
      },
      providesTags: (result, error, arg) => [{ type: 'BudgetTables', id: arg } as const],
    }),
    addBudgetTable: build.mutation<Table, AddBudgetTableFormData>({
      queryFn: async ({ name, dashboardId, amount, categories }) => {
        try {
          const { data, error: budgetError } = await supabase
            .from('budget')
            .insert({
              dashboard_id: dashboardId,
              name: name,
              amount: amount,
            })
            .select('id')
            .single();

          if (budgetError) {
            return { error: budgetError.message };
          }

          const selectedCategoriesIds = categories
            .filter((category) => category.selected)
            .map((category) => category.id);

          const newCategoriesMap = categories
            .filter((category) => selectedCategoriesIds.includes(category.id))
            .map((category) => ({
              budget_id: data.id,
              category_id: category.id,
            }));

          if (selectedCategoriesIds.length > 0) {
            const { error: categoryError } = await supabase.from('budget_categories').insert(newCategoriesMap);

            if (categoryError) {
              return { error: categoryError.message };
            }
          }

          return { data };
        } catch (error) {
          console.error('Failed to add new budget table:', error);
          return { error };
        }
      },
      invalidatesTags: ['BudgetTables'],
    }),
    editBudgetTable: build.mutation<Table, EditBudgetTableFormData>({
      queryFn: async ({ id, name, amount, dashboardId, table, categories }) => {
        try {
          const { data, error } = await supabase
            .from('budget')
            .update({
              name: name,
              amount: amount,
            })
            .eq('id', id)
            .eq('dashboard_id', dashboardId);

          if (error) {
            return { error: error.message };
          }

          const selectedCategoriesIds = categories
            .filter((category) => category.selected)
            .map((category) => category.id);

          const tableCategoriesIds = table.budget_categories
            .filter((bc) => bc.budget_id === table.id)
            .map((bc) => bc.category_id);

          const newCategoriesMap = selectedCategoriesIds
            .filter((categoryId) => !tableCategoriesIds?.includes(categoryId))
            .map((categoryId) => ({
              budget_id: table.id,
              category_id: categoryId,
              amount: 0,
              spent: 0,
            }));

          if (newCategoriesMap.length > 0) {
            const { error: categoryError } = await supabase.from('budget_categories').insert(newCategoriesMap);

            if (categoryError) {
              return { error: categoryError.message };
            }
          }

          const removedCategoriesIds = tableCategoriesIds
            .filter((categoryId) => !selectedCategoriesIds.includes(categoryId))
            .map((categoryId) => ({
              category_id: categoryId,
            }));

          if (removedCategoriesIds.length > 0) {
            const { error: categoryError } = await supabase
              .from('budget_categories')
              .delete()
              .in(
                'category_id',
                removedCategoriesIds.map((c) => c.category_id),
              )
              .eq('budget_id', table.id);

            if (categoryError) {
              return { error: categoryError.message };
            }
          }

          return { data };
        } catch (error) {
          console.error('Failed to edit budget table:', error);
          return { error };
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'BudgetTables', id: arg.table.id }],
    }),
    deleteBudgetTable: build.mutation<Table, number>({
      queryFn: async (id) => {
        try {
          const { data, error } = await supabase.from('budget').delete().eq('id', id);

          if (error) {
            return { error: error.message };
          }

          return { data };
        } catch (error) {
          console.error('Failed to delete budget table:', error);
          return { error };
        }
      },
      invalidatesTags: ['BudgetTables'],
    }),
    editBudgetTableCategory: build.mutation<Table, EditBudgetTableCategoryFormData>({
      queryFn: async ({ amount, category }) => {
        try {
          const { data, error } = await supabase
            .from('budget_categories')
            .update({ amount: amount })
            .eq('budget_id', category.budget_id)
            .eq('category_id', category.category_id)
            .single();

          if (error) {
            return { error: error.message };
          }

          return { data };
        } catch (error) {
          console.error('Failed to edit budget table category:', error);
          return { error };
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'BudgetTables', id: arg.category.budget_id }],
    }),
    // Add Transactions
    addTransactionIncome: build.mutation<Transaction, AddTransactionIncomeFormData>({
      queryFn: async ({ dashboard_id, transaction_date, from, amount, percent_saved, reference }) => {
        try {
          const { data, error } = await supabase
            .from('transactions')
            .insert({
              dashboard_id: dashboard_id,
              type: 'income',
              transaction_date: transaction_date,
              from: from,
              amount: amount,
              percent_saved: percent_saved,
              reference: reference,
            })
            .single();

          if (error) {
            return { error: error.message };
          }

          return { data };
        } catch (error) {
          console.error('Failed to add income transaction:', error);
          return { error };
        }
      },
      invalidatesTags: ['TransactionHistory', 'Overview'],
    }),
    addTransactionExpenses: build.mutation<Transaction, AddTransactionExpensesFormData>({
      queryFn: async ({ dashboard_id, transaction_date, budget, category, amount, reference }) => {
        try {
          const { data, error } = await supabase
            .from('transactions')
            .insert({
              dashboard_id: dashboard_id,
              type: 'expenses',
              transaction_date: transaction_date,
              budget: budget,
              category: category,
              amount: amount,
              reference: reference,
            })
            .single();

          if (error) {
            return { error: error.message };
          }

          return { data };
        } catch (error) {
          console.error('Failed to add expenses transaction:', error);
          return { error };
        }
      },
      invalidatesTags: ['TransactionHistory', 'Overview', 'BudgetTables'],
    }),
    // Upcoming Payment
    getAllUpcomingPayments: build.query<UpcomingPayment[], number>({
      queryFn: async (dashboard_id) => {
        try {
          const { data, error } = await supabase.from('upcoming_payment').select().eq('dashboard_id', dashboard_id);

          if (error) {
            return { error: error.message };
          }

          // Sorts the upcoming payments by their next payment date
          // in ascending order (soonest first)
          const transformed = data.sort((a: UpcomingPayment, b: UpcomingPayment) => {
            const nextDateA = calculateNextPaymentDate(a.date ?? '', a.recurrence);
            const nextDateB = calculateNextPaymentDate(b.date ?? '', b.recurrence);
            return nextDateA.unix() - nextDateB.unix();
          });

          return { data: transformed };
        } catch (error) {
          console.error('Failed to get upcoming payments:', error);
          return { error };
        }
      },
      providesTags: (result = [], error, arg) => [
        'UpcomingPayment',
        ...result.map(({ id }) => ({ type: 'UpcomingPayment', id }) as const),
      ],
    }),
    getUpcomingPayment: build.query<UpcomingPayment, GetUpcomingPayment>({
      queryFn: async ({ id, dashboard_id }) => {
        try {
          const { data, error } = await supabase
            .from('upcoming_payment')
            .select()
            .eq('id', id)
            .eq('dashboard_id', dashboard_id)
            .single();

          if (error) {
            return { error: error.message };
          }

          return { data };
        } catch (error) {
          console.error('Failed to get upcoming payment:', error);
          return { error };
        }
      },
      providesTags: (result, error, arg) => [{ type: 'UpcomingPayment', id: arg.id } as const],
    }),
    addUpcomingPayment: build.mutation<UpcomingPayment, AddUpcomingPaymentFormData>({
      queryFn: async ({ dashboard_id, name, amount, date, recurrence }) => {
        try {
          const { data, error } = await supabase
            .from('upcoming_payment')
            .insert({
              dashboard_id: dashboard_id,
              name: name,
              date: date,
              amount: amount,
              recurrence: recurrence,
            })
            .select()
            .single();

          if (error) {
            return { error: error.message };
          }

          return { data };
        } catch (error) {
          console.error('Failed to add upcoming payment:', error);
          return { error };
        }
      },
      invalidatesTags: ['UpcomingPayment'],
    }),
    deleteUpcomingPayment: build.mutation<UpcomingPayment, DeleteUpcomingPayment>({
      queryFn: async ({ id, dashboard_id }) => {
        try {
          const { data, error } = await supabase
            .from('upcoming_payment')
            .delete()
            .eq('id', id)
            .eq('dashboard_id', dashboard_id);

          if (error) {
            return { error: error.message };
          }

          return { data };
        } catch (error) {
          console.error('Failed to delete upcoming payment:', error);
          return { error };
        }
      },
      invalidatesTags: ['UpcomingPayment'],
    }),
    editUpcomingPayment: build.mutation<UpcomingPayment, EditUpcomingPaymentFormData>({
      queryFn: async ({ dashboard_id, id, name, amount, date, recurrence }) => {
        try {
          const { data, error } = await supabase
            .from('upcoming_payment')
            .update({
              name: name,
              amount: amount,
              date: date,
              recurrence: recurrence,
            })
            .eq('id', id)
            .eq('dashboard_id', dashboard_id);

          if (error) {
            return { error: error.message };
          }

          return { data };
        } catch (error) {
          console.error('Failed to edit upcoming payment:', error);
          return { error };
        }
      },
      invalidatesTags: ['UpcomingPayment'],
    }),
  }),
});

export const {
  useGetOverviewQuery,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useAddNewCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllTransactionHistoryQuery,
  useGetPaginatedTransactionHistoryQuery,
  useDeleteTransactionHistoryMutation,
  useGetAllBudgetTablesQuery,
  useGetBudgetTableQuery,
  useAddBudgetTableMutation,
  useEditBudgetTableMutation,
  useDeleteBudgetTableMutation,
  useEditBudgetTableCategoryMutation,
  useAddTransactionIncomeMutation,
  useAddTransactionExpensesMutation,
  useGetAllUpcomingPaymentsQuery,
  useGetUpcomingPaymentQuery,
  useAddUpcomingPaymentMutation,
  useDeleteUpcomingPaymentMutation,
  useEditUpcomingPaymentMutation,
} = apiSlice;
