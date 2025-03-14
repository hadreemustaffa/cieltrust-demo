import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form';

import { ButtonSecondary } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import { Input, Select } from '@/components/forms/custom_form';
import Icon from '@/components/icon';
import { ERROR_MSG } from '@/data/errorMessages';
import { useBudgetTables } from '@/hooks/use-budget-tables';
import ChevronDownIcon from '@/images/icons/chevron-down.svg?react';
import { ExpensesFormData, FormData, IncomeFormData } from '@/routes/dashboard/add-transaction/add-transaction.types';

export default function AddTransactionForm() {
  const [transactionType, setTransactionType] = useState('income');

  const methods = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="transaction-type">Transaction Type:</label>
          <div className="relative">
            <Select
              options={[
                { label: 'Income', value: 'income' },
                { label: 'Expenses', value: 'expenses' },
              ]}
              name="transaction-type"
              onChange={(event) => setTransactionType(event.currentTarget.value)}
              defaultValue="income"
            />

            <span aria-hidden className="absolute right-2 top-1/2 -translate-y-1/2">
              <Icon SvgIcon={ChevronDownIcon} isBorderless />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="transaction-type">Date:</label>
          <Input
            type="date"
            {...methods.register('date', {
              required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
            })}
          />
          {methods.formState.errors.date && <ErrorMessage error={methods.formState.errors.date.message} />}
        </div>

        {transactionType === 'income' && <IncomeForm />}
        {transactionType === 'expenses' && <ExpensesForm />}

        <ButtonSecondary type="submit">Submit</ButtonSecondary>
      </form>
    </FormProvider>
  );
}

const IncomeForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IncomeFormData>();

  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="income-from">From:</label>
        <Input
          id="income-from"
          type="text"
          placeholder="e.g Jane Doe / Jane Doe & Co."
          {...register('from', {
            required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
          })}
        />
        {errors.from && <ErrorMessage error={errors.from.message} />}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="income-amount">Amount:</label>
        <Input
          id="income-amount"
          type="number"
          min={0}
          placeholder="Enter amount"
          {...register('amount', {
            required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
          })}
        />
        {errors.amount && <ErrorMessage error={errors.amount.message} />}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="income-reference">Reference:</label>
        <Input
          id="income-reference"
          type="text"
          placeholder="e.g Invoice Number, Transaction Id"
          {...register('reference')}
        />
        {errors.reference && <ErrorMessage error={errors.reference.message} />}
      </div>
    </>
  );
};

const ExpensesForm = () => {
  const { budgetTables } = useBudgetTables();

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ExpensesFormData>();

  const findBudgetTable = budgetTables.find((table) => table.name === watch('budget')) ?? budgetTables[0];

  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="income-from">Budget:</label>
        <div className="relative">
          <Select
            options={budgetTables.map(({ name }) => ({ label: name, value: name }))}
            defaultValue={budgetTables[0].name}
            {...register('budget', {
              required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
            })}
          />
          <span aria-hidden className="absolute right-2 top-1/2 -translate-y-1/2">
            <Icon SvgIcon={ChevronDownIcon} isBorderless />
          </span>
        </div>
        {errors.budget && <ErrorMessage error={errors.budget.message} />}
      </div>

      <div className="flex flex-row gap-2">
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="expenses-category">Category:</label>
          <div className="relative">
            <Select
              options={findBudgetTable.budget_categories.map(({ name }) => ({ label: name, value: name }))}
              {...register('category', {
                required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
              })}
            />
            <span aria-hidden className="absolute right-2 top-1/2 -translate-y-1/2">
              <Icon SvgIcon={ChevronDownIcon} isBorderless />
            </span>
          </div>
          {errors.category && <ErrorMessage error={errors.category.message} />}
        </div>
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="income-amount">Amount:</label>
          <Input
            id="income-amount"
            type="number"
            min={0}
            placeholder="Enter amount"
            {...register('amount', {
              required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
            })}
          />
          {errors.amount && <ErrorMessage error={errors.amount.message} />}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="income-reference">Reference:</label>
        <Input
          id="income-reference"
          type="text"
          placeholder="e.g Invoice Number, Transaction Id"
          {...register('reference')}
        />
        {errors.reference && <ErrorMessage error={errors.reference.message} />}
      </div>
    </>
  );
};
