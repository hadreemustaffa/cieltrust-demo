import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import PlusIcon from '@/images/icons/plus.svg?react';

import { useAppSelector } from '@/hooks/use-redux';

import { ButtonSecondary } from '@/components/button';
import Icon from '@/components/icon';
import Modal from '@/components/modal/modal';
import { useGetAllBudgetTablesQuery } from '@/routes/dashboard/api.slice';
import BudgetTable from '@/routes/dashboard/budget/budget-table/budget-table';
import { AddBudgetTableForm } from '@/routes/dashboard/budget/budget-table/budget-table-form';
import { getDashboardId } from '@/routes/dashboard/dashboard.slice';

export default function Budget() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dashboardId = useAppSelector(getDashboardId);
  const { data: budgetTables = [], isLoading, isFetching } = useGetAllBudgetTablesQuery(dashboardId);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="col-span-full rounded-md sm:border sm:border-accent/10 sm:p-4 xl:col-span-2 xl:col-start-1 xl:row-start-1">
      <div className="flex flex-col gap-4 rounded-md border border-accent/10 bg-surface p-4">
        <div className="flex flex-row flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Budgets</h2>

          <ButtonSecondary onClick={handleModalOpen} className="lg:px-2 lg:py-1">
            <Icon SvgIcon={PlusIcon} isBorderless />
          </ButtonSecondary>
        </div>

        {isLoading ? (
          <Skeleton height={150} />
        ) : (
          <div className={`flex max-h-[400px] flex-col overflow-y-auto ${isFetching ? 'animate-pulse' : ''}`}>
            {budgetTables.length > 0 ? (
              budgetTables.map((table) => <BudgetTable key={table.id} table={table} />)
            ) : (
              <p className="text-sm">{"You haven't created any budgets yet."}</p>
            )}
          </div>
        )}

        <Modal id="add-budget-table-modal" title="Add budget table" isOpen={isModalOpen} handleClose={handleModalClose}>
          <AddBudgetTableForm tables={budgetTables} handleModalClose={handleModalClose} />
        </Modal>
      </div>
    </div>
  );
}
