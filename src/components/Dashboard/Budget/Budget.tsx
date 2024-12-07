import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

// icons import
import PlusIcon from "../../../images/icons/plus.svg?react";

// components import
import { ButtonPrimary, ButtonSecondary } from "../../Button";
import Icon from "../../Icon";
import Modal from "../../Modal";
import { ERROR_MSG } from "../../../data/errorMessages";
import Categories from "../../Categories";
import supabase from "../../../utils/supabase";
import MoreMenu from "../../MoreMenu";

type LocalCategory = {
  name: string;
  amount: number;
  spent: number;
};

type Category = {
  id: number;
  name: string;
  amount: number;
  spent: number;
};

interface BudgetFormProps {
  name: string;
  amount: number;
  budgetCategories: Category[];
  recurrence: string;
  start_date: Date;
  new_category: string;
}

export interface BudgetTable {
  id: number;
  name: string;
  budget_categories: Category[];
  amount: number;
  remaining: number;
}

interface BudgetProps {
  dashboardId: number;
  data: BudgetTable[];
}

export default function Budget({ dashboardId, data }: BudgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<LocalCategory[]>([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [budgetTable, setBudgetTable] = useState<BudgetTable[]>([]);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setFocus,
    control,
    formState: { errors },
  } = useForm<BudgetFormProps>({
    defaultValues: {
      budgetCategories: categories,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "budgetCategories",
  });

  useEffect(() => {
    reset({
      budgetCategories: categories,
    });
  }, [categories, reset]);

  const insertBudget = async () => {
    try {
      const { data, error } = await supabase
        .from("budget")
        .insert({
          dashboard_id: dashboardId,
          name: getValues("name"),
          amount: getValues("amount"),
          recurrence: getValues("recurrence"),
          start_date: getValues("start_date"),
        })
        .select()
        .single();

      if (error) {
        console.log("Error inserting budget:", error);
        throw error;
      }

      const { data: categoryData, error: categoryError } = await supabase
        .from("budget_categories")
        .insert(
          fields.map((category) => ({
            budget_id: data.id,
            name: category.name,
          })),
        )
        .select();

      if (categoryError) {
        console.log("Error inserting categories:", categoryError);
        throw categoryError;
      }

      console.log({ budget: data, categories: categoryData });
      return { budget: data, categories: categoryData };
    } catch (error) {
      console.error("Error inserting budget and categories:", error);

      // Optionally, show user-friendly error toast?
      return null;
    }
  };

  const fetchBudget = () => {
    setBudgetTable(data);
  };

  const onSubmit: SubmitHandler<BudgetFormProps> = async () => {
    await insertBudget();
  };

  const handleNewCategorySubmit = () => {
    const newCategory = {
      name: getValues("new_category"),
      amount: 0,
      spent: 0,
    };
    setCategories((prevCategories) => [...prevCategories, newCategory]);
    setIsAddingCategory(false);
  };

  useEffect(() => {
    fetchBudget();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setFocus("name");
      return () => {
        reset();
      };
    }
  }, [isOpen]);

  return (
    <div className="rounded-md border border-accent/10 p-4">
      <div className="flex flex-col gap-4 rounded-md border border-accent/10 bg-surface p-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Budgets</h2>
          <ButtonSecondary
            aria-label="Add goal"
            onClick={() => setIsOpen(true)}
          >
            <Icon SvgIcon={PlusIcon} isBorderless />
          </ButtonSecondary>
        </div>

        <div className="flex flex-col gap-4">
          {budgetTable.length > 0 ? (
            budgetTable.map((budget) => (
              <div
                key={budget.id}
                className="flex flex-col items-start gap-4 rounded-md border border-accent/10 p-4 text-left"
              >
                <table className="flex w-full flex-col items-center justify-between gap-4">
                  <caption className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-accent/10 pb-4">
                    <h3 className="font-bold">{budget.name}</h3>
                    <div className="flex gap-2">
                      <p className="text-sm font-semibold">${budget.amount}</p>
                      <MoreMenu
                        onEdit={() => console.log("Edit")}
                        isDeletable
                        onDelete={() => console.log("Delete")}
                      />
                    </div>
                  </caption>

                  <tbody className="flex w-full flex-col gap-4 overflow-x-scroll md:overflow-auto">
                    <tr className="grid w-screen grid-cols-4 justify-between gap-2 md:w-full">
                      <th scope="col">Category</th>
                      <th scope="col" className="text-right">
                        Budget
                      </th>
                      <th scope="col" className="text-right">
                        Spent
                      </th>
                      <th scope="col" className="text-right">
                        Remaining
                      </th>
                    </tr>
                    {budget.budget_categories.map((category) => (
                      <tr
                        key={category.id}
                        className="grid w-screen grid-cols-4 items-center justify-between gap-2 md:w-full"
                      >
                        <th scope="row" className="font-normal">
                          {category.name}
                        </th>

                        <td className="text-right">
                          <input
                            type="number"
                            min={0}
                            defaultValue={category.amount}
                            className="w-20 rounded-md border border-accent/10 bg-transparent p-1 text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            placeholder="0"
                            {...register(
                              `budgetCategories.${category.id}.amount`,
                            )}
                          />
                        </td>

                        <td className="text-right">${category.spent}</td>
                        <td className="text-right">
                          ${category.amount - category.spent}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p>No budgets found</p>
          )}
        </div>

        {isOpen && (
          <Modal
            id="addSavingGoalModal"
            title="Add a budget"
            isOpen={isOpen}
            handleClose={() => setIsOpen(false)}
          >
            <form
              id="addSavingGoalForm"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="goalName" className="text-sm">
                  Name
                </label>

                <input
                  id="goalName"
                  type="text"
                  placeholder="Enter budget name"
                  className="w-full rounded-md border border-accent/10 bg-transparent p-2"
                  defaultValue={""}
                  autoComplete="off"
                  aria-invalid={errors.name ? "true" : "false"}
                  {...register("name", {
                    required: {
                      value: true,
                      message: ERROR_MSG.FIELD_IS_REQUIRED,
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <Categories>
                {fields.map((field, index) => (
                  <li key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="flex flex-row items-center justify-between rounded-sm text-sm hover:cursor-pointer hover:bg-accent/10"
                    >
                      {field.name}
                      <input
                        id={field.id}
                        type="checkbox"
                        defaultValue={field.name}
                        className="rounded-md border border-accent/10 bg-transparent"
                        {...register(`budgetCategories.${index}.name` as const)}
                      />
                    </label>
                  </li>
                ))}
                {isAddingCategory && (
                  <div className="flex flex-row items-center justify-between gap-2">
                    <input
                      id="newCategory"
                      type="text"
                      placeholder="Enter category name"
                      className="w-full rounded-sm border border-accent/10 bg-transparent p-2"
                      {...register("new_category")}
                    />
                    <button
                      type="button"
                      className="rounded-sm border border-accent/10 bg-transparent p-2"
                      onClick={handleNewCategorySubmit}
                    >
                      Add
                    </button>
                  </div>
                )}
                <div className="flex flex-wrap gap-2 text-xs">
                  <p>Can't find the category you're looking for?</p>
                  <button
                    type="button"
                    className="underline"
                    onClick={() => setIsAddingCategory(true)}
                  >
                    Create a new one
                  </button>
                </div>
              </Categories>

              <div className="flex flex-col gap-2">
                <label htmlFor="startDate" className="text-sm">
                  Start Date
                </label>
                <input
                  id="startDate"
                  type="date"
                  className="w-full rounded-md border border-accent/10 bg-transparent p-2"
                  defaultValue={""}
                  min={new Date().toISOString().split("T")[0]}
                  {...register("start_date", {
                    required: {
                      value: true,
                      message: ERROR_MSG.FIELD_IS_REQUIRED,
                    },
                    valueAsDate: true,
                  })}
                />
                {errors.start_date && (
                  <p className="text-sm text-red-500">
                    {errors.start_date.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="budgetAmount" className="text-sm">
                    Amount
                  </label>
                  <input
                    id="budgetAmount"
                    type="number"
                    min={0}
                    className="w-full rounded-md border border-accent/10 bg-transparent p-2"
                    placeholder="$ 0"
                    {...register("amount")}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="budgetRecurrence" className="text-sm">
                    Recurrence
                  </label>

                  <select
                    id="budgetRecurrence"
                    className="rounded-md border border-accent/10 bg-transparent p-2"
                    {...register("recurrence")}
                  >
                    <option>Monthly</option>
                    <option>Weekly</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-row items-center justify-end gap-2">
                <ButtonPrimary type="submit">Create budget table</ButtonPrimary>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
}
