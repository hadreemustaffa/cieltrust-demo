import {
  BudgetFormProps,
  Category,
  DeleteBudgetTableProps,
  EditBudgetFormProps,
} from '@/routes/dashboard/budget/budget.types';
import supabase from '@/utils/supabase';

export const addBudgetTable = async ({
  id,
  name,
  amount,
  recurrence,
  start_date,
  addCategories,
  fields,
  setState,
}: BudgetFormProps) => {
  try {
    const { data: budgetData, error: budgetError } = await supabase
      .from('budget')
      .insert({
        dashboard_id: id,
        name: name,
        amount: amount,
        recurrence: recurrence,
        start_date: start_date,
      })
      .select()
      .single();

    if (budgetError) {
      console.log('Error inserting budget:', budgetError);
      throw budgetError;
    }

    const selectedCategories = (addCategories ?? [])
      .filter((category) => category.selected)
      .map((category) => category.name);

    const { data: categoryData, error: categoryError } = await supabase
      .from('budget_categories')
      .insert(
        fields
          ?.filter((category) => selectedCategories.includes(category.name))
          .map((category) => ({
            budget_id: budgetData.id,
            name: category.name,
          })),
      )
      .select();

    if (categoryError) {
      console.log('Error inserting categories:', categoryError);
      throw categoryError;
    }

    if (budgetData) {
      setState((prevData) => [
        ...prevData,
        {
          id: budgetData.id,
          name: budgetData.name,
          budget_categories: categoryData,
          amount: budgetData.amount,
          remaining: budgetData.amount,
          recurrence: budgetData.recurrence,
          start_date: budgetData.start_date,
        },
      ]);
    }
  } catch (error) {
    console.error('Error inserting budget and categories:', error);

    // Optionally, show user-friendly error toast?
  }
};

export const editBudgetTable = async ({
  id,
  name,
  amount,
  recurrence,
  start_date,
  editCategories,
  state,
  setState,
}: EditBudgetFormProps) => {
  try {
    const { data: budgetData, error: budgetError } = await supabase
      .from('budget')
      .update({
        name: name,
        amount: amount,
        recurrence: recurrence,
        start_date: start_date,
      })
      .select()
      .eq('id', id);

    if (budgetError) {
      console.log('Error updating budget:', budgetError);
      throw budgetError;
    }

    const selectedCategories = (editCategories ?? [])
      .filter((category) => category.selected)
      .map((category) => category.name);

    const tableCategories = (state ?? [])
      .filter((table) => table.id === id)
      .flatMap((table) => table.budget_categories.map((category) => category.name));

    const newCategoriesMap = selectedCategories
      .filter((category) => !tableCategories?.includes(category))
      .map((category) => ({
        budget_id: id,
        name: category,
        amount: 0,
        spent: 0,
      }));

    const { data: categoryData, error: categoryError } = await supabase
      .from('budget_categories')
      .insert(newCategoriesMap)
      .select();

    if (categoryError) {
      console.log('Error updating categories:', categoryError);
      throw categoryError;
    }

    if (budgetData) {
      setState(
        state.map((table) =>
          table.id === id
            ? {
                ...table,
                name: name,
                amount: amount,
                recurrence: recurrence,
                start_date: start_date,
                budget_categories: [
                  ...table.budget_categories,
                  ...categoryData.map((newCategory: Category) => ({
                    ...newCategory,
                  })),
                ],
              }
            : table,
        ),
      );
    }
  } catch (error) {
    console.error('Error updating budget:', error);
  }
};

export const deleteBudgetTable = async ({ id, setState }: DeleteBudgetTableProps) => {
  try {
    await supabase.from('budget').delete().eq('id', id);
    setState((prevData) => prevData.filter((item) => item.id !== id));
  } catch (error) {
    console.error('Error deleting budget:', error);
  }
};
