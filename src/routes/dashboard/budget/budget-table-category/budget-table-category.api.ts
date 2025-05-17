import { AddBudgetTableCategoryFormData } from '@/routes/dashboard/budget/budget-table-category/budget-table-category.types';
import supabase from '@/utils/supabase';

export const updateCategoryAmount = async ({
  amount,
  category,
  setAmount,
  setTable,
}: AddBudgetTableCategoryFormData) => {
  try {
    const { data, error } = await supabase
      .from('budget_categories')
      .update({ amount: amount })
      .eq('budget_id', category.budget_id)
      .eq('category_id', category.category_id)
      .select();

    if (error) {
      console.error('Error updating category amount:', error);
      return;
    }

    if (data) {
      setAmount(amount);

      setTable((prevTables) =>
        prevTables.map((table) => {
          if (table.id !== category.budget_id) {
            return table;
          }

          return {
            ...table,
            budget_categories: table.budget_categories.map((cat) =>
              cat.category_id === category.category_id ? { ...cat, amount: amount } : cat,
            ),
          };
        }),
      );
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
};
