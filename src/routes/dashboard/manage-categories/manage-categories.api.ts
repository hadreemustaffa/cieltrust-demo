import {
  addCategoryProps,
  deleteCategoryProps,
  updateCategoryProps,
} from '@/routes/dashboard/manage-categories/manage-categories.types';
import supabase from '@/utils/supabase';

export const addNewCategory = async ({ name, dashboardId, setState }: addCategoryProps) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert({
        dashboard_id: dashboardId,
        name: name,
      })
      .select()
      .single();

    if (error) {
      console.log('Error inserting categories:', error);
      throw error;
    }

    if (data) {
      setState((prevCategories) => [...prevCategories, data]);
    }
  } catch (error) {
    console.error('Error inserting categories:', error);
  }
};

export const updateCategory = async ({ category, dashboardId, name, setState }: updateCategoryProps) => {
  try {
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .update({
        name: name,
      })
      .eq('id', category.id)
      .eq('dashboard_id', dashboardId)
      .select();

    if (categoryError) {
      console.log('Error updating category:', categoryError);
      throw categoryError;
    }

    if (categoryData) {
      setState(name);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async ({ category, dashboardId, tables }: deleteCategoryProps) => {
  try {
    const { error: categoryError } = await supabase
      .from('categories')
      .delete()
      .eq('id', category.id)
      .eq('dashboard_id', dashboardId);

    if (categoryError) {
      console.log('Error deleting category:', categoryError);
      throw categoryError;
    }

    tables.forEach(async (table) => {
      const { error } = await supabase
        .from('budget_categories')
        .delete()
        .eq('budget_id', table.id)
        .eq('category_id', category.id);

      if (error) {
        console.log('Error deleting budget category:', error);
        throw error;
      }
    });
  } catch (error) {
    console.log(error);
  }
};
