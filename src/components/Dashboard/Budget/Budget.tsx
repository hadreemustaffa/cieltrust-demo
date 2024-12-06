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
import useOutsideClick from "../../../hooks/useOutsideClick";
import supabase from "../../../utils/supabase";

interface BudgetFormProps {
  name: string;
  amount: number;
  categories: {
    name: string;
    amount: number;
    spent: number;
  }[];
  recurrence: string;
  start_date: Date;
  new_category: string;
}

export default function Budget({ dashboardId }: { dashboardId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

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
      categories: [
        {
          name: "Groceries",
          amount: 0,
          spent: 0,
        },
        {
          name: "Rent",
          amount: 0,
          spent: 0,
        },
      ],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "categories",
  });

  const insertBudget = async () => {
    const { data, error } = await supabase
      .from("budget")
      .insert({
        dashboard_id: dashboardId,
        name: getValues("name"),
        amount: getValues("amount"),
        recurrence: getValues("recurrence"),
        start_date: getValues("start_date"),
      })
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
    }

    const { data: categoryData, error: categoryError } = await supabase
      .from("budget_categories")
      .insert(
        fields.map((category) => ({
          budget_id: data[0].id,
          name: category.name,
        })),
      );

    if (categoryError) {
      console.log(categoryError);
    }

    if (categoryData) {
      console.log(categoryData);
    }
  };

  const onSubmit: SubmitHandler<BudgetFormProps> = async () => {
    await insertBudget();
  };

  const handleNewCategorySubmit = () => {
    // const { data, error } = await supabase
    //   .from("budget_categories")
    //   .insert({ name: getValues("new_category") })
    //   .select();
    // if (error) {
    //   console.log(error);
    // }
    // if (data) {
    //   console.log(data);
    //   setCategories((prevCategories) => [...prevCategories, data[0].name]);
    // }
    // const newCategory = getValues("new_category");
    // setCategories((prevCategories) => [...prevCategories, newCategory]);
    // setIsAddingCategory(false);
  };

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
                        {...register(`categories.${index}.name` as const)}
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
