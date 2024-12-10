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
import BudgetTable from "./BudgetTable";
import BudgetTableCategory from "./BudgetTableCategory";

type Category = {
  id: number;
  name: string;
};

export type CategoryWithAmount = Category & {
  amount: number;
  spent: number;
};

interface BudgetFormProps {
  name: string;
  amount: number;
  budgetCategories: CategoryWithAmount[];
  recurrence: string;
  start_date: Date;
  new_category: string;
}

export interface BudgetTableProps {
  id: number;
  name: string;
  budget_categories: CategoryWithAmount[];
  amount: number;
  remaining: number;
}

interface BudgetProps {
  dashboardId: number;
  data: BudgetTableProps[];
  catogeries: {
    id: number;
    name: string;
  }[];
}

type ActiveModal = "addBudgetTable" | "addNewCategory";

export default function Budget({ dashboardId, data, catogeries }: BudgetProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgetTable, setBudgetTable] = useState<BudgetTableProps[]>([]);
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);

  const openModal = (modal: ActiveModal) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    setFocus,
    control,
    formState: { errors, isSubmitSuccessful },
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
    if (activeModal === "addBudgetTable") {
      setFocus("name");

      return () => {
        reset();
      };
    }
  }, [activeModal]);

  const fetchBudgetTable = () => {
    setBudgetTable(data);
    setCategories(catogeries);
  };

  useEffect(() => {
    fetchBudgetTable();
  }, []);

  // update fields array default values on each category change
  useEffect(() => {
    reset({
      budgetCategories: categories,
    });
  }, [categories, reset]);

  const insertBudgetTable = async () => {
    try {
      const { data: budgetData, error: budgetError } = await supabase
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

      if (budgetError) {
        console.log("Error inserting budget:", budgetError);
        throw budgetError;
      }

      const selectedCategories = getValues("budgetCategories")
        .filter((category) => category.name)
        .map((category) => category.name);

      const { data: categoryData, error: categoryError } = await supabase
        .from("budget_categories")
        .insert(
          fields
            .filter((category) => selectedCategories.includes(category.name))
            .map((category) => ({
              budget_id: budgetData.id,
              name: category.name,
            })),
        )
        .select();

      if (categoryError) {
        console.log("Error inserting categories:", categoryError);
        throw categoryError;
      }

      setBudgetTable((prevData) => [
        ...prevData,
        {
          id: budgetData.id,
          name: getValues("name"),
          budget_categories: categoryData,
          amount: getValues("amount"),
          remaining: getValues("amount"),
        },
      ]);
      console.log(budgetTable);
    } catch (error) {
      console.error("Error inserting budget and categories:", error);

      // Optionally, show user-friendly error toast?
    }
  };

  const deleteBudgetTable = async (id: number) => {
    try {
      await supabase.from("budget").delete().eq("id", id);
      setBudgetTable((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  const onSubmit: SubmitHandler<BudgetFormProps> = async () => {
    await insertBudgetTable();
  };

  const onNewCategorySubmit: SubmitHandler<
    Pick<Category, "name">
  > = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .insert({
          dashboard_id: dashboardId,
          name: getValues("new_category"),
        })
        .select()
        .single();

      if (error) {
        console.log("Error inserting categories:", error);
        throw error;
      }

      if (data) {
        setCategories((prevCategories) => [...prevCategories, data]);
      }
    } catch (error) {
      console.error("Error inserting categories:", error);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      closeModal();
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="rounded-md border border-accent/10 p-4 md:col-span-full md:col-start-1 md:row-start-3 xl:col-span-3 xl:row-start-2">
      <div className="flex flex-col gap-4 rounded-md border border-accent/10 bg-surface p-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Budgets</h2>
          <ButtonSecondary
            aria-label="Add goal"
            onClick={() => openModal("addBudgetTable")}
          >
            <Icon SvgIcon={PlusIcon} isBorderless />
          </ButtonSecondary>
        </div>

        <div className="flex flex-col gap-4">
          {budgetTable.length > 0 ? (
            budgetTable.map((budget) => (
              <BudgetTable
                key={budget.id}
                name={budget.name}
                amount={budget.amount}
                onEdit={() => {}}
                onDelete={() => deleteBudgetTable(budget.id)}
              >
                {budget.budget_categories.map((category) => (
                  <BudgetTableCategory key={category.id} category={category} />
                ))}
              </BudgetTable>
            ))
          ) : (
            <p>No budgets found</p>
          )}
        </div>

        {activeModal === "addBudgetTable" && (
          <Modal
            id="addBudgetTableModal"
            title="Add a budget"
            isOpen={activeModal === "addBudgetTable"}
            handleClose={() => closeModal()}
          >
            <form
              id="addBudgetTableForm"
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
                    validate: (value) => {
                      return (
                        budgetTable.find((budget) => budget.name === value) &&
                        "Table name already exists"
                      );
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <Categories
                categoriesSelectedAmount={
                  watch("budgetCategories").filter((category) => category.name)
                    .length
                }
                selectedCategoriesName={watch("budgetCategories").map(
                  (category) => category.name,
                )}
              >
                {fields.map((field, index) => (
                  <li key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="flex flex-row items-center justify-between rounded-sm px-2 py-1 text-sm hover:cursor-pointer hover:bg-accent/10"
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

                <div className="flex flex-wrap gap-2 rounded-md border border-accent/10 p-2 text-xs">
                  <p>Can't find the category you're looking for?</p>
                  <button
                    type="button"
                    className="underline hover:text-copy-secondary"
                    onClick={() => openModal("addNewCategory")}
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

        {activeModal === "addNewCategory" && (
          <Modal
            id="addNewCategoryModal"
            title="Add New Category"
            isOpen={activeModal === "addNewCategory"}
            handleClose={() => closeModal()}
          >
            <form
              id="addNewCategoryForm"
              onSubmit={handleSubmit(onNewCategorySubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-4">
                <label htmlFor="name" className="text-sm">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter category name"
                  className="w-full rounded-md border border-accent/10 bg-transparent p-2"
                  {...register("new_category", {
                    required: {
                      value: true,
                      message: ERROR_MSG.FIELD_IS_REQUIRED,
                    },
                  })}
                />
                {errors.new_category && (
                  <p className="text-sm text-red-500">
                    {errors.new_category.message}
                  </p>
                )}

                <div className="flex flex-row items-center justify-end gap-2">
                  <ButtonPrimary type="submit">Add Category</ButtonPrimary>
                </div>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
}
