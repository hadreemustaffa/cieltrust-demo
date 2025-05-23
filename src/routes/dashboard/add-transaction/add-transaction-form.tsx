import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form';

import ChevronDownIcon from '@/images/icons/chevron-down.svg?react';

import { useBudgetTables } from '@/hooks/use-budget-tables';
import { useCategories } from '@/hooks/use-categories';
import { useDashboard } from '@/hooks/use-dashboard';
import { useModal } from '@/hooks/use-modal';
import { useOverview } from '@/hooks/use-overview';
import { useTransactionHistory } from '@/hooks/use-transaction-history';

import { ButtonSecondary } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import { Input, Select } from '@/components/forms/custom-form';
import Icon from '@/components/icon';
import { addTransaction } from '@/routes/dashboard/add-transaction/add-transaction.api';
import { ExpensesFormData, FormData, IncomeFormData } from '@/routes/dashboard/add-transaction/add-transaction.types';

import { ERROR_MSG } from '@/data/errorMessages';

export default function AddTransactionForm() {
  const [transactionType, setTransactionType] = useState<FormData['transactionType']>('income');
  const { closeModal } = useModal();
  const { dashboardId } = useDashboard();
  const { budgetTables, setBudgetTables } = useBudgetTables();
  const { categories } = useCategories();
  const { setOverview } = useOverview();
  const { setHistory } = useTransactionHistory();

  const methods = useForm<FormData & IncomeFormData & ExpensesFormData>();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = methods;

  const onSubmit: SubmitHandler<FormData & IncomeFormData & ExpensesFormData> = async () => {
    await addTransaction({
      dashboardId: dashboardId,
      transactionType: transactionType,
      budgetTables: budgetTables,
      categories: categories,
      setBudgetTables: setBudgetTables,
      setOverview: setOverview,
      setHistory: setHistory,
      date: getValues('date'),
      from: getValues('from'),
      percent_saved: getValues('percent_saved'),
      amount: getValues('amount'),
      reference: getValues('reference'),
      budget_id: getValues('budget_id'),
      category_id: getValues('category_id'),
    });
  };

  useEffect(() => {
    reset({}, { keepDirty: true });
  }, [reset, transactionType]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      closeModal();
    }
  }, [isSubmitSuccessful, reset, closeModal]);

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
              onChange={(event) => setTransactionType(event.currentTarget.value as FormData['transactionType'])}
            />

            <span aria-hidden className="absolute right-2 top-1/2 -translate-y-1/2">
              <Icon SvgIcon={ChevronDownIcon} isBorderless />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="transaction-date">Date:</label>
          <Input
            id="transaction-date"
            type="date"
            {...register('date', {
              required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
            })}
          />
          {errors.date && <ErrorMessage error={errors.date.message} />}
        </div>

        {transactionType === 'income' && <IncomeForm />}
        {transactionType === 'expenses' && <ExpensesForm />}

        <div className="flex flex-col gap-2">
          <label htmlFor="reference">Reference:</label>
          <Input id="reference" type="text" placeholder="e.g invoice number, remarks" {...register('reference')} />
          {errors.reference && <ErrorMessage error={errors.reference.message} />}
        </div>

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
      <div className="flex flex-col gap-2 sm:flex-row">
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
            {...register('percent_saved')}
          />
          {errors.percent_saved && <ErrorMessage error={errors.percent_saved.message} />}
        </div>
      </div>
    </>
  );
};

const ExpensesForm = () => {
  const { budgetTables } = useBudgetTables();
  const { categories } = useCategories();
  const NO_BUDGET_FOUND = 'No budget found';
  const isBudgetFound = budgetTables.length > 0;

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<ExpensesFormData>();

  const selectedBudgetId = watch('budget_id');
  const activeBudget = budgetTables.find((table) => table.id === selectedBudgetId) || budgetTables[0];

  useEffect(() => {
    if (activeBudget?.budget_categories?.length) {
      setValue('category_id', undefined);
    }
  }, [activeBudget, setValue]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenses-budget">Budget:</label>
        <div className="relative">
          <Select
            id="expenses-budget"
            options={
              isBudgetFound
                ? budgetTables.map((table) => ({ label: table.name, value: table.id }))
                : [{ label: NO_BUDGET_FOUND, value: NO_BUDGET_FOUND }]
            }
            defaultValue={isBudgetFound ? budgetTables[0].id : NO_BUDGET_FOUND}
            {...register('budget_id', {
              required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
              validate: (value) => value !== null || 'Please create a budget first',
            })}
          />
          <span aria-hidden className="absolute right-2 top-1/2 -translate-y-1/2">
            <Icon SvgIcon={ChevronDownIcon} isBorderless />
          </span>
        </div>
        {errors.budget_id && <ErrorMessage error={errors.budget_id.message} />}
      </div>

      {isBudgetFound && activeBudget && (
        <div className="flex flex-row gap-2">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="expenses-category">Category:</label>
            <div className="relative">
              <Select
                id="expenses-category"
                options={[
                  { label: 'Select category', value: '' },
                  ...activeBudget.budget_categories.map((category) => ({
                    label: categories.find((cat) => cat.id === category.category_id)?.name || '',
                    value: categories.find((cat) => cat.id === category.category_id)?.id || '',
                  })),
                ]}
                {...register('category_id', {
                  required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
                })}
              />
              <span aria-hidden className="absolute right-2 top-1/2 -translate-y-1/2">
                <Icon SvgIcon={ChevronDownIcon} isBorderless />
              </span>
            </div>
            {errors.category_id && <ErrorMessage error={errors.category_id.message} />}
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="expenses-amount">Amount:</label>
            <Input
              id="expenses-amount"
              type="number"
              min={0}
              placeholder="Enter amount"
              {...register('amount', {
                required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
                valueAsNumber: true,
              })}
            />
            {errors.amount && <ErrorMessage error={errors.amount.message} />}
          </div>
        </div>
      )}
    </>
  );
};
