import { useCallback, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import BudgetTable from './budget-table';

import { ButtonPrimary, ButtonSecondary } from '@/components/button';
import Categories from '@/components/categories';
import Icon from '@/components/icon';
import Modal from '@/components/modal';
import { ERROR_MSG } from '@/data/errorMessages';
import { useDashboard } from '@/hooks/use-dashboard';
import { useModal } from '@/hooks/use-modal';
import PlusIcon from '@/images/icons/plus.svg?react';
import BudgetTableForm from '@/routes/dashboard/budget/budget-table-form';
import { addBudgetTable, deleteBudgetTable, editBudgetTable } from '@/routes/dashboard/budget/budget.api';
import {
  BudgetFormProps,
  BudgetProps,
  Category,
  EditBudgetFormProps,
  Table,
} from '@/routes/dashboard/budget/budget.types';
import supabase from '@/utils/supabase';

export default function Budget({ data, fetchedCategories }: BudgetProps) {
  const [budgetTables, setBudgetTables] = useState<Table[]>(data);
  const [categories, setCategories] = useState<Category[]>(
    fetchedCategories.map((category: Category) => ({
      ...category,
      selected: false,
    })),
  );

  const { activeModal, openModal, closeModal } = useModal();

  const { dashboardId } = useDashboard();

  const methods = useForm<BudgetFormProps>({
    defaultValues: {
      addCategories: categories,
    },
  });

  const editMethods = useForm<EditBudgetFormProps>({
    defaultValues: {
      editCategories: categories,
    },
  });

  const addCategoriesArr = useFieldArray({
    control: methods.control,
    name: 'addCategories',
  });

  const editCategoriesArr = useFieldArray({
    control: editMethods.control,
    name: 'editCategories',
  });

  const onAddSubmit: SubmitHandler<BudgetFormProps> = async () => {
    await addBudgetTable({
      id: dashboardId,
      name: methods.getValues('name'),
      amount: methods.getValues('amount'),
      recurrence: methods.getValues('recurrence'),
      start_date: new Date(methods.getValues('start_date')).toISOString().split('T')[0],
      addCategories: methods.getValues('addCategories'),
      fields: addCategoriesArr.fields,
      setState: setBudgetTables,
    });
  };

  const onEditSubmit = useCallback(
    (budgetId: number): SubmitHandler<BudgetFormProps> => {
      return async () => {
        await editBudgetTable({
          id: budgetId,
          name: editMethods.getValues('name'),
          amount: editMethods.getValues('amount'),
          recurrence: editMethods.getValues('recurrence'),
          start_date: editMethods.getValues('start_date'),
          editCategories: editMethods.getValues('editCategories'),
          state: budgetTables,
          setState: setBudgetTables,
        });
      };
    },
    [budgetTables, editMethods],
  );

  const onNewCategorySubmit: SubmitHandler<Pick<Category, 'name'>> = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert({
          dashboard_id: dashboardId,
          name: methods.getValues('new_category'),
        })
        .select()
        .single();

      if (error) {
        console.log('Error inserting categories:', error);
        throw error;
      }

      if (data) {
        setCategories((prevCategories) => [...prevCategories, data]);
      }
    } catch (error) {
      console.error('Error inserting categories:', error);
    }
  };

  const handleDeleteBudgetTable = async (id: number) => {
    await deleteBudgetTable({
      id,
      setState: setBudgetTables,
    });

    closeModal();
  };

  // update fields array default values on each category change
  useEffect(() => {
    methods.reset({
      addCategories: categories,
    });
    editMethods.reset({
      editCategories: categories,
    });
  }, [categories, methods, editMethods]);

  useEffect(() => {
    if (activeModal) {
      methods.setFocus('name');
      editMethods.setFocus('name');

      return () => {
        methods.reset();
        editMethods.reset();
      };
    }
  }, [activeModal, methods, editMethods]);

  useEffect(() => {
    if (methods.formState.isSubmitSuccessful) {
      methods.reset();
      closeModal();
    }
  }, [methods.formState.isSubmitSuccessful, methods, closeModal]);

  useEffect(() => {
    if (editMethods.formState.isSubmitSuccessful) {
      editMethods.reset();
      closeModal();
    }
  }, [editMethods.formState.isSubmitSuccessful, editMethods, closeModal]);

  return (
    <div
      data-testid="budget"
      className="rounded-md border border-accent/10 p-4 md:col-span-full md:col-start-1 md:row-start-3 xl:col-span-3 xl:row-start-2"
    >
      <div className="flex flex-col gap-4 rounded-md border border-accent/10 bg-surface p-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Budgets</h2>
          <ButtonSecondary aria-label="Add goal" onClick={() => openModal('addBudgetTableModal')}>
            <Icon SvgIcon={PlusIcon} isBorderless />
          </ButtonSecondary>
        </div>

        <div className="flex flex-col gap-4">
          {budgetTables.length > 0 ? (
            budgetTables.map((table) => (
              <BudgetTable
                key={table.id}
                table={table}
                onEdit={() => openModal(`editBudgetTableModal-${table.id}`)}
                onDelete={handleDeleteBudgetTable}
              >
                {activeModal === `editBudgetTableModal-${table.id}` && (
                  <Modal
                    id={`editBudgetTableModal-${table.id}`}
                    title="Edit this budget?"
                    isOpen={activeModal === `editBudgetTableModal-${table.id}`}
                    handleClose={() => closeModal()}
                  >
                    <FormProvider {...editMethods}>
                      <BudgetTableForm
                        variant="edit"
                        table={table}
                        tables={budgetTables}
                        onSubmit={onEditSubmit(table.id)}
                      >
                        <Categories
                          handleNewCategoryModal={() => openModal('addNewCategoryModal')}
                          selectedCategories={[
                            ...table.budget_categories.map((category) => category.name),
                            ...(editMethods
                              .watch('editCategories')
                              ?.filter(
                                // filter out categories that are already in the budget
                                (category) =>
                                  category.selected &&
                                  !table.budget_categories.some(
                                    (budget_category) => budget_category.name === category.name,
                                  ),
                              )
                              .map((category) => category.name) ?? []),
                          ]}
                        >
                          {editCategoriesArr.fields.map((field, index) => {
                            const isChecked = table.budget_categories.some((category) => category.name === field.name);

                            return (
                              <li key={field.id}>
                                <label
                                  htmlFor={field.id}
                                  className={`flex flex-row items-center justify-between rounded-sm px-2 py-1 text-sm hover:cursor-pointer hover:bg-accent/10 ${isChecked ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}`}
                                >
                                  {field.name}

                                  {isChecked ? (
                                    <input
                                      id={field.id}
                                      type="checkbox"
                                      className="rounded-md border border-accent/10 bg-transparent"
                                      defaultChecked={isChecked}
                                      onClick={(e) => {
                                        // disable clicking on checkbox
                                        e.preventDefault();
                                      }}
                                      {...editMethods.register(`editCategories.${index}.selected` as const)}
                                    />
                                  ) : (
                                    <input
                                      id={field.id}
                                      type="checkbox"
                                      className="rounded-md border border-accent/10 bg-transparent"
                                      {...editMethods.register(`editCategories.${index}.selected` as const)}
                                    />
                                  )}
                                </label>
                              </li>
                            );
                          })}
                        </Categories>
                      </BudgetTableForm>
                    </FormProvider>
                  </Modal>
                )}
              </BudgetTable>
            ))
          ) : (
            <p>No budgets found</p>
          )}
        </div>

        {activeModal === 'addBudgetTableModal' && (
          <Modal
            id="addBudgetTableModal"
            title="Add a budget"
            isOpen={activeModal === 'addBudgetTableModal'}
            handleClose={() => closeModal()}
          >
            <FormProvider {...methods}>
              <BudgetTableForm variant="add" tables={budgetTables} onSubmit={onAddSubmit}>
                <Categories
                  handleNewCategoryModal={() => openModal('addBudgetTableModal')}
                  selectedCategories={(methods.watch('addCategories') ?? [])
                    .filter((category) => category.selected)
                    .map((category) => category.name)}
                >
                  {addCategoriesArr.fields.map((field, index) => (
                    <li key={field.id}>
                      <label
                        htmlFor={field.id}
                        className="flex flex-row items-center justify-between rounded-sm px-2 py-1 text-sm hover:cursor-pointer hover:bg-accent/10"
                      >
                        {field.name}
                        <input
                          id={field.id}
                          type="checkbox"
                          className="rounded-md border border-accent/10 bg-transparent"
                          {...methods.register(`addCategories.${index}.selected` as const)}
                        />
                      </label>
                    </li>
                  ))}
                </Categories>
              </BudgetTableForm>
            </FormProvider>
          </Modal>
        )}

        {activeModal === 'addNewCategoryModal' && (
          <Modal
            id="addNewCategoryModal"
            title="Add New Category"
            isOpen={activeModal === 'addNewCategoryModal'}
            handleClose={() => closeModal()}
          >
            <form
              id="addNewCategoryForm"
              onSubmit={methods.handleSubmit(onNewCategorySubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-4">
                <label htmlFor="name" className="text-sm">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter category name"
                  className="w-full rounded-md border border-accent/10 bg-transparent p-2"
                  {...methods.register('new_category', {
                    required: {
                      value: true,
                      message: ERROR_MSG.FIELD_IS_REQUIRED,
                    },
                  })}
                />
                {methods.formState.errors.new_category && (
                  <p className="text-sm text-red-500">{methods.formState.errors.new_category.message}</p>
                )}

                <div className="flex flex-row items-center justify-end gap-2">
                  <ButtonPrimary type="submit">Add Category</ButtonPrimary>
                </div>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
}
