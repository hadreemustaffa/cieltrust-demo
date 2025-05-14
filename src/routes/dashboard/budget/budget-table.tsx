import { ButtonDelete, ButtonSecondary } from '@/components/button';
import Modal from '@/components/modal';
import MoreMenu from '@/components/more-menu';
import { useBudgetTables } from '@/hooks/use-budget-tables';
import { useModal } from '@/hooks/use-modal';
import BudgetTableCategory from '@/routes/dashboard/budget/budget-table-category';
import { deleteBudgetTable } from '@/routes/dashboard/budget/budget.api';
import { BudgetTableProps, CategoryWithAmount } from '@/routes/dashboard/budget/budget.types';

export default function BudgetTable({ table, children, ...props }: BudgetTableProps) {
  const { activeModal, openModal, closeModal } = useModal();
  const { setBudgetTables } = useBudgetTables();

  let sumOfCategoriesAmount = 0;
  table.budget_categories.forEach((category) => {
    sumOfCategoriesAmount += Number(category.amount);
  });

  const handleDeleteBudgetTable = async (id: number) => {
    await deleteBudgetTable({
      id,
      setBudgetTablesProvider: setBudgetTables,
    });

    closeModal();
  };

  return (
    <div {...props} className="flex flex-col items-start gap-4 rounded-md border border-accent/10 text-left">
      <table className="flex w-full flex-col items-center justify-between">
        <caption className="flex w-full flex-row items-center justify-between gap-2 bg-accent/5 p-2">
          <h3 className="font-bold">{table.name}</h3>
          <div className="flex gap-2">
            <p className={`text-sm font-bold ${sumOfCategoriesAmount > table.amount ? 'text-red-500' : ''}`}>
              ${table.amount}
            </p>
            <MoreMenu
              variant="horizontal"
              onEdit={() => openModal(`editBudgetTableModal-${table.id}`)}
              onDelete={() => openModal(`deleteBudgetTableModal-${table.id}`)}
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

      {children}

      {activeModal === `deleteBudgetTableModal-${table.id}` && (
        <Modal
          id="deleteBudgetModal"
          title="Delete budget"
          isOpen={activeModal === `deleteBudgetTableModal-${table.id}`}
          handleClose={() => closeModal()}
        >
          <div className="flex flex-col gap-2">
            <p>Are you sure you want to delete this budget?</p>
            <p className="font-semibold">{table.name}</p>
          </div>

          <div className="flex flex-row items-center justify-end gap-2">
            <ButtonSecondary type="button" onClick={() => closeModal()}>
              Cancel
            </ButtonSecondary>

            <ButtonDelete onClick={() => handleDeleteBudgetTable(table.id)}>Delete</ButtonDelete>
          </div>
        </Modal>
      )}
    </div>
  );
}
