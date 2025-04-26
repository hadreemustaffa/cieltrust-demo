import { useFormContext } from 'react-hook-form';

import { ButtonPrimary } from '@/components/button';
import { Input, Select } from '@/components/forms/custom-form';
import Icon from '@/components/icon';
import { ERROR_MSG } from '@/data/errorMessages';
import ChevronDownIcon from '@/images/icons/chevron-down.svg?react';
import {
  AddUpcomingPaymentFormProps,
  EditUpcomingPaymentFormProps,
  UpcomingPaymentFormProps,
} from '@/routes/dashboard/upcoming-payment/upcoming-payment.types';

export default function UpcomingPaymentForm({ table, tables, onSubmit, variant }: UpcomingPaymentFormProps) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useFormContext<AddUpcomingPaymentFormProps>();

  const {
    register: editRegister,
    formState: { errors: editErrors, isSubmitting: editIsSubmitting },
    handleSubmit: handleEditSubmit,
  } = useFormContext<EditUpcomingPaymentFormProps>();

  if (variant === 'add') {
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
                return tables.find((table) => table.name === value) && 'Table already exists';
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
            {...register('start_date', {
              required: {
                value: true,
                message: ERROR_MSG.FIELD_IS_REQUIRED,
              },
              valueAsDate: true,
            })}
          />
          {errors.start_date && <p className="text-sm text-red-500">{errors.start_date.message}</p>}
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
            Add payment details
          </ButtonPrimary>
        </div>
      </form>
    );
  }

  if (variant === 'edit') {
    return (
      <form onSubmit={handleEditSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="upcomingPaymentName" className="text-sm">
            Name
          </label>

          <Input
            id="upcomingPaymentName"
            type="text"
            placeholder="Enter budget name"
            defaultValue={table.name}
            autoComplete="off"
            aria-invalid={errors.name ? 'true' : 'false'}
            {...editRegister('name', {
              required: {
                value: true,
                message: ERROR_MSG.FIELD_IS_REQUIRED,
              },
              validate: (value) => {
                if (table.name === value) {
                  return true;
                } else {
                  return (
                    tables.find((stateTable) => stateTable !== table && stateTable.name === value) &&
                    'Table already exists'
                  );
                }
              },
            })}
          />
          {editErrors.name && <p className="text-sm text-red-500">{editErrors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="startDate" className="text-sm">
            Start Date
          </label>
          <Input
            id="startDate"
            type="date"
            className="w-full rounded-md border border-accent/10 bg-transparent p-2"
            defaultValue={table.start_date ?? ''}
            {...editRegister('start_date', {
              required: {
                value: true,
                message: ERROR_MSG.FIELD_IS_REQUIRED,
              },
            })}
          />
          {editErrors.start_date && <p className="text-sm text-red-500">{editErrors.start_date.message}</p>}
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
              defaultValue={table.amount}
              {...editRegister('amount', {
                required: {
                  value: true,
                  message: ERROR_MSG.FIELD_IS_REQUIRED,
                },
              })}
            />

            {editErrors.amount && <p className="text-sm text-red-500">{editErrors.amount.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="upcomingPaymentRecurrence" className="text-sm">
              Recurrence
            </label>

            <div className="relative">
              <Select
                id="upcomingPaymentRecurrence"
                {...editRegister('recurrence')}
                defaultValue={table.recurrence}
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
          <ButtonPrimary type="submit" disabled={editIsSubmitting}>
            Save payment details
          </ButtonPrimary>
        </div>
      </form>
    );
  }
}
