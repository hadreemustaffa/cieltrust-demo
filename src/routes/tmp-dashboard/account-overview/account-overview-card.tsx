import { useEffect, useImperativeHandle, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Icon from '@/components/icon';
import MoreMenu from '@/components/more-menu';
import { useDashboard } from '@/hooks/use-dashboard';
import useOutsideClick from '@/hooks/use-outside-click';
import CreditCardIcon from '@/images/icons/credit-card.svg?react';
import TrendingUpIcon from '@/images/icons/trending-up.svg?react';
import {
  AccountOverviewCardFormProps,
  AccountOverviewCardProps,
} from '@/routes/tmp-dashboard/account-overview/account-overview.types';
import supabase from '@/utils/supabase';

export default function AccountOverviewCard({ amount, columnTitle }: AccountOverviewCardProps) {
  const [isEditting, setIsEditting] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(amount);

  const { dashboardId } = useDashboard();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    watch,
    formState: { errors },
  } = useForm<AccountOverviewCardFormProps>({
    defaultValues: {
      amount: amount,
    },
  });

  // https://react-hook-form.com/faqs#:~:text=%7D-,How%20to%20share%20ref%20usage%3F,-React%20Hook%20Form
  const inputRef = useOutsideClick<HTMLInputElement>(async () => {
    await handleSubmit(onSubmit)();
  });

  const { ref, ...rest } = register('amount');
  useImperativeHandle(ref, () => inputRef.current);

  const updatePayload = { [columnTitle]: watch('amount') };

  const updateAmount = async (id: number | null) => {
    const { error } = await supabase.from('overview').update(updatePayload).eq('dashboard_id', id).select();

    if (error) {
      console.log(error);
    }

    setCurrentAmount(getValues('amount'));
    setIsEditting(false);
  };

  const onSubmit: SubmitHandler<AccountOverviewCardFormProps> = async () => {
    if (getValues('amount') === currentAmount || watch('amount').toString() === '') {
      setIsEditting(false);
    } else {
      await updateAmount(dashboardId);
    }
  };

  const handleEdit = () => {
    setFocus('amount');
    setIsEditting(true);
  };

  useEffect(() => {
    if (isEditting) {
      setValue('amount', currentAmount);
      setFocus('amount');
    }
  }, [isEditting, setValue, setFocus, currentAmount]);

  useEffect(() => {
    setCurrentAmount(amount);
  }, [amount]);

  return (
    <>
      <div className="flex flex-col gap-2 rounded-md border border-accent/10 bg-surface p-4">
        <div className="flex flex-col justify-between gap-2 text-left">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <Icon SvgIcon={CreditCardIcon} width={16} height={16} isBorderless />
              <p className="text-sm">{columnTitle[0].toUpperCase() + columnTitle.substring(1)}</p>
            </div>
            <div className="flex flex-row items-center gap-2 rounded-sm bg-green-800 px-2 py-1 text-xs text-green-400">
              <p>+{0}%</p>
              <Icon SvgIcon={TrendingUpIcon} width={16} height={16} isBorderless />
            </div>
          </div>
          {isEditting ? (
            <>
              <div className="flex flex-row gap-2">
                <p className="text-2xl font-bold">$</p>
                <form id="editOverviewAmountForm" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                  <input
                    type="number"
                    className="w-full rounded-md border border-accent/10 bg-transparent pl-2 text-2xl font-bold"
                    min={0}
                    aria-invalid={errors.amount ? 'true' : 'false'}
                    ref={inputRef}
                    {...rest}
                  />
                  {errors.amount && <p className="text-xs text-red-500">{errors.amount.message}</p>}
                </form>
                <button
                  form="editOverviewAmountForm"
                  type="submit"
                  className="sr-only flex flex-row items-center gap-2 text-xs"
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <p className="flex flex-row items-center gap-4 text-2xl font-bold">
              $ <span>{currentAmount}</span>
            </p>
          )}
        </div>
        <div className="h-[1px] w-full bg-accent/10"></div>
        <div className="flex flex-row items-center justify-between gap-2">
          <p className="text-sm">
            Last month: <span className="font-semibold">$ {0}</span>
          </p>

          <MoreMenu onEdit={handleEdit} />
        </div>
      </div>
    </>
  );
}
