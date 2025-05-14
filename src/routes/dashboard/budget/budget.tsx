import { useCallback, useEffect } from 'react';
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { ButtonPrimary, ButtonSecondary } from '@/components/button';
import Categories from '@/components/categories';
import ErrorMessage from '@/components/error-message';
import Icon from '@/components/icon';
import Modal from '@/components/modal';
import { ERROR_MSG } from '@/data/errorMessages';
import { useBudgetTables } from '@/hooks/use-budget-tables';
import { useCategories } from '@/hooks/use-categories';
import { useDashboard } from '@/hooks/use-dashboard';
import { useModal } from '@/hooks/use-modal';
import PlusIcon from '@/images/icons/plus.svg?react';
import BudgetTable from '@/routes/dashboard/budget/budget-table';
import BudgetTableForm from '@/routes/dashboard/budget/budget-table-form';
import { addBudgetTable, editBudgetTable } from '@/routes/dashboard/budget/budget.api';
import { AddBudgetFormProps, Category, EditBudgetFormProps } from '@/routes/dashboard/budget/budget.types';
import supabase from '@/utils/supabase';

export default function Budget() {
  const { categories, setCategories } = useCategories();
  const { budgetTables, setBudgetTables } = useBudgetTables();
  const { activeModal, openModal, closeModal } = useModal();
  const { dashboardId } = useDashboard();

  const methods = useForm<AddBudgetFormProps>({
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
    keyName: '_id',
  });

  const editCategoriesArr = useFieldArray({
    control: editMethods.control,
    name: 'editCategories',
    keyName: '_id',
  });

  const onAddSubmit: SubmitHandler<AddBudgetFormProps> = async () => {
    await addBudgetTable({
      id: dashboardId,
      name: methods.getValues('name'),
      amount: methods.getValues('amount'),
      categories: categories,
      addCategories: methods.getValues('addCategories'),
      setBudgetTablesProvider: setBudgetTables,
    });
  };

  const onEditSubmit = useCallback(
    (budgetId: number): SubmitHandler<AddBudgetFormProps> => {
      return async () => {
        await editBudgetTable({
          id: budgetId,
          name: editMethods.getValues('name'),
          amount: editMethods.getValues('amount'),
          editCategories: editMethods.getValues('editCategories'),
          state: budgetTables,
          setBudgetTablesProvider: setBudgetTables,
        });
      };
    },
    [budgetTables, editMethods, setBudgetTables],
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
    <div className="col-span-full rounded-md sm:border sm:border-accent/10 sm:p-4 xl:col-span-2 xl:col-start-1 xl:row-start-1">
      <div className="flex flex-col gap-4 rounded-md border border-accent/10 bg-surface p-4">
        <div className="flex flex-row flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Budgets</h2>

          <ButtonSecondary onClick={() => openModal('addBudgetTableModal')} className="lg:px-2 lg:py-1">
            <Icon SvgIcon={PlusIcon} isBorderless />
          </ButtonSecondary>
        </div>

        <div className="flex max-h-[400px] flex-col gap-4 overflow-y-auto">
          {budgetTables.length > 0 ? (
            budgetTables.map((table) => (
              <BudgetTable key={table.id} table={table}>
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
                            ...(editMethods
                              .watch('editCategories')
                              ?.filter((category) => category.selected)
                              .map((category) => category.id) ?? []),
                          ]}
                        >
                          {editCategoriesArr.fields.map((field, index) => {
                            const isChecked = table.budget_categories.some(
                              (category) => category.category_id === field.id,
                            );
                            return (
                              <li key={field.id}>
                                <label
                                  htmlFor={field._id}
                                  className={`flex flex-row items-center justify-between rounded-sm px-2 py-1 text-sm hover:cursor-pointer hover:bg-accent/10`}
                                >
                                  {field.name}

                                  {isChecked ? (
                                    <input
                                      id={field._id}
                                      type="checkbox"
                                      className="rounded-md border border-accent/10 bg-transparent"
                                      defaultChecked={isChecked}
                                      {...editMethods.register(`editCategories.${index}.selected` as const)}
                                    />
                                  ) : (
                                    <input
                                      id={field._id}
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
            <p className="text-sm">You haven&apos;t created any budgets yet.</p>
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
                  handleNewCategoryModal={() => openModal('addNewCategoryModal')}
                  selectedCategories={(methods.watch('addCategories') ?? [])
                    .filter((category) => category.selected)
                    .map((category) => category.id)}
                >
                  {addCategoriesArr.fields.map((field, index) => (
                    <li key={field._id}>
                      <label
                        htmlFor={field._id}
                        className="flex flex-row items-center justify-between rounded-sm px-2 py-1 text-sm hover:cursor-pointer hover:bg-accent/10"
                      >
                        {field.name}
                        <input
                          id={field._id}
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
                    validate: (value) => {
                      const isDuplicate = categories.some((category) => category.name === value);
                      return !isDuplicate || 'Category already exists';
                    },
                  })}
                />
                {methods.formState.errors.new_category && (
                  <ErrorMessage error={methods.formState.errors.new_category.message} />
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
