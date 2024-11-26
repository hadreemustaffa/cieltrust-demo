import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import supabase from "../../../utils/supabase";

// icons import
import PlusIcon from "../../../images/icons/plus.svg?react";
import XIcon from "../../../images/icons/x.svg?react";

// components import
import Icon from "../../Icon";
import { ButtonSecondary } from "../../Button";
import { ERROR_MSG } from "../../../data/errorMessages";
import Modal from "../../Modal";

type SavingGoal = {
  name: string;
  amount: number;
};

function SavingGoals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [savingGoalList, setSavingGoalList] = useState<SavingGoal[]>([]);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SavingGoal>();

  const onSubmit: SubmitHandler<SavingGoal> = async () => {
    if (savingGoalList.length >= 5) {
      setError(true);
      return;
    }

    setSavingGoalList((prevSavingGoalList) => [
      ...prevSavingGoalList,
      { name: getValues("name"), amount: getValues("amount") },
    ]);
    setIsModalOpen(!isModalOpen);
  };

  const updateSavingGoalList = async () => {
    const { data: dashboard, error: dashboardError } = await supabase
      .from("dashboard")
      .select("id")
      .single();

    if (dashboardError) {
      console.log(dashboardError);
    }

    const dashboardId = dashboard.id;

    const { error: savingGoalError } = await supabase
      .from("dashboard")
      .update({ saving_goals: savingGoalList })
      .eq("id", dashboardId);

    if (savingGoalError) {
      console.log(savingGoalError);
    }
  };

  const deleteSavingGoal = useCallback((name: string) => {
    setSavingGoalList((prevSavingGoalList) =>
      prevSavingGoalList.filter(
        (savingGoal) => savingGoal.name.toLowerCase() !== name.toLowerCase(),
      ),
    );
  }, []);

  useEffect(() => {
    const fetchSavingGoalList = async () => {
      const { data, error } = await supabase
        .from("dashboard")
        .select("saving_goals")
        .single();

      if (error) {
        console.log(error);
      }

      if (data) {
        setSavingGoalList(data.saving_goals);
      }
    };

    fetchSavingGoalList();
  }, []);

  // sync database with local state
  useEffect(() => {
    updateSavingGoalList();
  }, [savingGoalList]);

  // https://react-hook-form.com/docs/useform/reset
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (isModalOpen) {
      document.getElementById("goalName")?.focus();
      document.body.style.overflow = "hidden";
      setError(false);
    } else {
      document.body.removeAttribute("style");
      reset();
    }
  }, [isModalOpen]);

  return (
    <div className="rounded-md border border-accent/10 p-4">
      <div className="flex flex-col gap-4 rounded-md border border-accent/10 bg-surface p-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Saving Goals</h2>
          <ButtonSecondary onClick={() => setIsModalOpen(!isModalOpen)}>
            <Icon SvgIcon={PlusIcon} isBorderless />
          </ButtonSecondary>
        </div>

        {isModalOpen && (
          <Modal
            title="Add Saving Goal"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-4">
                <label htmlFor="goalName" className="sr-only">
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

              <div className="flex flex-col gap-4">
                <label htmlFor="goalAmount" className="sr-only">
                  Amount
                </label>
                <input
                  id="goalAmount"
                  type="number"
                  placeholder="Insert amount"
                  className="w-full rounded-md border border-accent/10 bg-transparent p-2"
                  defaultValue={""}
                  autoComplete="off"
                  aria-invalid={errors.amount ? "true" : "false"}
                  {...register("amount", {
                    required: {
                      value: true,
                      message: ERROR_MSG.FIELD_IS_REQUIRED,
                    },
                  })}
                />
                {errors.amount && (
                  <p className="text-sm text-red-500">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              {error && (
                <p className="text-sm text-red-500">
                  You can only add up to 5 goals
                </p>
              )}

              <div className="flex flex-row items-center justify-end gap-2">
                <button
                  type="button"
                  className="w-fit rounded-md border border-accent/10 p-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-fit rounded-md bg-brand px-4 py-2 text-white"
                >
                  Add Goal
                </button>
              </div>
            </form>
          </Modal>
        )}

        {savingGoalList && savingGoalList.length > 0 && (
          <ul className="flex flex-col gap-4">
            {savingGoalList.map((goal, idx) => (
              <li
                key={idx}
                className="relative flex flex-row justify-between gap-2"
              >
                <p className="pl-4 before:absolute before:left-0 before:top-1/2 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-md before:bg-brand before:content-['']">
                  {goal.name}
                </p>
                <div className="flex flex-row items-center gap-2">
                  <p>{goal.amount}</p>
                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    <Icon SvgIcon={XIcon} width={16} height={16} isBorderless />
                  </button>
                </div>

                <Modal
                  title="Delete this goal?"
                  isOpen={isDeleteModalOpen}
                  onClose={() => setIsDeleteModalOpen(false)}
                >
                  <div className="flex flex-col gap-4">
                    <p>Are you sure you want to delete this goal?</p>
                    <div className="flex flex-row items-center justify-end gap-2">
                      <button
                        type="button"
                        className="w-fit rounded-md border border-accent/10 p-2"
                        onClick={() => setIsDeleteModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="w-fit rounded-md bg-red-700 px-4 py-2 text-white hover:bg-red-500"
                        onClick={() => deleteSavingGoal(goal.name)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </Modal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SavingGoals;
