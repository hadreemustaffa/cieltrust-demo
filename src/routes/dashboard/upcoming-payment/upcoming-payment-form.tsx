import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MoonLoader } from 'react-spinners';

import ChevronDownIcon from '@/images/icons/chevron-down.svg?react';

import { useAppSelector } from '@/hooks/use-redux';

import { ButtonPrimary } from '@/components/button';
import { Input, Select } from '@/components/custom-form';
import ErrorMessage from '@/components/error-message';
import Icon from '@/components/icon';
import {
  useAddUpcomingPaymentMutation,
  useEditUpcomingPaymentMutation,
  useGetAllUpcomingPaymentsQuery,
} from '@/routes/dashboard/api.slice';
import { getDashboardId } from '@/routes/dashboard/dashboard.slice';
import {
  AddUpcomingPaymentFormData,
  AddUpcomingPaymentFormProps,
  EditUpcomingPaymentFormData,
  EditUpcomingPaymentFormProps,
} from '@/routes/dashboard/upcoming-payment/upcoming-payment.types';

import { ERROR_MSG } from '@/data/errorMessages';

export const AddUpcomingPaymentForm = ({ handleModalClose }: AddUpcomingPaymentFormProps) => {
  const dashboardId = useAppSelector(getDashboardId);
  const { data: upcomingPayments = [] } = useGetAllUpcomingPaymentsQuery(dashboardId);
  const [addUpcomingPayment, { isLoading, isSuccess }] = useAddUpcomingPaymentMutation();

  const {
    register,
    reset,
    setFocus,
    formState: { errors },
    handleSubmit,
  } = useForm<AddUpcomingPaymentFormData>();

  const onSubmit: SubmitHandler<AddUpcomingPaymentFormData> = async (data) => {
    try {
      await addUpcomingPayment({
        dashboard_id: dashboardId,
        name: data.name,
        amount: data.amount,
        recurrence: data.recurrence,
        date: data.date,
      }).unwrap();
    } catch (error) {
      console.error('Error adding payment:', error);
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="upcomingPaymentName" className="text-sm">
          Name
        </label>

        <Input
          id="upcomingPaymentName"
          type="text"
          placeholder="Enter payment name"
          defaultValue={''}
          autoComplete="off"
          aria-invalid={errors.name ? 'true' : 'false'}
          {...register('name', {
            required: {
              value: true,
              message: ERROR_MSG.FIELD_IS_REQUIRED,
            },
            validate: (value) => {
              return upcomingPayments.find((table) => table.name === value) && 'Payment already exists';
            },
          })}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="startDate" className="text-sm">
          Start Date
        </label>
        <Input
          id="startDate"
          type="date"
          className="w-full rounded-md border border-accent/10 bg-transparent p-2"
          defaultValue={''}
          {...register('date', {
            required: {
              value: true,
              message: ERROR_MSG.FIELD_IS_REQUIRED,
            },
            valueAsDate: true,
          })}
        />
        {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="upcomingPaymentAmount" className="text-sm">
            Amount
          </label>

          <Input
            id="upcomingPaymentAmount"
            type="number"
            min={0}
            className="w-full rounded-md border border-accent/10 bg-transparent p-2"
            placeholder="$ 0"
            {...register('amount', {
              required: {
                value: true,
                message: ERROR_MSG.FIELD_IS_REQUIRED,
              },
            })}
          />

          {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="upcomingPaymentRecurrence" className="text-sm">
            Recurrence
          </label>

          <div className="relative">
            <Select
              id="upcomingPaymentRecurrence"
              {...register('recurrence')}
              defaultValue={'Monthly'}
              options={[
                { label: 'Monthly', value: 'Monthly' },
                { label: 'Weekly', value: 'Weekly' },
              ]}
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2">
              <Icon SvgIcon={ChevronDownIcon} isBorderless />
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-end gap-2 disabled:opacity-50">
        <ButtonPrimary type="submit" className={isLoading ? 'opacity-50' : ''} disabled={isLoading}>
          <MoonLoader loading={isLoading} size={16} color="#fff" />
          <span className="ml-2">Add Upcoming Payment</span>
        </ButtonPrimary>
      </div>
    </form>
  );
};

export const EditUpcomingPaymentForm = ({ payment, handleModalClose }: EditUpcomingPaymentFormProps) => {
  const dashboardId = useAppSelector(getDashboardId);

  const { data: upcomingPayments = [] } = useGetAllUpcomingPaymentsQuery(dashboardId);
  const [editUpcomingPayment, { isLoading, isSuccess }] = useEditUpcomingPaymentMutation();

  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<EditUpcomingPaymentFormData>({
    defaultValues: {
      name: payment.name,
      amount: payment.amount,
      recurrence: payment.recurrence,
      date: payment.date,
    },
  });

  const onSubmit: SubmitHandler<EditUpcomingPaymentFormData> = async (data) => {
    if (
      data.name === payment.name &&
      data.amount === payment.amount &&
      data.recurrence === payment.recurrence &&
      data.date === payment.date
    ) {
      handleModalClose();
      return;
    }

    try {
      await editUpcomingPayment({
        dashboard_id: dashboardId,
        id: payment.id,
        name: data.name,
        amount: data.amount,
        recurrence: data.recurrence,
        date: data.date,
      }).unwrap();
    } catch (error) {
      console.error('Error updating payment:', error);
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="upcomingPaymentName" className="text-sm">
          Name
        </label>

        <Input
          id="upcomingPaymentName"
          type="text"
          placeholder="Enter budget name"
          autoComplete="off"
          aria-invalid={errors.name ? 'true' : 'false'}
          {...register('name', {
            required: {
              value: true,
              message: ERROR_MSG.FIELD_IS_REQUIRED,
            },
            validate: (value) => {
              if (payment.name === value) {
                return true;
              } else {
                return (
                  upcomingPayments.find((upcomingPayment) => upcomingPayment !== payment && payment.name === value) &&
                  'Payment already exists'
                );
              }
            },
          })}
        />
        {errors.name && <ErrorMessage error={errors.name.message} />}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="startDate" className="text-sm">
          Start Date
        </label>
        <Input
          id="startDate"
          type="date"
          className="w-full rounded-md border border-accent/10 bg-transparent p-2"
          aria-invalid={errors.date ? 'true' : 'false'}
          {...register('date', {
            required: {
              value: true,
              message: ERROR_MSG.FIELD_IS_REQUIRED,
            },
          })}
        />
        {errors.date && <ErrorMessage error={errors.date.message} />}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="upcomingPaymentAmount" className="text-sm">
            Amount
          </label>

          <Input
            id="upcomingPaymentAmount"
            type="number"
            min={0}
            className="w-full rounded-md border border-accent/10 bg-transparent p-2"
            placeholder="$ 0"
            aria-invalid={errors.amount ? 'true' : 'false'}
            {...register('amount', {
              required: {
                value: true,
                message: ERROR_MSG.FIELD_IS_REQUIRED,
              },
            })}
          />

          {errors.amount && <ErrorMessage error={errors.amount.message} />}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="upcomingPaymentRecurrence" className="text-sm">
            Recurrence
          </label>

          <div className="relative">
            <Select
              id="upcomingPaymentRecurrence"
              {...register('recurrence')}
              options={[
                { label: 'Monthly', value: 'Monthly' },
                { label: 'Weekly', value: 'Weekly' },
              ]}
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2">
              <Icon SvgIcon={ChevronDownIcon} isBorderless />
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-end gap-2 disabled:opacity-50">
        <ButtonPrimary type="submit" className={isLoading ? 'opacity-50' : ''} disabled={isLoading}>
          <MoonLoader loading={isLoading} size={16} color="#fff" />
          <span className="ml-2">Save Payment Details</span>
        </ButtonPrimary>
      </div>
    </form>
  );
};
