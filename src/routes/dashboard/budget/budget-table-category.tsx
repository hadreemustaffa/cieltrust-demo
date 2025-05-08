import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useBudgetTables } from '@/hooks/use-budget-tables';
import { BudgetTableCategoryProps } from '@/routes/dashboard/budget/budget.types';
import supabase from '@/utils/supabase';

export default function BudgetTableCategory({ category }: BudgetTableCategoryProps) {
  const [budgetAmount, setBudgetAmount] = useState(category.amount || 0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const thRef = useRef<HTMLTableCellElement>(null);
  const { setBudgetTables } = useBudgetTables();

  const spent = category.spent || 0;
  const remaining = budgetAmount - spent;
  const isOverBudget = spent > budgetAmount;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      amount: budgetAmount,
    },
  });

  const checkOverflow = () => {
    if (nameRef.current && thRef.current) {
      setIsOverflowing(nameRef.current.scrollWidth > thRef.current.offsetWidth - 10);
    }
  };

  const onSubmit = async (data: { amount: number }) => {
    const newAmount = Number(data.amount);

    if (newAmount === budgetAmount) return;

    try {
      const { data: updatedData, error } = await supabase
        .from('budget_categories')
        .update({ amount: newAmount })
        .eq('id', category.id)
        .select();

      if (error) {
        console.error('Error updating category amount:', error);
        return;
      }

      if (updatedData) {
        setBudgetAmount(newAmount);

        setBudgetTables((prevTables) =>
          prevTables.map((table) => {
            if (!table.budget_categories.some((cat) => cat.id === category.id)) {
              return table;
            }

            return {
              ...table,
              budget_categories: table.budget_categories.map((cat) =>
                cat.id === category.id ? { ...cat, amount: newAmount } : cat,
              ),
            };
          }),
        );
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
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
      key={category.id}
      className="grid min-w-[500px] grid-cols-4 items-center justify-between border-b border-accent/10 last:border-b-0 last-of-type:last:border-r-0 sm:w-full"
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
          {category.name}
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
