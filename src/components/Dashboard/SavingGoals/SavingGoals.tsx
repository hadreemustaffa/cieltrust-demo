import { useEffect, useState } from "react";
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

interface SavingGoalItemProps {
  name: string;
  targetAmount: number;
  savedAmount: number;
  modalId: string;
  onDelete: () => void;
}

interface SavingGoalProps {
  id: number;
  name: string;
  target_amount: number;
  saved_amount: number;
}

function SavingGoals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savingGoalList, setSavingGoalList] = useState<SavingGoalProps[]>([]);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SavingGoalProps>();

  const onSubmit: SubmitHandler<SavingGoalProps> = async () => {};

  const updateSavingGoalList = async () => {
    const { data: dashboard, error: dashboardError } = await supabase
      .from("dashboard")
      .select("id")
      .single();

    if (dashboardError) {
      console.log(dashboardError);
    }

    const dashboardId = dashboard.id;

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

    const response = await supabase.from("saving_goals").delete().eq("id", id);

    setSavingGoalList(updatedSavingGoalList);

    setIsModalOpen(false);
    return response;
  };

  const fetchSavingGoalList = async () => {
    const { data: dashboard, error: dashboardError } = await supabase
      .from("dashboard")
      .select("id")
      .single();

    if (dashboardError) {
      console.log(dashboardError);
    }

    const dashboardId = dashboard.id;

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

  useEffect(() => {
    fetchSavingGoalList();
  }, []);

  // https://react-hook-form.com/docs/useform/reset
  useEffect(() => {
    const updateList = async () => {
      if (isSubmitSuccessful) {
        await updateSavingGoalList();
        reset();
      }
    };

    updateList();
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (isModalOpen) {
      document.getElementById("goalName")?.focus();
      setError(false);
    } else {
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

              {error && (
                <p className="text-sm text-red-500">
                  You can only add up to 5 goals
                </p>
              )}
            </form>
          </Modal>
        )}

        {savingGoalList && savingGoalList.length > 0 && (
          <ul className="flex flex-col gap-4">
            {savingGoalList.map((goal, idx) => (
              <SavingGoalItem
                key={idx}
                modalId={`saving-goal-item-modal-${idx}`}
                name={goal.name}
                targetAmount={goal.target_amount}
                savedAmount={goal.saved_amount}
                onDelete={() => deleteSavingGoal(goal.id)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const SavingGoalItem = ({
  name,
  targetAmount,
  savedAmount,
  modalId,
  onDelete,
  ...props
}: SavingGoalItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    onDelete();

    setIsOpen(false);
  };

  return (
    <li
      {...props}
      className="relative flex flex-row items-center justify-between gap-2"
    >
      <p className="pl-4 before:absolute before:left-0 before:top-1/2 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-md before:bg-brand before:content-['']">
        {name}
      </p>
      <div className="flex flex-row items-center gap-4">
        <p className="font-semibold">
          {Math.round((savedAmount / targetAmount) * 100)}%
        </p>
        <button type="button" onClick={() => setIsOpen(true)}>
          <Icon SvgIcon={XIcon} width={16} height={16} />
        </button>
      </div>

      <Modal
        id={modalId}
        title="Delete this goal?"
        isOpen={isOpen}
        handleClick={handleDelete}
        handleClose={() => setIsOpen(false)}
        buttonText="Delete"
      >
        <p>Are you sure you want to delete this goal?</p>
      </Modal>
    </li>
  );
};

export default SavingGoals;
