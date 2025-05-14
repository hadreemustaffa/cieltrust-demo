import React from 'react';

export interface AddUpcomingPaymentFormData {
  dashboard_id: number;
  name: string;
  date: string;
  amount: number;
  recurrence: string;
  state: React.Dispatch<React.SetStateAction<UpcomingPayment[]>>;
}

export interface EditUpcomingPaymentFormData {
  dashboard_id: number;
  id: number;
  name: string;
  date: string;
  amount: number;
  recurrence: string;
  state: React.Dispatch<React.SetStateAction<UpcomingPayment[]>>;
}

export type UpcomingPayment = {
  id: number;
  name: string;
  date: string;
  amount: number;
  recurrence: string;
};

export interface AddUpcomingPaymentFormProps {
  upcomingPayments: UpcomingPayment[];
  onSubmit: (data: AddUpcomingPaymentFormData) => void;
}

export interface EditUpcomingPaymentFormProps {
  upcomingPayment: UpcomingPayment;
  upcomingPayments: UpcomingPayment[];
  onSubmit: (data: EditUpcomingPaymentFormData) => void;
}
export interface DeleteUpcomingPaymentProps {
  id: number | null;
  state: React.Dispatch<React.SetStateAction<UpcomingPayment[]>>;
}
