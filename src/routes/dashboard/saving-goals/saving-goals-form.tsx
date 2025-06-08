import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MoonLoader } from 'react-spinners';

import { useAppSelector } from '@/hooks/use-redux';

import { ButtonPrimary, ButtonSecondary } from '@/components/button';
import { Input } from '@/components/custom-form';
import ErrorMessage from '@/components/error-message';
import { useAddSavingGoalMutation, useEditSavingGoalMutation } from '@/routes/dashboard/api.slice';
import { getDashboardId } from '@/routes/dashboard/dashboard.slice';
import {
  AddSavingGoalsFormData,
  AddSavingGoalsFormProps,
  EditSavingGoalsFormData,
  EditSavingGoalsFormProps,
} from '@/routes/dashboard/saving-goals/saving-goals.types';

import { ERROR_MSG } from '@/data/errorMessages';

export const AddSavingGoalsForm = ({ handleModalClose }: AddSavingGoalsFormProps) => {
  const dashboardId = useAppSelector(getDashboardId);
  const [addSavingGoal, { isLoading, isSuccess }] = useAddSavingGoalMutation();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<AddSavingGoalsFormData>();

  const onSubmit: SubmitHandler<AddSavingGoalsFormData> = async (data) => {
    try {
      await addSavingGoal({
        dashboard_id: dashboardId,
        name: data.name,
        target_amount: data.target_amount,
        saved_amount: data.saved_amount,
      }).unwrap();
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      handleModalClose();
    }
  }, [isSuccess, handleModalClose, reset]);

  return (
    <form id="addSavingGoalForm" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="goalName" className="text-sm">
          Name
        </label>
        <Input
          id="goalName"
          type="text"
          placeholder="Insert goal name"
          autoComplete="off"
          aria-invalid={errors.name ? 'true' : 'false'}
          {...register('name', {
            required: {
              value: true,
              message: ERROR_MSG.FIELD_IS_REQUIRED,
            },
          })}
        />
        {errors.name && <ErrorMessage error={errors.name.message} />}
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
        {errors.target_amount && <ErrorMessage error={errors.target_amount.message} />}
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
          autoComplete="off"
          aria-invalid={errors.saved_amount ? 'true' : 'false'}
          {...register('saved_amount', {
            valueAsNumber: true,
          })}
        />
      </div>

      <div className="flex flex-row items-center justify-end gap-2">
        <ButtonSecondary type="button" onClick={handleModalClose}>
          Cancel
        </ButtonSecondary>

        <div className="flex flex-row items-center justify-end gap-2 disabled:opacity-50">
          <ButtonPrimary type="submit" className={isLoading ? 'opacity-50' : ''} disabled={isLoading}>
            <MoonLoader loading={isLoading} size={16} color="#fff" />
            <span>{`${isLoading ? 'Adding' : 'Add'}`} Goal</span>
          </ButtonPrimary>
        </div>
      </div>
    </form>
  );
};

export const EditSavingGoalsForm = ({ goal, handleModalClose }: EditSavingGoalsFormProps) => {
  const dashboardId = useAppSelector(getDashboardId);
  const [editSavingGoal, { isLoading, isSuccess }] = useEditSavingGoalMutation();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<EditSavingGoalsFormData>({
    defaultValues: {
      name: goal.name,
      target_amount: goal.target_amount,
      saved_amount: goal.saved_amount,
    },
  });

  const onSubmit: SubmitHandler<EditSavingGoalsFormData> = async (data) => {
    if (
      goal.name === data.name &&
      goal.target_amount === data.target_amount &&
      goal.saved_amount === data.saved_amount
    ) {
      handleModalClose();
      return;
    }

    try {
      await editSavingGoal({
        dashboard_id: dashboardId,
        id: goal.id,
        name: data.name,
        target_amount: data.target_amount,
        saved_amount: data.saved_amount,
      }).unwrap();
    } catch (error) {
      console.error('Error editing goal:', error);
    }
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      handleModalClose();
    }
  }, [isSuccess, handleModalClose, reset]);

  return (
    <form id="editSavingGoalForm" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="goalName" className="text-sm">
          Name
        </label>
        <Input
          id="goalName"
          type="text"
          placeholder="Insert goal name"
          autoComplete="off"
          aria-invalid={errors.name ? 'true' : 'false'}
          {...register('name', {
            required: {
              value: true,
              message: ERROR_MSG.FIELD_IS_REQUIRED,
            },
          })}
        />
        {errors.name && <ErrorMessage error={errors.name.message} />}
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
        {errors.target_amount && <ErrorMessage error={errors.target_amount.message} />}
      </div>

      <div className="flex w-full flex-col gap-2">
        <label htmlFor="goalSavedAmount" className="text-sm">
          Saved Amount
        </label>
        <Input
          id="goalSavedAmount"
          type="number"
          min={0}
          placeholder="Insert saved amount"
          autoComplete="off"
          aria-invalid={errors.saved_amount ? 'true' : 'false'}
          {...register('saved_amount', {
            valueAsNumber: true,
          })}
        />
      </div>

      <div className="flex flex-row items-center justify-end gap-2">
        <ButtonSecondary type="button" onClick={handleModalClose}>
          Cancel
        </ButtonSecondary>

        <div className="flex flex-row items-center justify-end gap-2 disabled:opacity-50">
          <ButtonPrimary type="submit" className={isLoading ? 'opacity-50' : ''} disabled={isLoading}>
            <MoonLoader loading={isLoading} size={16} color="#fff" />
            <span>{`${isLoading ? 'Saving' : 'Save'}`} Goal</span>
          </ButtonPrimary>
        </div>
      </div>
    </form>
  );
};
