import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import PlusIcon from '@/images/icons/plus.svg?react';

import { useAppSelector } from '@/hooks/use-redux';

import { ButtonSecondary } from '@/components/button';
import Icon from '@/components/icon';
import Modal from '@/components/modal/modal';
import { useGetAllUpcomingPaymentsQuery } from '@/routes/dashboard/api.slice';
import { getDashboardId } from '@/routes/dashboard/dashboard.slice';
import { AddUpcomingPaymentForm } from '@/routes/dashboard/upcoming-payment/upcoming-payment-form';
import UpcomingPaymentItem from '@/routes/dashboard/upcoming-payment/upcoming-payment-item';

export default function UpcomingPayments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dashboardId = useAppSelector(getDashboardId);
  const { data: upcomingPayments = [], isLoading, isFetching } = useGetAllUpcomingPaymentsQuery(dashboardId);

  const totalExpectedPayments = upcomingPayments.reduce((total, payment) => {
    return Number(total) + Number(payment.amount);
  }, 0);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="sm:border-accent/10 col-span-full rounded-md sm:border sm:p-4 xl:col-span-2 xl:col-start-3">
      <div className="border-accent/10 bg-surface flex w-full flex-col gap-4 rounded-md border p-4">
        <div className="flex flex-row flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Upcoming Payments</h2>

          <ButtonSecondary type="button" onClick={handleModalOpen} className="lg:px-2 lg:py-1">
            <Icon SvgIcon={PlusIcon} isBorderless />
          </ButtonSecondary>
        </div>
        {isLoading ? (
          <Skeleton height={150} />
        ) : (
          <>
            {upcomingPayments.length > 0 ? (
              <div className="flex flex-col gap-4">
                <div className="border-accent/10 bg-card flex flex-col items-center justify-center rounded-md border p-4 text-center">
                  <p className="text-lg font-bold">{`$ ${totalExpectedPayments}`}</p>
                  <p className="text-copy/70 text-sm">Estimated payments for the upcoming month</p>
                </div>

                <ul
                  className={`grid max-h-[300px] grid-cols-1 gap-2 overflow-y-auto md:grid-cols-2 xl:grid-cols-1 ${isFetching ? 'animate-pulse' : ''}`}
                >
                  {upcomingPayments.map((payment) => {
                    return <UpcomingPaymentItem key={payment.id} payment={payment} />;
                  })}
                </ul>
              </div>
            ) : (
              <p className="text-sm">{"You don't have any upcoming payments scheduled."}</p>
            )}
          </>
        )}
      </div>

      <Modal
        id="addUpcomingPaymentModal"
        title="Add upcoming payment"
        isOpen={isModalOpen}
        handleClose={handleModalClose}
      >
        <AddUpcomingPaymentForm handleModalClose={handleModalClose} />
      </Modal>
    </div>
  );
}
