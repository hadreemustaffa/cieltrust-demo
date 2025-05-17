import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import XIcon from '@/images/icons/x.svg?react';

import supabase from '@/utils/supabase';

import { useModal } from '@/hooks/use-modal';

import { ButtonDelete, ButtonPrimary, ButtonSecondary } from '@/components/button';
import { Input } from '@/components/forms/custom-form';
import Icon from '@/components/icon';
import Modal from '@/components/modal';
import MoreMenu from '@/components/more-menu';
import { EditGoalFormProps, SavingGoalsItemProps } from '@/routes/dashboard/saving-goals/saving-goals.types';

import { ERROR_MSG } from '@/data/errorMessages';



export default function SavingGoalsItem({
  id,
  name,
  targetAmount,
  savedAmount,
  onDelete,
  onEditSuccess,
  ...props
}: SavingGoalsItemProps) {
  const { activeModal, openModal, closeModal } = useModal();

  const savedAmountPercentage = Math.round((savedAmount / targetAmount) * 100);
  const isComplete = savedAmount >= targetAmount;

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setFocus,
    formState: { errors, isSubmitSuccessful },
  } = useForm<EditGoalFormProps>();

  const editSavingGoal = async () => {
    const { data, error } = await supabase
      .from('saving_goals')
      .update({
        name: getValues('name'),
        target_amount: getValues('target_amount'),
        saved_amount: savedAmount + getValues('saved_amount'),
      })
      .eq('id', id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      onEditSuccess(data[0]);
    }

    closeModal();
  };

  const handleDelete = () => {
    onDelete();
    closeModal();
  };

  const onSubmit: SubmitHandler<EditGoalFormProps> = async () => {
    await editSavingGoal();
  };

  useEffect(() => {
    if (activeModal === `editGoalModal-${id}`) {
      setFocus('name');
    }
  }, [activeModal, id, setFocus]);

  // https://react-hook-form.com/docs/useform/reset
  useEffect(() => {
    const updateList = async () => {
      if (isSubmitSuccessful) {
        reset();
      }
    };

    updateList();
  }, [isSubmitSuccessful, reset]);

  return (
    <li
      {...props}
      className="relative flex flex-row items-center justify-between gap-2 rounded-md border border-accent/10 p-2"
    >
      <p className="flex flex-row items-center gap-2 pl-4 before:absolute before:left-2 before:top-1/2 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-md before:bg-brand before:content-['']">
        {name}
        <span className="text-xs text-copy/30">
          ({savedAmount !== null ? savedAmount : 0}/{targetAmount})
        </span>
      </p>
      <div className="flex flex-row items-center gap-4">
        <p className={`${isComplete && 'text-green-500'} font-semibold`}>{savedAmountPercentage}%</p>

        {isComplete ? (
          <button type="button" onClick={() => openModal(`deleteGoalModal-${id}`)}>
            <Icon SvgIcon={XIcon} width={16} height={16} isBorderless />
          </button>
        ) : (
          <MoreMenu
            variant="horizontal"
            onEdit={() => openModal(`editGoalModal-${id}`)}
            onDelete={() => openModal(`deleteGoalModal-${id}`)}
          />
        )}
      </div>

      <Modal
        id={`editGoalModal-${id}`}
        title="Edit this goal?"
        isOpen={activeModal === `editGoalModal-${id}`}
        handleClose={() => closeModal()}
      >
        <form id="editSavingGoalForm" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="goalName" className="text-sm">
              Name
            </label>
            <Input
              id="goalName"
              type="text"
              placeholder="Insert goal name"
              defaultValue={name}
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
            <Input
              id="goalAmount"
              type="number"
              min={0}
              placeholder="Insert amount"
              defaultValue={targetAmount}
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
            <Input
              id="goalSavedAmount"
              type="number"
              min={0}
              placeholder="Insert saved amount"
              defaultValue={savedAmount}
              autoComplete="off"
              aria-invalid={errors.saved_amount ? 'true' : 'false'}
              {...register('saved_amount', {
                valueAsNumber: true,
              })}
            />
          </div>

          <div className="flex flex-row items-center justify-end gap-2">
            <ButtonSecondary type="button" onClick={() => closeModal()}>
              Cancel
            </ButtonSecondary>

            <ButtonPrimary type="submit">Save</ButtonPrimary>
          </div>
        </form>
      </Modal>

      <Modal
        id={`deleteGoalModal-${id}`}
        title="Delete this goal?"
        isOpen={activeModal === `deleteGoalModal-${id}`}
        handleClose={() => closeModal()}
      >
        <div className="flex flex-col gap-2">
          <p>Are you sure you want to delete this goal?</p>
          <p className="font-semibold">{name}</p>
        </div>

        <div className="flex flex-row items-center justify-end gap-2">
          <ButtonSecondary type="button" onClick={() => closeModal()}>
            Cancel
          </ButtonSecondary>

          <ButtonDelete onClick={() => handleDelete()}>Delete</ButtonDelete>
        </div>
      </Modal>
    </li>
  );
}
