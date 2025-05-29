export type UpcomingPayment = {
  id: number;
  name: string;
  date: string;
  amount: number;
  recurrence: string;
};

export interface UpcomingPaymentItemProps {
  payment: UpcomingPayment;
}

export interface AddUpcomingPaymentFormProps {
  handleModalClose: () => void;
}

export interface EditUpcomingPaymentFormProps {
  payment: UpcomingPayment;
  handleModalClose: () => void;
}

export interface AddUpcomingPaymentFormData {
  dashboard_id: number;
  name: string;
  date: string;
  amount: number;
  recurrence: string;
}

export interface EditUpcomingPaymentFormData {
  dashboard_id: number;
  id: number;
  name: string;
  date: string;
  amount: number;
  recurrence: string;
}

export interface DeleteUpcomingPayment {
  dashboard_id: number;
  id: number;
}

export interface GetUpcomingPayment {
  id: number;
  dashboard_id: number;
}
