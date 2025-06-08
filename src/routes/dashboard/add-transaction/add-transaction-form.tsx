import React, { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { MoonLoader } from 'react-spinners';

import ChevronDownIcon from '@/images/icons/chevron-down.svg?react';

import { useAppSelector } from '@/hooks/use-redux';

import { ButtonSecondary } from '@/components/button';
import { Input, Select } from '@/components/custom-form';
import ErrorMessage from '@/components/error-message';
import Icon from '@/components/icon';
import {
  AddTransactionExpensesFormData,
  AddTransactionFormData,
  AddTransactionIncomeFormData,
} from '@/routes/dashboard/add-transaction/add-transaction.types';
import {
  useAddTransactionExpensesMutation,
  useAddTransactionIncomeMutation,
  useGetAllBudgetTablesQuery,
} from '@/routes/dashboard/api.slice';
import { Table } from '@/routes/dashboard/budget/budget.types';
import { getDashboardId } from '@/routes/dashboard/dashboard.slice';
import { TransactionType } from '@/routes/dashboard/transaction-history/transaction-history.types';

import { ERROR_MSG } from '@/data/errorMessages';

export default function AddTransactionForm({ handleModalClose }: { handleModalClose: () => void }) {
  const [transactionType, setTransactionType] = useState<TransactionType>('income');
  const dashboardId = useAppSelector(getDashboardId);

  const methods = useForm<AddTransactionFormData>();

  const [addTransactionIncome, { isLoading: isLoadingIncome, isSuccess: isSuccessIncome }] =
    useAddTransactionIncomeMutation();
  const [addTransactionExpenses, { isLoading: isLoadingExpenses, isSuccess: isSuccessExpenses }] =
    useAddTransactionExpensesMutation();

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<AddTransactionFormData> = async (data) => {
    if (transactionType === 'income') {
      try {
        await addTransactionIncome({
          dashboard_id: dashboardId,
          transaction_date: data.transaction_date,
          from: data.from,
          amount: data.amount,
          percent_saved: data.percent_saved,
          reference: data.reference,
        }).unwrap();
      } catch (error) {
        console.error('Failed to add income transaction:', error);
      }
    }

    if (transactionType === 'expenses') {
      try {
        await addTransactionExpenses({
          dashboard_id: dashboardId,
          transaction_date: data.transaction_date,
          budget: data.budget,
          category: data.category,
          amount: data.amount,
          reference: data.reference,
        }).unwrap();
      } catch (error) {
        console.error('Failed to add expenses transaction:', error);
      }
    }
  };

  // reset shared fields when transaction type changes
  useEffect(() => {
    reset({
      transaction_date: '',
      reference: '',
    });
    // cannot include in plain reset({}) since amount is of type number
    // using '' will throw TS error
    resetField('amount');
  }, [reset, resetField, transactionType]);

  useEffect(() => {
    if (isSuccessIncome || isSuccessExpenses) {
      reset();
      handleModalClose();
    }
  }, [isSuccessIncome, isSuccessExpenses, reset, handleModalClose]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="transaction-type">Transaction Type:</label>
          <div className="relative">
            <Select
              id="transaction-type"
              options={[
                { label: 'Income', value: 'income' },
                { label: 'Expenses', value: 'expenses' },
              ]}
              onChange={(event) => setTransactionType(event.currentTarget.value as TransactionType)}
            />

            <span aria-hidden className="absolute top-1/2 right-2 -translate-y-1/2">
              <Icon SvgIcon={ChevronDownIcon} isBorderless />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="transaction-date">Date:</label>
          <Input
            id="transaction-date"
            type="date"
            {...register('transaction_date', {
              required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
            })}
          />
          {errors.transaction_date && <ErrorMessage error={errors.transaction_date.message} />}
        </div>

        {transactionType === 'income' && <IncomeForm />}
        {transactionType === 'expenses' && <ExpensesForm />}

        <div className="flex flex-col gap-2">
          <label htmlFor="reference">Reference:</label>
          <Input id="reference" type="text" placeholder="e.g invoice number, remarks" {...register('reference')} />
          {errors.reference && <ErrorMessage error={errors.reference.message} />}
        </div>

        <ButtonSecondary type="submit" className={isLoadingIncome || isLoadingExpenses ? 'opacity-50' : ''}>
          <MoonLoader loading={isLoadingIncome || isLoadingExpenses} size={16} color="hsla(210, 96%, 40%, 1)" />
          <span>Add {transactionType === 'income' ? 'Income' : 'Expenses'}</span>
        </ButtonSecondary>
      </form>
    </FormProvider>
  );
}

const IncomeForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<AddTransactionIncomeFormData>();

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
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="income-amount">Amount:</label>
          <Input
            id="income-amount"
            type="number"
            min={0}
            step={50}
            placeholder="Enter amount"
            {...register('amount', {
              required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
              valueAsNumber: true,
              min: { value: 0, message: 'Amount must be greater than 0' },
            })}
          />
          {errors.amount && <ErrorMessage error={errors.amount.message} />}
        </div>

        <div className="flex w-full flex-col gap-2">
          <label htmlFor="income-savings-custom">Add to Savings (%):</label>
          <Input
            id="income-savings-custom"
            type="number"
            min={0}
            max={100}
            step={5}
            defaultValue={0}
            placeholder="0-100"
            {...register('percent_saved', {
              required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
            })}
          />
          {errors.percent_saved && <ErrorMessage error={errors.percent_saved.message} />}
        </div>
      </div>
    </>
  );
};

const ExpensesForm = () => {
  const dashboardId = useAppSelector(getDashboardId);
  const { data: budgetTables = [], isLoading } = useGetAllBudgetTablesQuery(dashboardId);
  const [selectedBudget, setSelectedBudget] = useState<Table | null>(null);

  const NO_BUDGET_FOUND = 'No budget found';
  const isBudgetFound = budgetTables.length > 0;

  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<AddTransactionExpensesFormData>();

  // initialize selectedBudget when budgetTables loads
  useEffect(() => {
    if (budgetTables.length > 0 && !selectedBudget) {
      const firstBudget = budgetTables[0];
      setSelectedBudget(firstBudget);
      setValue('budget', firstBudget.name);
    }
  }, [budgetTables, selectedBudget, setValue]);

  const budgetValue = watch('budget');

  // keep local state in sync with form state
  useEffect(() => {
    if (budgetValue && budgetValue !== selectedBudget?.name) {
      const foundBudget = budgetTables.find((budget) => budget.name === budgetValue);
      if (foundBudget) {
        setSelectedBudget(foundBudget);
      }
    }
  }, [budgetValue, selectedBudget, budgetTables]);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBudgetName = e.target.value;
    const foundBudget = budgetTables.find((budget) => budget.name === selectedBudgetName);

    if (foundBudget) {
      setSelectedBudget(foundBudget);
      setValue('budget', foundBudget.name);
    }

    setValue('category', '');
  };

  if (isLoading) {
    return (
      <>
        <div className="flex flex-col gap-2">
          <p className="opacity-50">Budget:</p>
          <Skeleton height={40} />
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex w-full flex-col gap-2">
            <p className="opacity-50">Category:</p>
            <Skeleton height={40} />
          </div>
          <div className="flex w-full flex-col gap-2">
            <p className="opacity-50">Amount:</p>
            <Skeleton height={40} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenses-budget">Budget:</label>
        <div className="relative">
          <Select
            id="expenses-budget"
            options={
              isBudgetFound
                ? budgetTables.map((table) => ({ label: table.name, value: table.name }))
                : [{ label: NO_BUDGET_FOUND, value: NO_BUDGET_FOUND }]
            }
            value={selectedBudget?.name || ''}
            {...register('budget', {
              required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
              validate: (value) => value !== NO_BUDGET_FOUND || 'Please create a budget first',
            })}
            onChange={handleBudgetChange}
          />
          <span aria-hidden className="absolute top-1/2 right-2 -translate-y-1/2">
            <Icon SvgIcon={ChevronDownIcon} isBorderless />
          </span>
        </div>
        {errors.budget && <ErrorMessage error={errors.budget.message} />}
      </div>

      {isBudgetFound && selectedBudget && selectedBudget.budget_categories && (
        <div className="flex flex-row gap-2">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="expenses-category">Category:</label>
            <div className="relative">
              <Select
                id="expenses-category"
                options={[
                  { label: 'Select category', value: '' },
                  ...selectedBudget.budget_categories.map((category) => ({
                    label: category.category_name,
                    value: category.category_name,
                  })),
                ]}
                {...register('category', {
                  required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
                })}
              />
              <span aria-hidden className="absolute top-1/2 right-2 -translate-y-1/2">
                <Icon SvgIcon={ChevronDownIcon} isBorderless />
              </span>
            </div>
            {errors.category && <ErrorMessage error={errors.category.message} />}
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="expenses-amount">Amount:</label>
            <Input
              id="expenses-amount"
              type="number"
              min={0}
              step={50}
              placeholder="Enter amount"
              {...register('amount', {
                required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
                valueAsNumber: true,
                min: { value: 0, message: 'Amount must be greater than 0' },
              })}
            />
            {errors.amount && <ErrorMessage error={errors.amount.message} />}
          </div>
        </div>
      )}
    </>
  );
};
