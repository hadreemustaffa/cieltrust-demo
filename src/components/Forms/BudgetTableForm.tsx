import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { ERROR_MSG } from "../../data/errorMessages";

// icons import
import ChevronDownIcon from "../../images/icons/chevron-down.svg?react";

// components import
import { Input, Select } from "./CustomForm";
import { ButtonPrimary } from "../Button";
import { BudgetFormProps } from "../Dashboard/Budget/Budget";
import Icon from "../Icon";
import { Table } from "../Dashboard/Budget/BudgetTable";

type BudgetTableFormProps =
  | {
      variant: "add";
      table?: never;
      tables: Table[];
      onSubmit: (data: any) => void;
      children: React.ReactNode;
    }
  | {
      variant: "edit";
      table: Table;
      tables: Table[];
      onSubmit: (data: any) => void;
      children: React.ReactNode;
    };

export default function BudgetTableForm({
  table,
  tables,
  onSubmit,
  children,
  variant,
}: BudgetTableFormProps) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setFocus,
  } = useFormContext<BudgetFormProps>();

  useEffect(() => {
    if (variant === "edit") {
      setFocus("name");
      return () => {
        reset();
      };
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="goalName" className="text-sm">
          Name
        </label>

        <Input
          id="goalName"
          type="text"
          placeholder="Enter budget name"
          defaultValue={variant === "edit" ? table.name : ""}
          autoComplete="off"
          aria-invalid={errors.name ? "true" : "false"}
          {...register("name", {
            required: {
              value: true,
              message: ERROR_MSG.FIELD_IS_REQUIRED,
            },
            validate: (value) => {
              if (variant === "edit") {
                if (table.name === value) {
                  return true;
                }
              }
              return (
                tables.find((table) => table.name === value) &&
                "Table already exists"
              );
            },
          })}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {children}

      <div className="flex flex-col gap-2">
        <label htmlFor="startDate" className="text-sm">
          Start Date
        </label>
        <Input
          id="startDate"
          type="date"
          className="w-full rounded-md border border-accent/10 bg-transparent p-2"
          defaultValue={
            variant === "edit"
              ? new Date(table.start_date).toISOString().split("T")[0]
              : ""
          }
          {...register("start_date", {
            required: {
              value: true,
              message: ERROR_MSG.FIELD_IS_REQUIRED,
            },
            valueAsDate: true,
          })}
        />
        {errors.start_date && (
          <p className="text-sm text-red-500">{errors.start_date.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="budgetAmount" className="text-sm">
            Amount
          </label>

          <Input
            id="budgetAmount"
            type="number"
            min={0}
            className="w-full rounded-md border border-accent/10 bg-transparent p-2"
            placeholder="$ 0"
            defaultValue={variant === "edit" ? table.amount : ""}
            {...register("amount", {
              required: {
                value: true,
                message: ERROR_MSG.FIELD_IS_REQUIRED,
              },
            })}
          />

          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="budgetRecurrence" className="text-sm">
            Recurrence
          </label>

          <div className="relative">
            <Select
              id="budgetRecurrence"
              {...register("recurrence")}
              defaultValue={variant === "edit" ? table.recurrence : "Monthly"}
              options={[
                { label: "Monthly", value: "Monthly" },
                { label: "Weekly", value: "Weekly" },
              ]}
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2">
              <Icon SvgIcon={ChevronDownIcon} isBorderless />
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-end gap-2 disabled:opacity-50">
        <ButtonPrimary type="submit" disabled={isSubmitting}>
          {variant === "edit" ? "Save budget table" : "Create budget table"}
        </ButtonPrimary>
      </div>
    </form>
  );
}
