import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import supabase from "../../../utils/supabase";

export type Category = {
  id?: number;
  name: string;
  selected?: boolean;
};

export type CategoryWithAmount = Category & {
  amount: number;
  spent: number;
};

interface BudgetTableCategoryProps {
  category: CategoryWithAmount;
  totalBudgetAmount: number;
}

export default function BudgetTableCategory({
  category,
  totalBudgetAmount,
}: BudgetTableCategoryProps) {
  const [amountLimit, setAmountLimit] = useState(totalBudgetAmount);
  const [budgetAmount, setBudgetAmount] = useState(category.amount);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitSuccessful },
  } = useForm<BudgetTableCategoryProps>({
    defaultValues: {
      category: {
        amount: category.amount,
      },
    },
  });

  const spent = category.spent + 100;
  const remaining = budgetAmount - spent;

  const onSubmit: SubmitHandler<BudgetTableCategoryProps> = async () => {
    try {
      const { data, error } = await supabase
        .from("budget_categories")
        .update({
          amount: getValues("category.amount"),
        })
        .eq("id", category.id)
        .select();

      if (error) {
        console.log("Error updating category amount:", error);
        throw error;
      }

      if (data) {
        setBudgetAmount(getValues("category.amount"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAmountLimit(totalBudgetAmount);
  }, []);

  return (
    <tr
      key={category.id}
      className="grid w-[440px] grid-cols-4 items-center justify-between gap-2 sm:w-full"
    >
      <th scope="row" className="break-words font-normal">
        {category.name}
      </th>

      <td className="text-right">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="number"
            min={0}
            className="w-full max-w-40 rounded-md border border-accent/10 bg-transparent p-1 text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="0"
            {...register("category.amount")}
          />
        </form>
      </td>

      <td className="text-right">${spent}</td>
      <td className="text-right font-semibold">
        {spent > budgetAmount ? (
          <span className="rounded-md bg-accent/10 px-2 py-1 text-red-500">
            -${Math.abs(remaining)}
          </span>
        ) : (
          <span className="rounded-md bg-accent/10 px-2 py-1 text-green-500">
            ${remaining}
          </span>
        )}
      </td>
    </tr>
  );
}
