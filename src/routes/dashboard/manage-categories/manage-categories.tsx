import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ButtonSecondary } from '@/components/button';
import { Input } from '@/components/forms/custom_form';
import Icon from '@/components/icon';
import { useBudgetTables } from '@/hooks/use-budget-tables';
import { useCategories } from '@/hooks/use-categories';
import EditIcon from '@/images/icons/edit.svg?react';
import PlusIcon from '@/images/icons/plus.svg?react';
import TrashIcon from '@/images/icons/trash.svg?react';
import { Category } from '@/routes/dashboard/budget/budget.types';
import {
  addNewCategory,
  deleteCategory,
  updateCategory,
} from '@/routes/dashboard/manage-categories/manage-categories.api';
import { CategoryItemProps, ManageCategoriesProps } from '@/routes/dashboard/manage-categories/manage-categories.types';

export default function ManageCategories({ tables, dashboardId }: ManageCategoriesProps) {
  const { categories, setCategories } = useCategories();
  const { setBudgetTables } = useBudgetTables();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedCategories = categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Category>();

  const onNewCategorySubmit: SubmitHandler<Category> = async () => {
    await addNewCategory({ name: getValues('name'), dashboardId, setState: setCategories });
  };

  const handleDeleteCategory = async (category: Category) => {
    await deleteCategory({ category, dashboardId, tables });

    setCategories((prev) => prev.filter((cat) => cat.id !== category.id));
    setBudgetTables((prev) => {
      const updatedTables = prev.map((table) => ({
        ...table,
        budget_categories: table.budget_categories.filter((cat) => cat.name !== category.name),
      }));
      return [...updatedTables];
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (paginatedCategories.length === 0 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [categories, currentPage, paginatedCategories.length]);

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(onNewCategorySubmit)} className="flex flex-row items-center gap-2">
        <div className="relative flex w-full flex-col gap-2">
          <label htmlFor={'addNewCategory'} className="sr-only">
            Add Category
          </label>
          <Input
            id="addNewCategory"
            type="text"
            placeholder="Enter category name"
            defaultValue=""
            {...register('name', {
              required: {
                value: true,
                message: 'Category name is required',
              },
            })}
          />
          {errors.name && <p className="absolute top-full pl-2 pt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <ButtonSecondary type="submit">
          <Icon SvgIcon={PlusIcon} isBorderless />
        </ButtonSecondary>
      </form>

      {categories.length > 0 ? (
        <>
          <ul className="flex flex-col gap-2">
            {paginatedCategories.map((category, index) => (
              <li key={category.id} className="flex flex-row items-center gap-2">
                <span>{startItem + index}.</span>
                <CategoryItem
                  category={category}
                  tables={tables}
                  dashboardId={dashboardId}
                  onDelete={() => handleDeleteCategory(category)}
                />
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between text-xs">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="rounded-md border border-accent/10 p-1 hover:cursor-pointer hover:border-accent/50 disabled:cursor-default disabled:border-accent/10 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Showing {startItem} of {categories.length} categories
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="rounded-md border border-accent/10 p-1 hover:cursor-pointer hover:border-accent/50 disabled:cursor-default disabled:border-accent/10 disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No categories found</p>
      )}
    </div>
  );
}

const CategoryItem = ({ category, tables, dashboardId, onDelete }: CategoryItemProps) => {
  const [isEditting, setIsEditting] = useState(false);
  const [name, setName] = useState(category.name);

  const { setCategories } = useCategories();
  const { setBudgetTables } = useBudgetTables();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitSuccessful },
  } = useForm<Category>();

  const onEditSubmit: SubmitHandler<Category> = async () => {
    try {
      await updateCategory({ category, dashboardId, tables, name: getValues('name'), setState: setName });

      updateBudgetTables();
      updateCategories();
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  const updateBudgetTables = () => {
    setBudgetTables((prev) => {
      const updatedTables = prev.map((table) => ({
        ...table,
        budget_categories: table.budget_categories.map((cat) => {
          if (cat.name === category.name) {
            return { ...cat, name: getValues('name') };
          }
          return cat;
        }),
      }));
      return updatedTables;
    });
  };

  const updateCategories = () => {
    setCategories((prevCategories) => {
      return prevCategories.map((cat) => {
        if (cat.id === category.id) {
          return { ...cat, name: getValues('name') };
        }
        return cat;
      });
    });
  };

  const handleDeleteCategory = async () => {
    if (
      !window.confirm('This will delete all instances of the category.\nAre you sure you want to delete this category?')
    ) {
      return;
    }

    onDelete(category);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsEditting(false);
    }
  }, [isSubmitSuccessful]);

  return (
    <div className="w-full items-center justify-between rounded-sm py-1">
      {isEditting ? (
        <form
          onSubmit={handleSubmit(onEditSubmit)}
          className="flex flex-row flex-wrap items-center justify-between gap-2"
        >
          <label htmlFor={`category-${category.id?.toString()}`} className="sr-only">
            {category.name}
          </label>
          <input
            id={`category-${category.id?.toString()}`}
            type="text"
            className="w-fit rounded-sm border border-accent/10 bg-transparent px-1 hover:cursor-pointer"
            defaultValue={category.name}
            {...register('name', {
              required: {
                value: true,
                message: 'Category name is required',
              },
            })}
          />

          <div className="flex flex-row flex-wrap items-center gap-2">
            <button type="submit">Save</button>
            <button type="button" className="text-red-500" onClick={() => setIsEditting(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-row flex-wrap items-center justify-between gap-2">
          <p className="w-fit">{name}</p>

          <div className="flex flex-row flex-wrap items-center gap-2">
            <button type="button" onClick={() => setIsEditting(!isEditting)}>
              <Icon SvgIcon={EditIcon} isBorderless />
            </button>
            <button type="button" className="text-red-500" onClick={handleDeleteCategory}>
              <Icon SvgIcon={TrashIcon} isBorderless />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
