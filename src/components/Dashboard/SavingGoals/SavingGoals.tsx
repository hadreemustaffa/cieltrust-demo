import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import supabase from "../../../utils/supabase";

import { ERROR_MSG } from "../../../data/errorMessages";

// icons import
import PlusIcon from "../../../images/icons/plus.svg?react";

// components import
import Icon from "../../Icon";
import { ButtonSecondary } from "../../Button";
import Modal from "../../Modal";
import SavingGoalItem from "./SavingGoalItem";

export interface SavingGoalFormProps {
  id: number;
  name: string;
  target_amount: number;
  saved_amount: number;
}

interface SavingGoalsProps {
  dashboardId: number;
}

function SavingGoals({ dashboardId }: SavingGoalsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savingGoalList, setSavingGoalList] = useState<SavingGoalFormProps[]>(
    [],
  );

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setFocus,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SavingGoalFormProps>();

  const insertSavingGoalList = async () => {
    const { data, error } = await supabase
      .from("saving_goals")
      .insert({
        dashboard_id: dashboardId,
        name: getValues("name"),
        target_amount: getValues("target_amount"),
        saved_amount: getValues("saved_amount"),
      })
      .eq("id", dashboardId)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      setSavingGoalList((prevData) => [...prevData, data[0]]);
    }

    setIsModalOpen(false);
  };

  const deleteSavingGoal = async (id: number) => {
    const updatedSavingGoalList = savingGoalList.filter(
      (savingGoal) => savingGoal.id !== id,
    );

    setSavingGoalList(updatedSavingGoalList);

    const response = await supabase.from("saving_goals").delete().eq("id", id);

    setIsModalOpen(false);
    return response;
  };

  const fetchSavingGoalList = async () => {
    const { data, error } = await supabase
      .from("saving_goals")
      .select()
      .eq("dashboard_id", dashboardId);

    if (error) {
      console.log(error);
    }

    if (data) {
      setSavingGoalList(data);
    }
  };

  const onEditSuccess = (updatedGoal: SavingGoalFormProps) => {
    setSavingGoalList((prevData) =>
      prevData.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)),
    );
  };

  const onSubmit: SubmitHandler<SavingGoalFormProps> = async () => {
    await insertSavingGoalList();
  };

  useEffect(() => {
    fetchSavingGoalList();
  }, []);

  // https://react-hook-form.com/docs/useform/reset
  useEffect(() => {
    const updateList = async () => {
      if (isSubmitSuccessful) {
        reset();
      }
    };

    updateList();
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (isModalOpen) {
      setFocus("name");
    } else {
      reset();
    }
  }, [isModalOpen]);

  return (
    <div className="rounded-md border border-accent/10 p-4 md:col-span-2">
      <div className="flex flex-col gap-4 rounded-md border border-accent/10 bg-surface p-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Saving Goals</h2>
          <ButtonSecondary onClick={() => setIsModalOpen(!isModalOpen)}>
            <Icon SvgIcon={PlusIcon} isBorderless />
            <span className="hidden pl-2 md:block">Add Goal</span>
          </ButtonSecondary>
        </div>

        {isModalOpen && (
          <Modal
            id="addSavingGoalModal"
            title="Add Saving Goal"
            isOpen={isModalOpen}
            isFormModal={true}
            formId="addSavingGoalForm"
            submitButtonText="Add"
            handleClose={() => setIsModalOpen(!isModalOpen)}
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
                  placeholder="Insert goal name"
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

              <div className="flex w-full flex-col gap-2">
                <label htmlFor="goalAmount" className="text-sm">
                  Target Amount
                </label>
                <input
                  id="goalAmount"
                  type="number"
                  min={0}
                  placeholder="Insert amount"
                  className="w-full rounded-md border border-accent/10 bg-transparent p-2"
                  autoComplete="off"
                  aria-invalid={errors.target_amount ? "true" : "false"}
                  {...register("target_amount", {
                    required: {
                      value: true,
                      message: ERROR_MSG.FIELD_IS_REQUIRED,
                    },
                    validate: (value) => {
                      if (value <= 0) {
                        return "Target amount cannot be zero";
                      }
                    },
                    valueAsNumber: true,
                  })}
                />
                {errors.target_amount && (
                  <p className="text-sm text-red-500">
                    {errors.target_amount.message}
                  </p>
                )}
              </div>

              <div className="flex w-full flex-col gap-2">
                <label htmlFor="goalSavedAmount" className="text-sm">
                  Saved Amount (optional)
                </label>
                <input
                  id="goalSavedAmount"
                  type="number"
                  min={0}
                  placeholder="Insert saved amount"
                  className="w-full rounded-md border border-accent/10 bg-transparent p-2"
                  defaultValue={0}
                  autoComplete="off"
                  aria-invalid={errors.saved_amount ? "true" : "false"}
                  {...register("saved_amount", {
                    valueAsNumber: true,
                  })}
                />
              </div>
            </form>
          </Modal>
        )}

        {savingGoalList && savingGoalList.length > 0 && (
          <ul className="flex flex-col gap-4">
            {savingGoalList.map((goal, idx) => (
              <SavingGoalItem
                key={idx}
                id={goal.id}
                name={goal.name}
                targetAmount={goal.target_amount}
                savedAmount={goal.saved_amount}
                onDelete={() => deleteSavingGoal(goal.id)}
                onEditSuccess={onEditSuccess}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SavingGoals;
