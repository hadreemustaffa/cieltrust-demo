import { useCallback, useEffect, useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import supabase from "../../../utils/supabase";
import useModal from "../../../hooks/useModal";
import { useDashboard } from "../../../context/DashboardContext";
import { ERROR_MSG } from "../../../data/errorMessages";

// icons import
import PlusIcon from "../../../images/icons/plus.svg?react";

// components import
import { ButtonPrimary, ButtonSecondary } from "../../Button";
import Icon from "../../Icon";
import Modal from "../../Modal";
import Categories from "../../Categories";
import BudgetTable, { Table } from "./BudgetTable";
import { Category } from "./BudgetTableCategory";
import BudgetTableForm from "../../Forms/BudgetTableForm";

export interface BudgetFormProps {
  id: number;
  name: string;
  amount: number;
  addCategories?: Category[];
  editCategories?: Category[];
  recurrence: string;
  start_date: Date;
  new_category: string;
}

export interface BudgetProps {
  data: Table[];
  fetchedCategories: {
    id: number;
    name: string;
    selected?: boolean;
  }[];
}

export default function Budget({ data, fetchedCategories }: BudgetProps) {
  const [budgetTables, setBudgetTables] = useState<Table[]>(data);
  const [categories, setCategories] = useState<Category[]>(
    fetchedCategories.map((category: Category) => ({
      ...category,
      selected: false,
    })),
  );

  const { dashboardId } = useDashboard();

  const { activeModal, openModal, closeModal } = useModal();

  const methods = useForm<BudgetFormProps>({
    defaultValues: {
      addCategories: categories,
      editCategories: categories,
    },
  });

  const addCategoriesArr = useFieldArray({
    control: methods.control,
    name: "addCategories",
  });

  const editCategoriesArr = useFieldArray({
    control: methods.control,
    name: "editCategories",
  });

  const addBudgetTableWithCategories = async () => {
    try {
      const { data: budgetData, error: budgetError } = await supabase
        .from("budget")
        .insert({
          dashboard_id: dashboardId,
          name: methods.getValues("name"),
          amount: methods.getValues("amount"),
          recurrence: methods.getValues("recurrence"),
          start_date: methods
            .getValues("start_date")
            .toISOString()
            .split("T")[0],
        })
        .select()
        .single();

      if (budgetError) {
        console.log("Error inserting budget:", budgetError);
        throw budgetError;
      }

      const selectedCategories = (methods.getValues("addCategories") ?? [])
        .filter((category) => category.selected)
        .map((category) => category.name);

      const { data: categoryData, error: categoryError } = await supabase
        .from("budget_categories")
        .insert(
          addCategoriesArr.fields
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

      setBudgetTables((prevData) => [
        ...prevData,
        {
          id: budgetData.id,
          name: methods.getValues("name"),
          budget_categories: categoryData,
          amount: methods.getValues("amount"),
          remaining: methods.getValues("amount"),
          recurrence: methods.getValues("recurrence"),
          start_date: methods
            .getValues("start_date")
            .toISOString()
            .split("T")[0],
        },
      ]);
    } catch (error) {
      console.error("Error inserting budget and categories:", error);

      // Optionally, show user-friendly error toast?
    }
  };

  const editBudgetTable = async (id: number) => {
    try {
      const { data: budgetData, error: budgetError } = await supabase
        .from("budget")
        .update({
          name: methods.getValues("name"),
          amount: methods.getValues("amount"),
          recurrence: methods.getValues("recurrence"),
          start_date: methods
            .getValues("start_date")
            .toISOString()
            .split("T")[0],
        })
        .select()
        .eq("id", id);

      if (budgetError) {
        console.log("Error updating budget:", budgetError);
        throw budgetError;
      }

      const selectedCategories = (methods.getValues("editCategories") ?? [])
        .filter((category) => category.selected)
        .map((category) => category.name);

      const tableCategories = budgetTables
        .filter((table) => table.id === id)
        .flatMap((table) =>
          table.budget_categories.map((category) => category.name),
        );

      const newCategories = selectedCategories.filter(
        (category) => !tableCategories?.includes(category),
      );

      const { data: categoryData, error: categoryError } = await supabase
        .from("budget_categories")
        .insert(
          newCategories.map((category) => ({
            budget_id: id,
            name: category,
            amount: 0,
            spent: 0,
          })),
        )
        .select()
        .single();

      if (categoryError) {
        console.log("Error updating categories:", categoryError);
        throw categoryError;
      }

      setBudgetTables(
        budgetTables.map((table) =>
          table.id === id
            ? {
                ...table,
                name: methods.getValues("name"),
                amount: methods.getValues("amount"),
                remaining: methods.getValues("amount"),
                recurrence: methods.getValues("recurrence"),
                start_date: methods
                  .getValues("start_date")
                  .toISOString()
                  .split("T")[0],
                budget_categories: [
                  ...table.budget_categories,
                  {
                    id: categoryData.id,
                    budget_id: budgetData.id,
                    name: categoryData.name,
                    amount: categoryData.amount,
                    spent: categoryData.spent,
                  },
                ],
              }
            : table,
        ),
      );
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  const deleteBudgetTable = async (id: number) => {
    try {
      await supabase.from("budget").delete().eq("id", id);
      setBudgetTables((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  const onAddSubmit: SubmitHandler<BudgetFormProps> = async () => {
    await addBudgetTableWithCategories();
  };

  const onEditSubmit = useCallback(
    (budgetId: number): SubmitHandler<BudgetFormProps> => {
      return async () => {
        await editBudgetTable(budgetId);
      };
    },
    [],
  );

  const onNewCategorySubmit: SubmitHandler<
    Pick<Category, "name">
  > = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .insert({
          dashboard_id: dashboardId,
          name: methods.getValues("new_category"),
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

  // update fields array default values on each category change
  useEffect(() => {
    methods.reset({
      addCategories: categories,
      editCategories: categories,
    });
  }, [categories, methods.reset]);

  useEffect(() => {
    if (activeModal === "add") {
      methods.setFocus("name");

      return () => {
        methods.reset();
      };
    }
  }, [activeModal]);

  useEffect(() => {
    if (methods.formState.isSubmitSuccessful) {
      methods.reset();
      closeModal();
    }
  }, [methods.formState.isSubmitSuccessful, methods.reset]);

  return (
    <div
      data-testid="budget"
      className="rounded-md border border-accent/10 p-4 md:col-span-full md:col-start-1 md:row-start-3 xl:col-span-3 xl:row-start-2"
    >
      <div className="flex flex-col gap-4 rounded-md border border-accent/10 bg-surface p-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Budgets</h2>
          <ButtonSecondary
            aria-label="Add goal"
            onClick={() => openModal("add")}
          >
            <Icon SvgIcon={PlusIcon} isBorderless />
          </ButtonSecondary>
        </div>

        <div className="flex flex-col gap-4">
          {budgetTables.length > 0 ? (
            budgetTables.map((budget) => (
              <BudgetTable
                key={budget.id}
                table={budget}
                onEdit={() => openModal("edit")}
                onDelete={() => deleteBudgetTable(budget.id)}
              >
                {activeModal === "edit" && (
                  <Modal
                    id="editBudgetTableModal"
                    title="Edit this budget?"
                    isOpen={activeModal === "edit"}
                    handleClose={() => closeModal()}
                  >
                    <FormProvider {...methods}>
                      <BudgetTableForm
                        variant="edit"
                        table={budget}
                        tables={budgetTables}
                        onSubmit={onEditSubmit(budget.id)}
                      >
                        <Categories
                          handleNewCategoryModal={() =>
                            openModal("addNewCategory")
                          }
                          selectedCategories={[
                            ...budget.budget_categories.map(
                              (category) => category.name,
                            ),
                            ...(methods
                              .watch("editCategories")
                              ?.filter(
                                // filter out categories that are already in the budget
                                (category) =>
                                  category.selected &&
                                  !budget.budget_categories.some(
                                    (budget_category) =>
                                      budget_category.name === category.name,
                                  ),
                              )
                              .map((category) => category.name) ?? []),
                          ]}
                        >
                          {editCategoriesArr.fields.map((field, index) => {
                            const isChecked = budget.budget_categories.some(
                              (category) => category.name === field.name,
                            );

                            return (
                              <li key={field.id}>
                                <label
                                  htmlFor={field.id}
                                  className={`flex flex-row items-center justify-between rounded-sm px-2 py-1 text-sm hover:cursor-pointer hover:bg-accent/10 ${isChecked ? "pointer-events-none cursor-not-allowed opacity-50" : ""}`}
                                >
                                  {field.name}

                                  {isChecked ? (
                                    <input
                                      id={field.id}
                                      type="checkbox"
                                      className="rounded-md border border-accent/10 bg-transparent"
                                      defaultChecked={isChecked}
                                      onClick={(e) => {
                                        // disable clicking on checkbox
                                        e.preventDefault();
                                      }}
                                      {...methods.register(
                                        `editCategories.${index}.selected` as const,
                                      )}
                                    />
                                  ) : (
                                    <input
                                      id={field.id}
                                      type="checkbox"
                                      className="rounded-md border border-accent/10 bg-transparent"
                                      {...methods.register(
                                        `editCategories.${index}.selected` as const,
                                      )}
                                    />
                                  )}
                                </label>
                              </li>
                            );
                          })}
                        </Categories>
                      </BudgetTableForm>
                    </FormProvider>
                  </Modal>
                )}
              </BudgetTable>
            ))
          ) : (
            <p>No budgets found</p>
          )}
        </div>

        {activeModal === "add" && (
          <Modal
            id="addBudgetTableModal"
            title="Add a budget"
            isOpen={activeModal === "add"}
            handleClose={() => closeModal()}
          >
            <FormProvider {...methods}>
              <BudgetTableForm
                variant="add"
                tables={budgetTables}
                onSubmit={onAddSubmit}
              >
                <Categories
                  handleNewCategoryModal={() => openModal("addNewCategory")}
                  selectedCategories={(methods.watch("addCategories") ?? [])
                    .filter((category) => category.selected)
                    .map((category) => category.name)}
                >
                  {addCategoriesArr.fields.map((field, index) => (
                    <li key={field.id}>
                      <label
                        htmlFor={field.id}
                        className="flex flex-row items-center justify-between rounded-sm px-2 py-1 text-sm hover:cursor-pointer hover:bg-accent/10"
                      >
                        {field.name}
                        <input
                          id={field.id}
                          type="checkbox"
                          className="rounded-md border border-accent/10 bg-transparent"
                          {...methods.register(
                            `addCategories.${index}.selected` as const,
                          )}
                        />
                      </label>
                    </li>
                  ))}
                </Categories>
              </BudgetTableForm>
            </FormProvider>
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
              onSubmit={methods.handleSubmit(onNewCategorySubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-4">
                <label htmlFor="name" className="text-sm">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter category name"
                  className="w-full rounded-md border border-accent/10 bg-transparent p-2"
                  {...methods.register("new_category", {
                    required: {
                      value: true,
                      message: ERROR_MSG.FIELD_IS_REQUIRED,
                    },
                  })}
                />
                {methods.formState.errors.new_category && (
                  <p className="text-sm text-red-500">
                    {methods.formState.errors.new_category.message}
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
