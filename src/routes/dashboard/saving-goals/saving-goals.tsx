import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ButtonPrimary, ButtonSecondary } from '@/components/button';
import Icon from '@/components/icon';
import Modal from '@/components/modal';
import { ERROR_MSG } from '@/data/errorMessages';
import { useDashboard } from '@/hooks/use-dashboard';
import { useModal } from '@/hooks/use-modal';
import PlusIcon from '@/images/icons/plus.svg?react';
import SavingGoalsItem from '@/routes/dashboard/saving-goals/saving-goals-item';
import { SavingGoalsFormProps, SavingGoalsProps } from '@/routes/dashboard/saving-goals/saving-goals.types';
import supabase from '@/utils/supabase';

export default function SavingGoals(data: SavingGoalsProps) {
  const [savingGoalList, setSavingGoalList] = useState<SavingGoalsProps>(data);

  const { dashboardId } = useDashboard();

  const { activeModal, openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setFocus,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SavingGoalsFormProps>();

  const insertSavingGoalList = async () => {
    const { data: goalData, error } = await supabase
      .from('saving_goals')
      .insert({
        dashboard_id: dashboardId,
        name: getValues('name'),
        target_amount: getValues('target_amount'),
        saved_amount: getValues('saved_amount'),
      })
      .select()
      .single();

    if (error) {
      console.log(error);
    }

    if (goalData) {
      setSavingGoalList((prevData) => ({ data: [...prevData.data, goalData] }));
    }

    closeModal();
  };

  const deleteSavingGoal = async (id: number) => {
    const updatedSavingGoalList = savingGoalList.data.filter((savingGoal) => savingGoal.id !== id);

    setSavingGoalList({ data: updatedSavingGoalList });

    const response = await supabase.from('saving_goals').delete().eq('id', id);

    closeModal();

    return response;
  };

  const onEditSuccess = (updatedGoal: SavingGoalsFormProps) => {
    setSavingGoalList((prevGoals) => ({
      ...prevGoals,
      data: prevGoals.data.map((goal) => (goal.id === updatedGoal.id ? { ...goal, ...updatedGoal } : goal)),
    }));
  };

  const onSubmit: SubmitHandler<SavingGoalsFormProps> = async () => {
    await insertSavingGoalList();
  };

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
    if (activeModal === 'addSavingGoalModal') {
      setFocus('name');
      return () => {
        reset();
      };
    }
  }, [activeModal, setFocus, reset]);

  return (
    <div className="col-span-1 row-start-2 rounded-md border border-accent/10 p-4 md:col-span-2 md:row-start-1">
      <div className="flex flex-col gap-4 rounded-md border border-accent/10 bg-surface p-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Saving Goals</h2>
          <button
            type="button"
            aria-label="add saving goal"
            onClick={() => openModal(`addSavingGoalModal`)}
            className="flex gap-1 rounded-md border border-accent/10 px-2 py-1 hover:border-accent/50"
          >
            <Icon SvgIcon={PlusIcon} width={24} height={24} isBorderless />
          </button>
        </div>

        {activeModal === 'addSavingGoalModal' && (
          <Modal
            id="addSavingGoalModal"
            title="Add Saving Goal"
            isOpen={activeModal === 'addSavingGoalModal'}
            handleClose={() => closeModal()}
          >
            <form id="addSavingGoalForm" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="goalName" className="text-sm">
                  Name
                </label>
                <input
                  id="goalName"
                  type="text"
                  placeholder="Insert goal name"
                  className="w-full rounded-md border border-accent/10 bg-transparent p-2"
                  defaultValue={''}
                  autoComplete="off"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  {...register('name', {
                    required: {
                      value: true,
                      message: ERROR_MSG.FIELD_IS_REQUIRED,
                    },
                  })}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
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
                  aria-invalid={errors.target_amount ? 'true' : 'false'}
                  {...register('target_amount', {
                    required: {
                      value: true,
                      message: ERROR_MSG.FIELD_IS_REQUIRED,
                    },
                    validate: (value) => {
                      if (value <= 0) {
                        return 'Target amount cannot be zero';
                      }
                    },
                    valueAsNumber: true,
                  })}
                />
                {errors.target_amount && <p className="text-sm text-red-500">{errors.target_amount.message}</p>}
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
                  aria-invalid={errors.saved_amount ? 'true' : 'false'}
                  {...register('saved_amount', {
                    valueAsNumber: true,
                  })}
                />
              </div>
            </form>

            <div className="flex flex-row items-center justify-end gap-2">
              <ButtonSecondary type="button" onClick={() => closeModal()}>
                Cancel
              </ButtonSecondary>

              <ButtonPrimary type="submit" form="addSavingGoalForm">
                Add
              </ButtonPrimary>
            </div>
          </Modal>
        )}

        {savingGoalList && savingGoalList.data.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {savingGoalList.data.map((goal, idx) => (
              <SavingGoalsItem
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
        ) : (
          <p className="text-sm">You don&apos;t have any saving goals yet.</p>
        )}
      </div>
    </div>
  );
}
