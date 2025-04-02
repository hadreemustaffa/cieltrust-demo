import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ButtonDelete, ButtonPrimary, ButtonSecondary } from '@/components/button';
import Icon from '@/components/icon';
import Modal from '@/components/modal';
import MoreMenu from '@/components/more-menu';
import { ERROR_MSG } from '@/data/errorMessages';
import { useModal } from '@/hooks/use-modal';
import XIcon from '@/images/icons/x.svg?react';
import { EditGoalFormProps, SavingGoalsItemProps } from '@/routes/dashboard/saving-goals/saving-goals.types';
import supabase from '@/utils/supabase';

export default function SavingGoalsItem({
  id,
  name,
  targetAmount,
  savedAmount,
  onDelete,
  onEditSuccess,
  ...props
}: SavingGoalsItemProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const { activeModal, openModal, closeModal } = useModal();

  const savedAmountPercentage = Math.round((savedAmount / targetAmount) * 100);

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

  const handleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDelete = () => {
    onDelete();

    setIsDeleteModalOpen(false);
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

  useEffect(() => {
    if (savedAmount >= targetAmount) {
      setIsComplete(true);
    }
  }, [savedAmount, targetAmount]);

  return (
    <li {...props} className="relative flex flex-row items-center justify-between gap-2">
      <p className="pl-4 before:absolute before:left-0 before:top-1/2 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-md before:bg-brand before:content-['']">
        {name}
      </p>
      <div className="flex flex-row items-center gap-4">
        <p className={`${isComplete && 'text-green-500'} font-semibold`}>{savedAmountPercentage}%</p>

        {isComplete ? (
          <button type="button" onClick={handleDeleteModal}>
            <Icon SvgIcon={XIcon} width={16} height={16} isBorderless />
          </button>
        ) : (
          <MoreMenu
            isEditable
            onEdit={() => openModal(`editGoalModal-${id}`)}
            isDeletable
            onDelete={handleDeleteModal}
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
            <input
              id="goalName"
              type="text"
              placeholder="Insert goal name"
              className="w-full rounded-md border border-accent/10 bg-transparent p-2"
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
            <input
              id="goalAmount"
              type="number"
              min={0}
              placeholder="Insert amount"
              className="w-full rounded-md border border-accent/10 bg-transparent p-2"
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
            <input
              id="goalSavedAmount"
              type="number"
              min={0}
              placeholder="Insert saved amount"
              className="w-full rounded-md border border-accent/10 bg-transparent p-2"
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
        id={`goal-delete-modal-${id}`}
        title="Delete this goal?"
        isOpen={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
      >
        <p>Are you sure you want to delete this goal?</p>

        <div className="flex flex-row items-center justify-end gap-2">
          <ButtonSecondary type="button" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </ButtonSecondary>

          <ButtonDelete onClick={() => handleDelete()}>Delete</ButtonDelete>
        </div>
      </Modal>
    </li>
  );
}
