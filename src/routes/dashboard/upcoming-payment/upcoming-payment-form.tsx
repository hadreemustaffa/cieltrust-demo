import { useFormContext } from 'react-hook-form';

import ChevronDownIcon from '@/images/icons/chevron-down.svg?react';

import { ButtonPrimary } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import { Input, Select } from '@/components/forms/custom-form';
import Icon from '@/components/icon';
import {
  AddUpcomingPaymentFormData,
  AddUpcomingPaymentFormProps,
  EditUpcomingPaymentFormData,
  EditUpcomingPaymentFormProps,
} from '@/routes/dashboard/upcoming-payment/upcoming-payment.types';

import { ERROR_MSG } from '@/data/errorMessages';

export default function AddUpcomingPaymentForm({ upcomingPayments, onSubmit }: AddUpcomingPaymentFormProps) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useFormContext<AddUpcomingPaymentFormData>();

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
            defaultValue={''}
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
        <ButtonPrimary type="submit" disabled={isSubmitting}>
          Add upcoming payment
        </ButtonPrimary>
      </div>
    </form>
  );
}

export const EditUpcomingPaymentForm = ({
  upcomingPayment,
  upcomingPayments,
  onSubmit,
}: EditUpcomingPaymentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<EditUpcomingPaymentFormData>();

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
          defaultValue={upcomingPayment.name}
          aria-invalid={errors.name ? 'true' : 'false'}
          {...register('name', {
            required: {
              value: true,
              message: ERROR_MSG.FIELD_IS_REQUIRED,
            },
            validate: (value) => {
              if (upcomingPayment.name === value) {
                return true;
              } else {
                return (
                  upcomingPayments.find((payment) => payment !== upcomingPayment && payment.name === value) &&
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
          defaultValue={upcomingPayment.date ?? ''}
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
            defaultValue={upcomingPayment.amount ?? ''}
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
              defaultValue={upcomingPayment.recurrence}
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
        <ButtonPrimary type="submit" disabled={isSubmitting}>
          Save payment details
        </ButtonPrimary>
      </div>
    </form>
  );
};
