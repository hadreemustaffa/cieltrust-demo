import { useEffect, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import { useBudgetTables } from '@/hooks/use-budget-tables';

import { ButtonDelete, ButtonSecondary } from '@/components/button';
import Modal from '@/components/modal/modal';
import MoreMenu from '@/components/more-menu';
import { EditBudgetTableForm } from '@/routes/dashboard/budget/budget-table/budget-table-form';
import { deleteBudgetTable, editBudgetTable } from '@/routes/dashboard/budget/budget-table/budget-table.api';
import BudgetTableCategory from '@/routes/dashboard/budget/budget-table-category/budget-table-category';
import { BudgetTableProps, EditBudgetTableFormData } from '@/routes/dashboard/budget/budget.types';
import { CategoryWithAmount } from '@/routes/dashboard/categories/categories.types';

export default function BudgetTable({ table, ...props }: BudgetTableProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { budgetTables, setBudgetTables } = useBudgetTables();

  let sumOfCategoriesAmount = 0;
  table.budget_categories.forEach((category) => {
    sumOfCategoriesAmount += Number(category.amount);
  });

  const {
    getValues,
    reset,
    setFocus,
    formState: { isSubmitSuccessful },
  } = useFormContext<EditBudgetTableFormData>();

  const handleModalClose = () => {
    setActiveModal(null);
  };

  const handleDeleteBudgetTable = async (id: number) => {
    await deleteBudgetTable({
      id,
      setBudgetTablesProvider: setBudgetTables,
    });

    setActiveModal(null);
  };

  const onSubmit: SubmitHandler<EditBudgetTableFormData> = async () => {
    await editBudgetTable({
      id: table.id,
      name: getValues('name'),
      amount: getValues('amount'),
      editCategories: getValues('editCategories'),
      state: budgetTables,
      setBudgetTablesProvider: setBudgetTables,
    });
  };

  useEffect(() => {
    if (activeModal === `edit-budget-table-${table.id}-modal`) {
      setFocus('name');

      return () => {
        reset();
      };
    }
  }, [activeModal, setFocus, reset, table.id]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setActiveModal(null);
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div
      {...props}
      className="flex flex-col items-start gap-4 border border-b-0 border-accent/10 text-left first:rounded-t-md last:rounded-b-md last:border-b"
    >
      <table className="flex w-full flex-col items-center justify-between">
        <caption className="flex w-full flex-row items-center justify-between gap-2 bg-accent/5 p-2">
          <h3 className="font-bold">{table.name}</h3>
          <div className="flex gap-2">
            <p className={`text-sm font-bold ${sumOfCategoriesAmount > table.amount ? 'text-red-500' : ''}`}>
              ${table.amount}
            </p>
            <MoreMenu
              variant="horizontal"
              onEdit={() => setActiveModal(`edit-budget-table-${table.id}-modal`)}
              onDelete={() => setActiveModal(`delete-budget-table-${table.id}-modal`)}
            />
          </div>
        </caption>

        <tbody className="flex w-full flex-col overflow-x-auto text-sm">
          <tr className="grid min-w-[500px] grid-cols-4 justify-between sm:w-full">
            <th scope="col" className="border border-x-0 border-accent/10 px-2 py-1 text-copy/70">
              Category
            </th>
            <th scope="col" className="border border-accent/10 px-2 py-1 text-right text-copy/70">
              Budget
            </th>
            <th scope="col" className="border border-l-0 border-accent/10 px-2 py-1 text-right text-copy/70">
              Spent
            </th>
            <th scope="col" className="border border-x-0 border-accent/10 px-2 py-1 text-right text-copy/70">
              Remaining
            </th>
          </tr>

          {table.budget_categories.map((category: CategoryWithAmount) => (
            <BudgetTableCategory key={category.category_id} category={category} />
          ))}
        </tbody>
      </table>

      {activeModal === `edit-budget-table-${table.id}-modal` && (
        <Modal
          id={`edit-budget-table-${table.id}-modal`}
          title="Edit this budget?"
          isOpen={activeModal === `edit-budget-table-${table.id}-modal`}
          handleClose={handleModalClose}
        >
          <EditBudgetTableForm table={table} tables={budgetTables} onSubmit={onSubmit} />
        </Modal>
      )}

      {activeModal === `delete-budget-table-${table.id}-modal` && (
        <Modal
          id="deleteBudgetModal"
          title="Delete budget"
          isOpen={activeModal === `delete-budget-table-${table.id}-modal`}
          handleClose={handleModalClose}
        >
          <div className="flex flex-col gap-2">
            <p>Are you sure you want to delete this budget?</p>
            <p className="font-semibold">{table.name}</p>
          </div>

          <div className="flex flex-row items-center justify-end gap-2">
            <ButtonSecondary type="button" onClick={handleModalClose}>
              Cancel
            </ButtonSecondary>

            <ButtonDelete onClick={() => handleDeleteBudgetTable(table.id)}>Delete</ButtonDelete>
          </div>
        </Modal>
      )}
    </div>
  );
}
