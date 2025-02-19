import { FormData } from '@/routes/dashboard/add-transaction/add-transaction.types';
import supabase from '@/utils/supabase';

export const addTransaction = async ({ name, amount, id }: FormData) => {
  try {
    const { data } = await supabase
      .from('overview')
      .update({
        [name]: amount,
      })
      .eq('id', id);

    if (data) {
      console.log(data);
    }
  } catch (error) {
    console.log(`Error inserting ${name} :`, error);
  }
};
