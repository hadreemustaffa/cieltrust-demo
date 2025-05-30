import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import PlusIcon from '@/images/icons/plus.svg?react';

import { useAppSelector } from '@/hooks/use-redux';

import { ButtonSecondary } from '@/components/button';
import Icon from '@/components/icon';
import Modal from '@/components/modal/modal';
import { useGetAllSavingGoalsQuery } from '@/routes/dashboard/api.slice';
import { getDashboardId } from '@/routes/dashboard/dashboard.slice';
import { AddSavingGoalsForm } from '@/routes/dashboard/saving-goals/saving-goals-form';
import SavingGoalsItem from '@/routes/dashboard/saving-goals/saving-goals-item';

export default function SavingGoals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dashboardId = useAppSelector(getDashboardId);
  const { data: savingGoals = [], isLoading, isFetching } = useGetAllSavingGoalsQuery(dashboardId);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="rounded-md sm:border sm:border-accent/10 sm:p-4 md:col-span-full lg:col-span-2">
      <div className="flex flex-col gap-4 rounded-md border border-accent/10 bg-surface p-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Saving Goals</h2>

          <ButtonSecondary onClick={handleModalOpen} className="lg:px-2 lg:py-1">
            <Icon SvgIcon={PlusIcon} isBorderless />
          </ButtonSecondary>
        </div>

        <Modal id="addSavingGoalModal" title="Add Saving Goal" isOpen={isModalOpen} handleClose={handleModalClose}>
          <AddSavingGoalsForm handleModalClose={handleModalClose} />
        </Modal>

        {isLoading ? (
          <Skeleton height={40} />
        ) : (
          <>
            {savingGoals.length > 0 ? (
              <ul className={`flex max-h-[282px] flex-col gap-2 overflow-y-auto ${isFetching ? 'animate-pulse' : ''}`}>
                {savingGoals.map((goal) => (
                  <SavingGoalsItem key={goal.id} goal={goal} />
                ))}
              </ul>
            ) : (
              <p className="text-sm">{"You don't have any saving goals yet."}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
