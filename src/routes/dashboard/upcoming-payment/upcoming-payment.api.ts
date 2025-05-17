import supabase from '@/utils/supabase';

import {
  AddUpcomingPaymentFormData,
  DeleteUpcomingPaymentProps,
  EditUpcomingPaymentFormData,
  UpcomingPayment,
} from '@/routes/dashboard/upcoming-payment/upcoming-payment.types';

export const addUpcomingPayment = async ({
  dashboard_id,
  name,
  amount,
  date,
  recurrence,
  state,
}: AddUpcomingPaymentFormData) => {
  try {
    const { data, error } = await supabase
      .from('upcoming_payment')
      .insert({
        dashboard_id: dashboard_id,
        name: name,
        date: date,
        amount: amount,
        recurrence: recurrence,
      })
      .select()
      .single();

    if (error) {
      console.log('Error inserting budget:', error);
      throw error;
    }

    if (data) {
      const newUpcomingPayment: UpcomingPayment = {
        id: data.id,
        name: data.name,
        date: data.date,
        amount: data.amount,
        recurrence: data.recurrence,
      };

      state((prevPayments) => [...prevPayments, newUpcomingPayment]);
    }
  } catch (error) {
    console.error('Error inserting budget and categories:', error);
  }
};

export const editUpcomingPayment = async ({
  dashboard_id,
  id,
  name,
  amount,
  date,
  recurrence,
  state,
}: EditUpcomingPaymentFormData) => {
  try {
    const { data, error } = await supabase
      .from('upcoming_payment')
      .update({
        name: name,
        amount: amount,
        date: date,
        recurrence: recurrence,
      })
      .select()
      .eq('id', id)
      .eq('dashboard_id', dashboard_id);

    if (error) {
      console.log('Error updating payment details:', error);
      throw error;
    }

    if (data) {
      state((prevPayments) =>
        prevPayments.map((payment) =>
          payment.id === id
            ? {
                ...payment,
                name: name,
                amount: amount,
                date: date,
                recurrence: recurrence,
              }
            : payment,
        ),
      );
    }
  } catch (error) {
    console.error('Error updating payment:', error);
  }
};

export const deleteUpcomingPayment = async ({ id, state }: DeleteUpcomingPaymentProps) => {
  try {
    await supabase.from('upcoming_payment').delete().eq('id', id);
    state((prevPayments) => prevPayments.filter((payment) => payment.id !== id));
  } catch (error) {
    console.error('Error deleting budget:', error);
  }
};
