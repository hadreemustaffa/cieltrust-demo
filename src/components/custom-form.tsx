import React from 'react';
import { useForm } from 'react-hook-form';
import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { cn } from '@/utils/cn';

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  className?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    {...props}
    className={cn(`w-full rounded-md border border-accent/10 bg-transparent p-2 hover:cursor-pointer`, className)}
  />
));
Input.displayName = 'Input';

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  options: Option[];
  children?: React.ReactNode;
  className?: string;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, children, className, ...props }, ref) => (
    <select
      ref={ref}
      {...props}
      className={cn(
        `w-full appearance-none rounded-md border border-accent/10 bg-card p-2 hover:cursor-pointer`,
        className,
      )}
    >
      {options.map(({ label, value }, index) => (
        <option key={index} value={value}>
          {label}
        </option>
      ))}
      {children}
    </select>
  ),
);
Select.displayName = 'Select';

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
};

export const CustomForm = <TFormValues extends FieldValues>({ onSubmit, children }: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>();
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {children(methods)}
    </form>
  );
};
