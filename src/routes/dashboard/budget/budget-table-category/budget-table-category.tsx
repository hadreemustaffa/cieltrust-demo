import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useEditBudgetTableCategoryMutation } from '@/routes/dashboard/api.slice';
import { BudgetTableCategoryProps } from '@/routes/dashboard/budget/budget-table-category/budget-table-category.types';
import { EditBudgetTableCategoryFormData } from '@/routes/dashboard/budget/budget.types';

export default function BudgetTableCategory({ category }: BudgetTableCategoryProps) {
  const nameRef = useRef<HTMLParagraphElement>(null);
  const thRef = useRef<HTMLTableCellElement>(null);
  const [editBudgetTableCategory, { isLoading }] = useEditBudgetTableCategoryMutation();

  const spent = category.spent || 0;
  const remaining = category.amount - spent;
  const isOverBudget = spent > category.amount;
  const categoryName = category.category_name;

  const { register, handleSubmit } = useForm<EditBudgetTableCategoryFormData>({
    defaultValues: {
      amount: category.amount || 0,
    },
  });

  const onSubmit: SubmitHandler<EditBudgetTableCategoryFormData> = async (data) => {
    const newAmount = Number(data.amount);

    if (newAmount === category.amount || isNaN(newAmount)) return;

    await editBudgetTableCategory({
      category: category,
      amount: newAmount,
    }).unwrap();
  };

  return (
    <tr
      key={category.category_id}
      className={`border-accent/10 grid min-w-[500px] grid-cols-4 items-center justify-between border-b last:border-b-0 last-of-type:last:border-r-0 sm:w-full ${isLoading ? 'opacity-50' : ''}`}
    >
      <th scope="row" ref={thRef} className="relative overflow-hidden p-2 font-normal text-nowrap">
        <p ref={nameRef} title={categoryName}>
          {categoryName}
        </p>
      </th>

      <td className="border-accent/10 border-r border-l">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="number"
            min={0}
            className="focus:bg-accent/10 bg-accent/3 h-[calc(100%-1px)] w-full [appearance:textfield] p-2 text-right hover:cursor-pointer [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Insert amount"
            {...register('amount', {
              valueAsNumber: true,
              onBlur: handleSubmit(onSubmit),
            })}
          />
        </form>
      </td>

      <td className="border-accent/10 border-r p-2 text-right">${spent}</td>

      <td className="p-2 text-right font-semibold">
        {isOverBudget ? (
          <span className="bg-accent/10 rounded-md px-2 py-1 text-red-500">-${Math.abs(remaining)}</span>
        ) : (
          <span className="bg-accent/10 rounded-md px-2 py-1 text-green-500">${remaining}</span>
        )}
      </td>
    </tr>
  );
}
