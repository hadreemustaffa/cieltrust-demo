import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { ButtonDelete, ButtonSecondary } from '@/components/button';
import Icon from '@/components/icon';
import Modal from '@/components/modal';
import MoreMenu from '@/components/more-menu';
import { useDashboard } from '@/hooks/use-dashboard';
import { useModal } from '@/hooks/use-modal';
import PlusIcon from '@/images/icons/plus.svg?react';
import { EditUpcomingPaymentForm } from '@/routes/dashboard/upcoming-payment/upcoming-payment-form';
import AddUpcomingPaymentForm from '@/routes/dashboard/upcoming-payment/upcoming-payment-form';
import {
  addUpcomingPayment,
  deleteUpcomingPayment,
  editUpcomingPayment,
} from '@/routes/dashboard/upcoming-payment/upcoming-payment.api';
import {
  AddUpcomingPaymentFormData,
  EditUpcomingPaymentFormData,
  UpcomingPayment,
} from '@/routes/dashboard/upcoming-payment/upcoming-payment.types';

export default function UpcomingPayments({ initialUpcomingPayments }: { initialUpcomingPayments: UpcomingPayment[] }) {
  const [upcomingPayments, setUpcomingPayments] = useState<UpcomingPayment[]>(initialUpcomingPayments);
  const { activeModal, openModal, closeModal } = useModal();
  const { dashboardId } = useDashboard();

  const methods = useForm<AddUpcomingPaymentFormData>();
  const editMethods = useForm<EditUpcomingPaymentFormData>();

  const onAddSubmit: SubmitHandler<AddUpcomingPaymentFormData> = async () => {
    await addUpcomingPayment({
      dashboard_id: dashboardId,
      name: methods.getValues('name'),
      amount: methods.getValues('amount'),
      recurrence: methods.getValues('recurrence'),
      date: methods.getValues('date'),
      state: setUpcomingPayments,
    });
  };

  const onEditSubmit = useCallback(
    (id: number): SubmitHandler<EditUpcomingPaymentFormData> => {
      return async () => {
        await editUpcomingPayment({
          dashboard_id: dashboardId,
          id: id,
          name: editMethods.getValues('name'),
          amount: editMethods.getValues('amount'),
          recurrence: editMethods.getValues('recurrence'),
          date: editMethods.getValues('date'),
          state: setUpcomingPayments,
        });
      };
    },
    [dashboardId, editMethods, setUpcomingPayments],
  );

  const handleDeleteUpcomingPayment = async (id: number) => {
    await deleteUpcomingPayment({
      id,
      state: setUpcomingPayments,
    });

    closeModal();
  };

  useEffect(() => {
    if (activeModal) {
      methods.setFocus('name');
      editMethods.setFocus('name');

      return () => {
        methods.reset();
        editMethods.reset();
      };
    }
  }, [activeModal, methods, editMethods]);

  useEffect(() => {
    if (methods.formState.isSubmitSuccessful) {
      methods.reset();
      closeModal();
    }
  }, [methods.formState.isSubmitSuccessful, methods, closeModal]);

  useEffect(() => {
    if (editMethods.formState.isSubmitSuccessful) {
      editMethods.reset();
      closeModal();
    }
  }, [editMethods.formState.isSubmitSuccessful, editMethods, closeModal]);

  const calculateNextPaymentDate = (startDate: string, recurrence: string) => {
    const currentDate = dayjs();

    if (startDate === '') {
      return currentDate;
    }

    let nextDate = dayjs(startDate);

    if (nextDate.isAfter(currentDate)) {
      return nextDate;
    }

    if (recurrence.toLowerCase() === 'monthly') {
      const monthsDiff = currentDate.diff(nextDate, 'month');

      nextDate = nextDate.add(monthsDiff, 'month');

      if (nextDate.isBefore(currentDate)) {
        nextDate = nextDate.add(1, 'month');
      }
    } else if (recurrence.toLowerCase() === 'weekly') {
      const weeksDiff = currentDate.diff(nextDate, 'week');

      nextDate = nextDate.add(weeksDiff, 'week');

      if (nextDate.isBefore(currentDate)) {
        nextDate = nextDate.add(1, 'week');
      }
    }

    return nextDate;
  };

  const totalExpectedPayments = upcomingPayments.reduce((total, payment) => {
    return Number(total) + Number(payment.amount);
  }, 0);

  const sortedUpcomingPayments = [...upcomingPayments].sort((a, b) => {
    const nextDateA = calculateNextPaymentDate(a.date ?? '', a.recurrence);
    const nextDateB = calculateNextPaymentDate(b.date ?? '', b.recurrence);
    return nextDateA.unix() - nextDateB.unix();
  });

  return (
    <div className="col-span-full rounded-md sm:border sm:border-accent/10 sm:p-4 xl:col-span-2 xl:col-start-3">
      <div className="flex w-full flex-col gap-4 rounded-md border border-accent/10 bg-surface p-4">
        <div className="flex flex-row flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Upcoming Payments</h2>

          <ButtonSecondary onClick={() => openModal('addUpcomingPaymentModal')} className="lg:px-2 lg:py-1">
            <Icon SvgIcon={PlusIcon} isBorderless />
          </ButtonSecondary>
        </div>
        {upcomingPayments.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center justify-center rounded-md border border-accent/10 bg-card p-4 text-center">
              <p className="text-lg font-medium">{`$ ${totalExpectedPayments}`}</p>
              <p className="text-sm text-copy/70">Estimated payments for the upcoming month</p>
            </div>

            <ul className="grid max-h-[300px] grid-cols-1 gap-2 overflow-y-auto md:grid-cols-2">
              {sortedUpcomingPayments.map((payment) => {
                const nextPaymentDate = calculateNextPaymentDate(payment.date ?? '', payment.recurrence);

                return (
                  <li
                    key={payment.id}
                    className="grid grid-cols-[1fr_auto] items-center justify-between gap-2 rounded-md border border-accent/10 p-2"
                  >
                    <div className="flex flex-col">
                      <p className="font-semibold">{payment.name}</p>
                      <p className="text-sm text-copy/70">
                        {payment.recurrence}, next on {nextPaymentDate.format('DD/MM/YY')}
                      </p>
                    </div>

                    <div className="flex flex-row place-content-end items-center gap-4">
                      <p>$ {payment.amount}</p>

                      <MoreMenu
                        variant="horizontal"
                        onEdit={() => openModal(`editUpcomingPaymentModal-${payment.id}`)}
                        onDelete={() => openModal(`deleteUpcomingPaymentModal-${payment.id}`)}
                      />
                    </div>

                    {activeModal === `editUpcomingPaymentModal-${payment.id}` && (
                      <Modal
                        id={`editUpcomingPaymentModal-${payment.id}`}
                        title="Edit payment details?"
                        isOpen={activeModal === `editUpcomingPaymentModal-${payment.id}`}
                        handleClose={() => closeModal()}
                      >
                        <FormProvider {...editMethods}>
                          <EditUpcomingPaymentForm
                            upcomingPayment={payment}
                            upcomingPayments={upcomingPayments}
                            onSubmit={onEditSubmit(payment.id)}
                          />
                        </FormProvider>
                      </Modal>
                    )}

                    {activeModal === `deleteUpcomingPaymentModal-${payment.id}` && (
                      <Modal
                        id={`deleteUpcomingPaymentModal-${payment.id}`}
                        title="Delete upcoming payment"
                        isOpen={activeModal === `deleteUpcomingPaymentModal-${payment.id}`}
                        handleClose={() => closeModal()}
                      >
                        <div className="flex flex-col gap-2">
                          <p>Are you sure you want to delete this payment?</p>
                          <p className="font-semibold">{payment.name}</p>
                        </div>

                        <div className="flex flex-row items-center justify-end gap-2">
                          <ButtonSecondary type="button" onClick={() => closeModal()}>
                            Cancel
                          </ButtonSecondary>

                          <ButtonDelete onClick={() => handleDeleteUpcomingPayment(payment.id)}>Delete</ButtonDelete>
                        </div>
                      </Modal>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <p className="text-sm">You don&apos;t have any upcoming payments scheduled.</p>
        )}
      </div>

      {activeModal === 'addUpcomingPaymentModal' && (
        <Modal
          id="addUpcomingPaymentModal"
          title="Add upcoming payment"
          isOpen={activeModal === 'addUpcomingPaymentModal'}
          handleClose={() => closeModal()}
        >
          <FormProvider {...methods}>
            <AddUpcomingPaymentForm upcomingPayments={upcomingPayments} onSubmit={onAddSubmit} />
          </FormProvider>
        </Modal>
      )}
    </div>
  );
}
