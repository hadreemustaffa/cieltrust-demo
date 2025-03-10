import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ButtonSecondary } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import { Input } from '@/components/forms/custom_form';
import Icon from '@/components/icon';
import { ERROR_MSG } from '@/data/errorMessages';
import { useDashboard } from '@/hooks/use-dashboard';
import ChevronDownIcon from '@/images/icons/chevron-down.svg?react';
import { addTransaction } from '@/routes/dashboard/add-transaction/add-transaction.api';
import { FormData, FormProps } from '@/routes/dashboard/add-transaction/add-transaction.types';
import { formatStr } from '@/utils/formatStr';

export default function AddTransactionForm() {
  const [activeTab, setActiveTab] = useState('balance');

  return (
    <>
      <div className="relative w-full rounded-md border border-accent/10 sm:hidden">
        <select
          className="w-full appearance-none rounded-md bg-card p-2 hover:cursor-pointer"
          onChange={(event) => setActiveTab(event.currentTarget.value)}
          defaultValue="balance"
        >
          <option value="balance">Balance</option>
          <option value="income">Income</option>
          <option value="expenses">Expenses</option>
          <option value="savings">Savings</option>
        </select>

        <span className="absolute right-2 top-1/2 -translate-y-1/2">
          <Icon SvgIcon={ChevronDownIcon} isBorderless />
        </span>
      </div>

      <ul className={`hidden sm:flex sm:flex-row`}>
        <li
          className={`w-full border border-accent/10 p-2 hover:cursor-pointer hover:bg-accent/10 ${activeTab === 'balance' && 'bg-accent/10'}`}
          onClick={() => setActiveTab('balance')}
        >
          <button type="button">Balance</button>
        </li>
        <li
          className={`w-full border border-accent/10 p-2 hover:cursor-pointer hover:bg-accent/10 ${activeTab === 'income' && 'bg-accent/10'}`}
          onClick={() => setActiveTab('income')}
        >
          <button type="button">Income</button>
        </li>
        <li
          className={`w-full border border-accent/10 p-2 hover:cursor-pointer hover:bg-accent/10 ${activeTab === 'expenses' && 'bg-accent/10'}`}
          onClick={() => setActiveTab('expenses')}
        >
          <button type="button">Expenses</button>
        </li>
        <li
          className={`w-full border border-accent/10 p-2 hover:cursor-pointer hover:bg-accent/10 ${activeTab === 'savings' && 'bg-accent/10'}`}
          onClick={() => setActiveTab('savings')}
        >
          <button type="button">Savings</button>
        </li>
      </ul>

      {activeTab === 'balance' && <Form name="balance" />}
      {activeTab === 'income' && <Form name="income" />}
      {activeTab === 'expenses' && <Form name="expenses" />}
      {activeTab === 'savings' && <Form name="savings" />}
    </>
  );
}

const Form = ({ name }: FormProps) => {
  const { dashboardId } = useDashboard();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async () => {
    await addTransaction({ name, amount: getValues('amount'), id: dashboardId });
  };

  return (
    <div className="flex flex-col gap-2">
      <h2>Update {formatStr(name)}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Input
            type="number"
            placeholder={formatStr(name)}
            {...register('amount', {
              required: { value: true, message: ERROR_MSG.FIELD_IS_REQUIRED },
            })}
          />
          {errors.amount && <ErrorMessage error={errors.amount.message} />}
        </div>

        <ButtonSecondary type="submit">Update</ButtonSecondary>
      </form>
    </div>
  );
};
