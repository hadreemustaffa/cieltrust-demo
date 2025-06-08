import { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';

import { calculateNextPaymentDate } from '@/utils/calculateNextPaymentDate';

import { useAppSelector } from '@/hooks/use-redux';

import { ButtonDelete, ButtonSecondary } from '@/components/button';
import Modal from '@/components/modal/modal';
import MoreMenu from '@/components/more-menu';
import { useDeleteUpcomingPaymentMutation } from '@/routes/dashboard/api.slice';
import { getDashboardId } from '@/routes/dashboard/dashboard.slice';
import { EditUpcomingPaymentForm } from '@/routes/dashboard/upcoming-payment/upcoming-payment-form';
import { UpcomingPaymentItemProps } from '@/routes/dashboard/upcoming-payment/upcoming-payment.types';

export default function UpcomingPaymentItem({ payment }: UpcomingPaymentItemProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const dashboardId = useAppSelector(getDashboardId);

  const [deleteUpcomingPayment, { isLoading, isSuccess }] = useDeleteUpcomingPaymentMutation();

  const nextPaymentDate = calculateNextPaymentDate(payment.date, payment.recurrence);

  const handleDeleteUpcomingPayment = async () => {
    try {
      await deleteUpcomingPayment({
        id: payment.id,
        dashboard_id: dashboardId,
      }).unwrap();
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    if (isSuccess) {
      setActiveModal(null);
    }
  }, [isSuccess]);

  return (
    <li
      key={payment.id}
      className="border-accent/10 grid grid-cols-[1fr_auto] items-center justify-between gap-2 rounded-md border p-2"
    >
      <div className="flex flex-col">
        <p className="font-semibold">{payment.name}</p>
        <p className="text-copy/70 text-sm">
          {payment.recurrence}, next on {nextPaymentDate.format('DD/MM/YY')}
        </p>
      </div>

      <div className="flex flex-row place-content-end items-center gap-4">
        <p>$ {payment.amount}</p>

        <MoreMenu
          variant="horizontal"
          onEdit={() => setActiveModal(`editUpcomingPaymentModal-${payment.id}`)}
          onDelete={() => setActiveModal(`deleteUpcomingPaymentModal-${payment.id}`)}
        />
      </div>

      <Modal
        id={`editUpcomingPaymentModal-${payment.id}`}
        title="Edit payment details?"
        isOpen={activeModal === `editUpcomingPaymentModal-${payment.id}`}
        handleClose={handleModalClose}
      >
        <EditUpcomingPaymentForm payment={payment} handleModalClose={handleModalClose} />
      </Modal>

      <Modal
        id={`deleteUpcomingPaymentModal-${payment.id}`}
        title="Delete upcoming payment"
        isOpen={activeModal === `deleteUpcomingPaymentModal-${payment.id}`}
        handleClose={handleModalClose}
      >
        <div className="flex flex-col gap-2">
          <p>Are you sure you want to delete this payment?</p>
          <p className="font-semibold">{payment.name}</p>
        </div>

        <div className="flex flex-row items-center justify-end gap-2">
          <ButtonSecondary type="button" onClick={handleModalClose}>
            Cancel
          </ButtonSecondary>

          <div className="flex flex-row items-center justify-end gap-2 disabled:opacity-50">
            <ButtonDelete
              type="button"
              className={isLoading ? 'opacity-50' : ''}
              disabled={isLoading}
              onClick={handleDeleteUpcomingPayment}
            >
              <MoonLoader loading={isLoading} size={16} color="#fff" />
              <span>Delete</span>
            </ButtonDelete>
          </div>
        </div>
      </Modal>
    </li>
  );
}
