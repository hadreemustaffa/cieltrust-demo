import { useForm } from "react-hook-form";
import { CategoryWithAmount } from "./Budget";
import { useState } from "react";

interface BudgetTableCategoryProps {
  category: CategoryWithAmount;
}

export default function BudgetTableCategory({
  category,
}: BudgetTableCategoryProps) {
  const [isLimit, setIsLimit] = useState(false);

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

  const remaining = category.amount - category.spent;
  const spent = category.spent;

  return (
    <tr
      key={category.id}
      className="grid w-[440px] grid-cols-4 items-center justify-between gap-2 sm:w-full"
    >
      <th scope="row" className="break-words font-normal">
        {category.name}
      </th>

      <td className="text-right">
        <form
          onSubmit={handleSubmit(() =>
            console.log(getValues("category.amount")),
          )}
        >
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
      <td className="text-right">${remaining}</td>
    </tr>
  );
}
