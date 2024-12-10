import React, { useState } from "react";
import MoreMenu from "../../MoreMenu";
import Modal from "../../Modal";
import { ButtonSecondary } from "../../Button";

interface BudgetTableProps {
  name: string;
  amount: number;
  onDelete: () => void;
  onEdit: () => void;
  children: React.ReactNode;
}

type ActiveModal = "editBudgetTable" | "deleteBudgetTable";

export default function BudgetTable({
  name,
  amount,
  onDelete,
  onEdit,
  children,
  ...props
}: BudgetTableProps) {
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);

  const openModal = (modal: ActiveModal) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

  return (
    <div
      {...props}
      className="flex flex-col items-start gap-4 rounded-md border border-accent/10 p-4 text-left"
    >
      <table className="flex w-full flex-col items-center justify-between gap-4">
        <caption className="flex w-full flex-row items-center justify-between gap-2 rounded-md border border-accent/10 bg-accent/5 p-2">
          <h3 className="font-bold">{name}</h3>
          <div className="flex gap-2">
            <p className="text-sm font-bold">${amount}</p>
            <MoreMenu
              isDeletable
              onEdit={() => openModal("editBudgetTable")}
              onDelete={() => openModal("deleteBudgetTable")}
            />
          </div>
        </caption>

        <tbody className="flex w-full flex-col gap-4 overflow-x-scroll text-sm md:overflow-auto">
          <tr className="grid w-[440px] grid-cols-4 justify-between gap-2 sm:w-full">
            <th
              scope="col"
              className="rounded-sm border border-accent/10 px-2 py-1"
            >
              Category
            </th>
            <th
              scope="col"
              className="rounded-sm border border-accent/10 px-2 py-1 text-right"
            >
              Budget
            </th>
            <th
              scope="col"
              className="rounded-sm border border-accent/10 px-2 py-1 text-right"
            >
              Spent
            </th>
            <th
              scope="col"
              className="rounded-sm border border-accent/10 px-2 py-1 text-right"
            >
              Remaining
            </th>
          </tr>
          {children}
        </tbody>
      </table>

      {activeModal === "deleteBudgetTable" && (
        <Modal
          id="deleteBudgetModal"
          title="Delete budget"
          isOpen={activeModal === "deleteBudgetTable"}
          handleClose={() => closeModal()}
        >
          <p>Are you sure you want to delete this budget?</p>

          <div className="flex flex-row items-center justify-end gap-2">
            <ButtonSecondary type="button" onClick={() => closeModal()}>
              Cancel
            </ButtonSecondary>

            <button
              type="button"
              className="w-fit rounded-md bg-red-700 px-6 py-3 text-white hover:bg-red-500"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
