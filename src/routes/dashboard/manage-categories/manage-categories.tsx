import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import CheckIcon from '@/images/icons/check.svg?react';
import EditIcon from '@/images/icons/edit.svg?react';
import ListIcon from '@/images/icons/list.svg?react';
import PlusIcon from '@/images/icons/plus.svg?react';
import TrashIcon from '@/images/icons/trash.svg?react';
import XIcon from '@/images/icons/x.svg?react';

import { useBudgetTables } from '@/hooks/use-budget-tables';
import { useCategories } from '@/hooks/use-categories';
import { useModal } from '@/hooks/use-modal';
import { useAppSelector } from '@/hooks/use-redux';

import { ButtonDelete, ButtonSecondary } from '@/components/button';
import { Input } from '@/components/custom-form';
import ErrorMessage from '@/components/error-message';
import Icon from '@/components/icon';
import Modal from '@/components/modal';
import { Category } from '@/routes/dashboard/categories/categories.types';
import { getDashboardId } from '@/routes/dashboard/dashboard.slice';
import {
  addNewCategory,
  deleteCategory,
  updateCategory,
} from '@/routes/dashboard/manage-categories/manage-categories.api';
import { CategoryItemProps } from '@/routes/dashboard/manage-categories/manage-categories.types';

export default function ManageCategories() {
  const dashboardId = useAppSelector(getDashboardId);
  const { categories, setCategories } = useCategories();
  const { budgetTables, setBudgetTables } = useBudgetTables();
  const { activeModal, openModal, closeModal } = useModal();

  const [currentPage, setCurrentPage] = useState(1);
  const [checkedCategories, setCheckedCategories] = useState<Record<string, boolean>>({});
  const [selectAll, setSelectAll] = useState(false);
  const itemsPerPage = 5;

  const paginatedCategories = categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, categories.length);

  const checkedCount = Object.values(checkedCategories).filter(Boolean).length;
  const hasCheckedItems = checkedCount > 0;

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

  const handleCloseModal = () => {
    setCheckedCategories({});
    setSelectAll(false);
    reset();
    closeModal();
  };

  const updateStateAfterDelete = async (category: Category) => {
    setCategories((prev) => prev.filter((cat) => Number(cat.id) !== Number(category.id)));
    setBudgetTables((prev) => {
      const updatedTables = prev.map((table) => ({
        ...table,
        budget_categories: table.budget_categories.filter((cat) => Number(cat.category_id) !== Number(category.id)),
      }));
      return [...updatedTables];
    });
  };

  const handleDeleteSelected = async () => {
    if (!window.confirm(`Are you sure you want to delete ${checkedCount} selected categories?`)) {
      return;
    }

    // Get categories to delete
    const categoriesToDelete = categories.filter(
      (category) => category.id && checkedCategories[category.id.toString()],
    );

    // Delete each selected category
    for (const category of categoriesToDelete) {
      await deleteCategory({ category, dashboardId, tables: budgetTables });
      updateStateAfterDelete(category);
    }

    setCheckedCategories({});
    setSelectAll(false);
  };

  const handleCheckCategory = (categoryId: string, isChecked: boolean) => {
    setCheckedCategories((prev) => ({
      ...prev,
      [categoryId]: isChecked,
    }));
  };

  const handleSelectAll = (isChecked: boolean) => {
    setSelectAll(isChecked);

    const newCheckedState: Record<string, boolean> = {};
    paginatedCategories.forEach((category) => {
      if (category.id) {
        newCheckedState[category.id.toString()] = isChecked;
      }
    });

    setCheckedCategories((prev) => ({
      ...prev,
      ...newCheckedState,
    }));
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

  // Update selectAll state when pagination changes
  useEffect(() => {
    const allCurrentChecked = paginatedCategories.every(
      (category) => category.id && checkedCategories[category.id.toString()],
    );
    setSelectAll(paginatedCategories.length > 0 && allCurrentChecked);
  }, [paginatedCategories, checkedCategories]);

  return (
    <>
      <ButtonSecondary onClick={() => openModal('manageCategoriesModal')} className="gap-2">
        <Icon SvgIcon={ListIcon} isBorderless />
        <span className="hidden md:inline">Manage Categories</span>
      </ButtonSecondary>

      {activeModal === 'manageCategoriesModal' && (
        <Modal
          id="manageCategoriesModal"
          title="Manage Categories"
          isOpen={activeModal === 'manageCategoriesModal'}
          handleClose={handleCloseModal}
        >
          <div className="flex flex-col">
            <form onSubmit={handleSubmit(onNewCategorySubmit)} className="flex flex-row items-center gap-2">
              <div className="relative flex w-full flex-col gap-2">
                <div className="flex flex-row justify-between gap-2">
                  <label htmlFor={'addNewCategory'} className="sr-only">
                    Add Category
                  </label>
                  <Input
                    id="addNewCategory"
                    type="text"
                    placeholder="Enter category name"
                    defaultValue=""
                    autoComplete="off"
                    {...register('name', {
                      required: {
                        value: true,
                        message: 'Category name is required',
                      },
                      validate: (value) => {
                        if (categories.some((cat) => cat.name === value)) {
                          return 'Category already exists';
                        }
                        return true;
                      },
                    })}
                  />
                  <ButtonSecondary type="submit">
                    <Icon SvgIcon={PlusIcon} isBorderless />
                  </ButtonSecondary>
                </div>
                {errors.name && <ErrorMessage error={errors.name.message} />}
              </div>
            </form>

            {categories.length > 0 ? (
              <>
                <div className="flex items-center justify-between">
                  <ButtonDelete
                    onClick={handleDeleteSelected}
                    className={`transition-[margin] ${hasCheckedItems ? 'mt-4 py-1 opacity-100' : 'pointer-events-none h-0 border-0 bg-transparent py-0 opacity-0'}`}
                    disabled={!hasCheckedItems}
                  >
                    <Icon SvgIcon={TrashIcon} isBorderless />
                    <span className="hidden pl-2 font-semibold md:inline">
                      Delete {checkedCount} {checkedCount === 1 ? 'item' : 'items'}
                    </span>
                    <span className="pl-2 font-semibold md:hidden">
                      {checkedCount} {checkedCount === 1 ? 'item' : 'items'}
                    </span>
                  </ButtonDelete>
                </div>

                <ul className={`mt-4 flex flex-col overflow-hidden transition-all ${checkedCount === 0 && 'mt-4'}`}>
                  <li className="flex flex-row items-center justify-start border border-accent/10 bg-accent/5">
                    <div className="h-full w-fit p-2">
                      <Input
                        type="checkbox"
                        id="select-all-checkbox"
                        name="select-all-checkbox"
                        checked={selectAll}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </div>
                    <div className="w-full border-l border-accent/10 p-2 font-medium">Name</div>
                  </li>
                  {paginatedCategories.map((category) => (
                    <li key={category.id} className="flex flex-row items-center justify-start border border-accent/10">
                      <div className="h-full w-fit p-2">
                        <Input
                          type="checkbox"
                          id={`category-${category.id}-checkbox`}
                          name={`category-${category.id}-checkbox`}
                          checked={category.id ? checkedCategories[category.id.toString()] || false : false}
                          onChange={(e) => handleCheckCategory(category.id?.toString() || '', e.target.checked)}
                        />
                      </div>
                      <CategoryItem category={category} tables={budgetTables} dashboardId={dashboardId} />
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="rounded-md border border-accent/10 p-1 hover:cursor-pointer hover:border-accent/50 disabled:cursor-default disabled:border-accent/10 disabled:opacity-50"
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>
                    Showing {startItem} - {endItem} of {categories.length} categories
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
        </Modal>
      )}
    </>
  );
}

const CategoryItem = ({ category, dashboardId }: CategoryItemProps) => {
  const [isEditting, setIsEditting] = useState(false);
  const [name, setName] = useState(category.name);

  const { setCategories } = useCategories();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitSuccessful },
  } = useForm<Category>();

  const onEditSubmit: SubmitHandler<Category> = async () => {
    try {
      await updateCategory({ category, dashboardId, name: getValues('name'), setState: setName });

      updateCategoriesState();
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  const updateCategoriesState = () => {
    setCategories((prevCategories) => {
      return prevCategories.map((cat) => {
        if (cat.id === category.id) {
          return { ...cat, name: getValues('name') };
        }
        return cat;
      });
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsEditting(false);
    }
  }, [isSubmitSuccessful]);

  return (
    <div className="w-full items-center justify-between rounded-sm border-l border-accent/10">
      {isEditting ? (
        <form
          onSubmit={handleSubmit(onEditSubmit)}
          className="flex flex-row flex-wrap items-center justify-between gap-2 p-2"
        >
          <label htmlFor={`category-${category.id?.toString()}`} className="sr-only">
            {category.name}
          </label>
          <input
            id={`category-${category.id?.toString()}`}
            type="text"
            className="w-fit rounded-sm bg-accent/10 px-1 hover:cursor-pointer"
            autoComplete="off"
            defaultValue={category.name}
            {...register('name', {
              required: {
                value: true,
                message: 'Category name is required',
              },
            })}
          />

          <div className="flex flex-row flex-wrap items-center gap-1">
            <button type="submit" className="p-1 hover:bg-accent/10">
              <Icon SvgIcon={CheckIcon} width={16} height={16} isBorderless />
            </button>
            <button type="button" className="p-1 hover:bg-accent/10" onClick={() => setIsEditting(false)}>
              <Icon SvgIcon={XIcon} width={16} height={16} isBorderless />
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-row flex-wrap items-center justify-between gap-2">
          <p className="w-fit p-2">{name}</p>

          <button type="button" className="h-full p-2" onClick={() => setIsEditting(true)}>
            <Icon SvgIcon={EditIcon} width={16} height={16} isBorderless />
          </button>
        </div>
      )}
    </div>
  );
};
