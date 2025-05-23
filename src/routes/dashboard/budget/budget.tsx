import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import PlusIcon from '@/images/icons/plus.svg?react';

import { useBudgetTables } from '@/hooks/use-budget-tables';
import { useAppSelector } from '@/hooks/use-redux';

import { ButtonSecondary } from '@/components/button';
import Icon from '@/components/icon';
import Modal from '@/components/modal/modal';
import { useGetCategoriesQuery } from '@/routes/dashboard/api.slice';
import BudgetTable from '@/routes/dashboard/budget/budget-table/budget-table';
import { AddBudgetTableForm } from '@/routes/dashboard/budget/budget-table/budget-table-form';
import { addBudgetTable } from '@/routes/dashboard/budget/budget.api';
import { AddBudgetTableFormData, EditBudgetTableFormData } from '@/routes/dashboard/budget/budget.types';
import { getDashboardId } from '@/routes/dashboard/dashboard.slice';

export default function Budget() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { budgetTables, setBudgetTables } = useBudgetTables();
  const dashboardId = useAppSelector(getDashboardId);
  const { data: categories = [] } = useGetCategoriesQuery(dashboardId);

  const methods = useForm<AddBudgetTableFormData>({
    defaultValues: {
      addCategories: categories,
    },
  });

  const editMethods = useForm<EditBudgetTableFormData>({
    defaultValues: {
      editCategories: categories,
    },
  });

  const onAddSubmit: SubmitHandler<AddBudgetTableFormData> = async () => {
    await addBudgetTable({
      id: dashboardId,
      name: methods.getValues('name'),
      amount: methods.getValues('amount'),
      categories: categories,
      addCategories: methods.getValues('addCategories'),
      setBudgetTablesProvider: setBudgetTables,
    });
  };

  // update fields array default values on each category change
  useEffect(() => {
    methods.reset({
      addCategories: categories,
    });
    editMethods.reset({
      editCategories: categories,
    });
  }, [categories, methods, editMethods]);

  useEffect(() => {
    if (isModalOpen) {
      methods.setFocus('name');

      return () => {
        methods.reset();
      };
    }
  }, [methods, isModalOpen]);

  useEffect(() => {
    if (methods.formState.isSubmitSuccessful) {
      methods.reset();
      setIsModalOpen(false);
    }
  }, [methods.formState.isSubmitSuccessful, methods]);

  return (
    <div className="col-span-full rounded-md sm:border sm:border-accent/10 sm:p-4 xl:col-span-2 xl:col-start-1 xl:row-start-1">
      <div className="flex flex-col gap-4 rounded-md border border-accent/10 bg-surface p-4">
        <div className="flex flex-row flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Budgets</h2>

          <ButtonSecondary onClick={() => setIsModalOpen(true)} className="lg:px-2 lg:py-1">
            <Icon SvgIcon={PlusIcon} isBorderless />
          </ButtonSecondary>
        </div>

        <div className="flex max-h-[400px] flex-col overflow-y-auto">
          {budgetTables.length > 0 ? (
            budgetTables.map((table) => (
              <FormProvider key={table.id} {...editMethods}>
                <BudgetTable table={table} />
              </FormProvider>
            ))
          ) : (
            <p className="text-sm">You haven&apos;t created any budgets yet.</p>
          )}
        </div>

        <Modal
          id="add-budget-table-modal"
          title="Add budget table"
          isOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
        >
          <FormProvider {...methods}>
            <AddBudgetTableForm tables={budgetTables} onSubmit={onAddSubmit} />
          </FormProvider>
        </Modal>
      </div>
    </div>
  );
}
