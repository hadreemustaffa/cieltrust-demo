import React from 'react';

export interface AddUpcomingPaymentFormProps {
  id: number | null;
  name: string;
  is_recurring?: boolean;
  recurrence: string;
  start_date: string;
  amount: number;
}

export interface EditUpcomingPaymentFormProps {
  id: number | null;
  name: string;
  amount: number;
  is_recurring?: boolean;
  recurrence: string;
  start_date: string;
}

export type Table = {
  id: number;
  name: string;
  amount: number;
  remaining?: number;
  is_recurring: boolean;
  recurrence: string;
  start_date: string | null;
};

export interface UpcomingPaymentProps {
  table: Table;
  children: React.ReactNode;
}

export type UpcomingPaymentFormProps =
  | {
      variant: 'add';
      table?: Table;
      tables: Table[];
      onSubmit: (data: AddUpcomingPaymentFormProps) => void;
    }
  | {
      variant: 'edit';
      table: Table;
      tables: Table[];
      onSubmit: (data: EditUpcomingPaymentFormProps) => void;
    };

export interface DeleteUpcomingPaymentProps {
  id: number | null;
}
