import { useFieldArray, useFormContext } from 'react-hook-form';

import { ButtonPrimary } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import { Input } from '@/components/forms/custom-form';
import { ERROR_MSG } from '@/data/errorMessages';
import {
  AddBudgetTableFormData,
  AddBudgetTableFormProps,
  EditBudgetTableFormData,
  EditBudgetTableFormProps,
} from '@/routes/dashboard/budget/budget.types';
import Categories from '@/routes/dashboard/categories/categories';

export const AddBudgetTableForm = ({ tables, onSubmit }: AddBudgetTableFormProps) => {
  const {
    register,
    watch,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useFormContext<AddBudgetTableFormData>();

  const addCategoriesArr = useFieldArray({
    control: control,
    name: 'addCategories',
    keyName: '_id',
  });

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
        selectedCategories={(watch('addCategories') ?? [])
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
                {...register(`addCategories.${index}.selected` as const)}
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

export const EditBudgetTableForm = ({ table, tables, onSubmit }: EditBudgetTableFormProps) => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<EditBudgetTableFormData>();

  const editCategoriesArr = useFieldArray({
    control: control,
    name: 'editCategories',
    keyName: '_id',
  });

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
          ...(watch('editCategories')
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
                    {...register(`editCategories.${index}.selected` as const)}
                  />
                ) : (
                  <input
                    id={field._id}
                    type="checkbox"
                    className="rounded-md border border-accent/10 bg-transparent"
                    {...register(`editCategories.${index}.selected` as const)}
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
          Save budget table
        </ButtonPrimary>
      </div>
    </form>
  );
};
