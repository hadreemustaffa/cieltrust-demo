import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useEditBudgetTableCategoryMutation } from '@/routes/dashboard/api.slice';
import { BudgetTableCategoryProps } from '@/routes/dashboard/budget/budget-table-category/budget-table-category.types';
import { EditBudgetTableCategoryFormData } from '@/routes/dashboard/budget/budget.types';

export default function BudgetTableCategory({ category }: BudgetTableCategoryProps) {
  const [isOverflowing, setIsOverflowing] = useState(false);
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

  const checkOverflow = () => {
    if (nameRef.current && thRef.current) {
      setIsOverflowing(nameRef.current.scrollWidth > thRef.current.offsetWidth - 10);
    }
  };

  const onSubmit: SubmitHandler<EditBudgetTableCategoryFormData> = async (data) => {
    const newAmount = Number(data.amount);

    if (newAmount === category.amount || isNaN(newAmount)) return;

    await editBudgetTableCategory({
      category: category,
      amount: newAmount,
    }).unwrap();
  };

  useEffect(() => {
    checkOverflow();

    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkOverflow, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [category.name]);

  return (
    <tr
      key={category.category_id}
      className={`grid min-w-[500px] grid-cols-4 items-center justify-between border-b border-accent/10 last:border-b-0 last-of-type:last:border-r-0 sm:w-full ${isLoading ? 'opacity-50' : ''}`}
    >
      <th
        scope="row"
        ref={thRef}
        className="relative overflow-hidden text-nowrap p-2 font-normal hover:overflow-visible"
      >
        <p
          ref={nameRef}
          className={
            isOverflowing
              ? 'hover:absolute hover:left-1 hover:top-1/2 hover:w-max hover:-translate-y-1/2 hover:bg-copy hover:p-1 hover:text-background'
              : ''
          }
        >
          {categoryName}
        </p>
      </th>

      <td className="border-l border-r border-accent/10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="number"
            min={0}
            className="h-[calc(100%-1px)] w-full bg-transparent p-2 text-right [appearance:textfield] hover:cursor-pointer focus:bg-accent/10 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Insert amount"
            {...register('amount', {
              valueAsNumber: true,
              onBlur: handleSubmit(onSubmit),
            })}
          />
        </form>
      </td>

      <td className="border-r border-accent/10 p-2 text-right">${spent}</td>

      <td className="p-2 text-right font-semibold">
        {isOverBudget ? (
          <span className="rounded-md bg-accent/10 px-2 py-1 text-red-500">-${Math.abs(remaining)}</span>
        ) : (
          <span className="rounded-md bg-accent/10 px-2 py-1 text-green-500">${remaining}</span>
        )}
      </td>
    </tr>
  );
}
