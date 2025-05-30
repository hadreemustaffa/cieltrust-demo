import { useEffect } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { useAppSelector } from '@/hooks/use-redux';

import { ButtonPrimary } from '@/components/button';
import { Input } from '@/components/custom-form';
import ErrorMessage from '@/components/error-message';
import {
  useAddBudgetTableMutation,
  useEditBudgetTableMutation,
  useGetCategoriesQuery,
} from '@/routes/dashboard/api.slice';
import { getTables } from '@/routes/dashboard/budget/budget.slice';
import {
  AddBudgetTableFormData,
  AddBudgetTableFormProps,
  EditBudgetTableFormData,
  EditBudgetTableFormProps,
} from '@/routes/dashboard/budget/budget.types';
import Categories from '@/routes/dashboard/categories/categories';
import { getDashboardId } from '@/routes/dashboard/dashboard.slice';

import { ERROR_MSG } from '@/data/errorMessages';

export const AddBudgetTableForm = ({ tables, handleModalClose }: AddBudgetTableFormProps) => {
  const dashboardId = useAppSelector(getDashboardId);
  const { data: categories = [] } = useGetCategoriesQuery(dashboardId);
  const [addBudgetTable, { isSuccess: isAddBudgetSuccess }] = useAddBudgetTableMutation();

  const {
    register,
    watch,
    reset,
    control,
    setFocus,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<AddBudgetTableFormData>({
    defaultValues: {
      categories: categories.map((category) => {
        return {
          ...category,
          selected: false,
        };
      }),
    },
  });

  const addCategoriesArr = useFieldArray({
    control: control,
    name: 'categories',
    keyName: '_id',
  });

  const onSubmit: SubmitHandler<AddBudgetTableFormData> = async (data) => {
    try {
      await addBudgetTable({
        dashboardId: dashboardId,
        name: data.name,
        amount: data.amount,
        categories: data.categories,
      }).unwrap();
    } catch (error) {
      console.error('Failed to add budget table:', error);
    }
  };

  useEffect(() => {
    setFocus('name');

    return () => {
      reset();
    };
  }, [setFocus, reset]);

  useEffect(() => {
    if (categories.length > 0) {
      reset({
        categories: categories.map((category) => ({
          ...category,
          selected: false,
        })),
      });
    }
  }, [categories, reset]);

  useEffect(() => {
    if (isAddBudgetSuccess) {
      reset();
      handleModalClose();
    }
  }, [isAddBudgetSuccess, reset, handleModalClose]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="budgetName" className="text-sm">
          Name
        </label>

        <Input
          id="budgetName"
          type="text"
          placeholder="Enter budget name"
          defaultValue={''}
          autoComplete="off"
          aria-invalid={errors.name ? 'true' : 'false'}
          {...register('name', {
            required: {
              value: true,
              message: ERROR_MSG.FIELD_IS_REQUIRED,
            },
            validate: (value) => {
              return tables.find((table) => table.name === value) && 'Table already exists';
            },
          })}
        />
        {errors.name && <ErrorMessage error={errors.name.message} />}
      </div>

      <Categories
        handleNewCategoryModal={() => null}
        selectedCategories={(watch('categories') ?? [])
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
                {...register(`categories.${index}.selected` as const)}
              />
            </label>
          </li>
        ))}
      </Categories>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="budgetAmount" className="text-sm">
            Amount
          </label>

          <Input
            id="budgetAmount"
            type="number"
            min={0}
            className="w-full rounded-md border border-accent/10 bg-transparent p-2"
            placeholder="$ 0"
            defaultValue={''}
            aria-invalid={errors.name ? 'true' : 'false'}
            {...register('amount', {
              required: {
                value: true,
                message: ERROR_MSG.FIELD_IS_REQUIRED,
              },
            })}
          />

          {errors.amount && <ErrorMessage error={errors.amount.message} />}
        </div>
      </div>

      <div className="flex flex-row items-center justify-end gap-2 disabled:opacity-50">
        <ButtonPrimary type="submit" disabled={isSubmitting}>
          Create budget table
        </ButtonPrimary>
      </div>
    </form>
  );
};

export const EditBudgetTableForm = ({ table, handleModalClose }: EditBudgetTableFormProps) => {
  const dashboardId = useAppSelector(getDashboardId);
  const { data: categories = [] } = useGetCategoriesQuery(dashboardId);
  const [editBudgetTable, { isSuccess }] = useEditBudgetTableMutation();

  const {
    register,
    watch,
    reset,
    control,
    setFocus,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditBudgetTableFormData>({
    defaultValues: {
      table: table,
      categories: categories.map((category) => {
        return {
          ...category,
          selected: table.budget_categories.some((bc) => bc.category_id === category.id),
        };
      }),
    },
  });

  const tables = useAppSelector(getTables);

  const editCategoriesArr = useFieldArray({
    control: control,
    name: 'categories',
    keyName: '_id',
  });

  const onSubmit: SubmitHandler<EditBudgetTableFormData> = async (data) => {
    const selectedCategoriesIds = data.categories.filter((category) => category.selected).map((c) => c.id);
    const tableCategoriesId = table.budget_categories.map((bc) => bc.category_id);

    const isSameName = table.name === data.name;
    const isSameAmount = table.amount === data.amount;
    const isSameCategories =
      selectedCategoriesIds.length === tableCategoriesId.length &&
      selectedCategoriesIds.every((id, index) => id === tableCategoriesId[index]);

    if (isSameName && isSameCategories && isSameAmount) {
      return;
    }

    try {
      await editBudgetTable({
        id: table.id,
        name: data.name,
        amount: data.amount,
        table: table,
        dashboardId: dashboardId,
        categories: data.categories,
      }).unwrap();
    } catch (error) {
      console.error('Failed to update budget table:', error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      handleModalClose();
    }
  }, [isSuccess, reset, handleModalClose]);

  useEffect(() => {
    setFocus('name');

    return () => {
      reset();
    };
  }, [setFocus, reset]);

  useEffect(() => {
    if (categories.length > 0) {
      reset({
        categories: categories.map((category) => ({
          ...category,
          selected: table.budget_categories.some((bc) => bc.category_id === category.id),
        })),
      });
    }
  }, [categories, reset, table.budget_categories]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="budgetName" className="text-sm">
          Name
        </label>

        <Input
          id="budgetName"
          type="text"
          placeholder="Enter budget name"
          defaultValue={table.name}
          autoComplete="off"
          aria-invalid={errors.name ? 'true' : 'false'}
          {...register('name', {
            required: {
              value: true,
              message: ERROR_MSG.FIELD_IS_REQUIRED,
            },
            validate: (value) => {
              if (table.name === value) {
                return true;
              } else {
                return (
                  tables.find((stateTable) => stateTable !== table && stateTable.name === value) &&
                  'Table already exists'
                );
              }
            },
          })}
        />
        {errors.name && <ErrorMessage error={errors.name.message} />}
      </div>

      <Categories
        handleNewCategoryModal={() => null}
        selectedCategories={[
          ...(watch('categories')
            ?.filter((category) => category.selected)
            .map((category) => category.id) ?? []),
        ]}
      >
        {editCategoriesArr.fields.map((field, index) => {
          const isChecked = table.budget_categories.some((category) => category.category_id === field.id);
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
                    {...register(`categories.${index}.selected` as const)}
                  />
                ) : (
                  <input
                    id={field._id}
                    type="checkbox"
                    className="rounded-md border border-accent/10 bg-transparent"
                    {...register(`categories.${index}.selected` as const)}
                  />
                )}
              </label>
            </li>
          );
        })}
      </Categories>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="budgetAmount" className="text-sm">
            Amount
          </label>

          <Input
            id="budgetAmount"
            type="number"
            min={0}
            className="w-full rounded-md border border-accent/10 bg-transparent p-2"
            placeholder="$ 0"
            defaultValue={table.amount}
            aria-invalid={errors.amount ? 'true' : 'false'}
            {...register('amount', {
              required: {
                value: true,
                message: ERROR_MSG.FIELD_IS_REQUIRED,
              },
            })}
          />

          {errors.amount && <ErrorMessage error={errors.amount.message} />}
        </div>
      </div>

      <div className="flex flex-row items-center justify-end gap-2 disabled:opacity-50">
        <ButtonPrimary type="submit" disabled={isSubmitting}>
          Save budget table
        </ButtonPrimary>
      </div>
    </form>
  );
};
