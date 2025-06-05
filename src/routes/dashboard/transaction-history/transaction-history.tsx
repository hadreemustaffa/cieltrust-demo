import React, { useEffect, useRef, useState } from 'react';

import ClockIcon from '@/images/icons/clock.svg?react';
import TrashIcon from '@/images/icons/trash.svg?react';

import { useAppSelector } from '@/hooks/use-redux';

import { ButtonDelete, ButtonSecondary } from '@/components/button';
import { Input } from '@/components/custom-form';
import Icon from '@/components/icon';
import Modal, { ModalError, ModalLoading, ModalProps } from '@/components/modal/modal';
import {
  useDeleteTransactionHistoryMutation,
  useGetPaginatedTransactionHistoryQuery,
} from '@/routes/dashboard/api.slice';
import { getDashboardId } from '@/routes/dashboard/dashboard.slice';
import {
  TransactionListItemProps,
  TransactionsListProps,
  TransactionType,
} from '@/routes/dashboard/transaction-history/transaction-history.types';

export default function TransactionHistory() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ButtonSecondary onClick={() => setIsModalOpen(true)} className="gap-2">
        <Icon SvgIcon={ClockIcon} isBorderless />
        <span className="hidden md:inline">View Transaction History</span>
      </ButtonSecondary>

      {isModalOpen && <ModalWithContent isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />}
    </>
  );
}

const ModalWithContent = ({ isOpen, handleClose }: Pick<ModalProps, 'isOpen' | 'handleClose'>) => {
  const [transactionType, setTransactionType] = useState<TransactionType>('income');
  const [currentPage, setCurrentPage] = useState(0);
  const dashboardId = useAppSelector(getDashboardId);

  const { data, isLoading, isFetching, isSuccess, isError, error } = useGetPaginatedTransactionHistoryQuery({
    dashboardId,
    page: currentPage,
    limit: 10,
    type: transactionType,
  });

  const history = data?.history ?? [];
  const count = data?.count ?? 0;
  const limit = data?.limit ?? 0;

  const incomeTransactions = history.filter((transaction) => transaction.type === 'income');
  const expensesTransactions = history.filter((transaction) => transaction.type === 'expenses');

  const currentTransactions = transactionType === 'income' ? incomeTransactions : expensesTransactions;

  const totalItems = count;
  const totalPages = limit > 0 ? Math.ceil(totalItems / limit) : 1;
  const lastPage = totalPages;

  const startItem = totalItems === 0 ? 0 : currentPage * limit + 1;
  const endItem = totalItems === 0 ? 0 : Math.min(startItem + currentTransactions.length - 1, totalItems);

  const handlePrevPage = () => setCurrentPage(currentPage - 1);
  const handleNextPage = () => setCurrentPage(currentPage + 1);
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setTransactionType(e.target.value as TransactionType);

  useEffect(() => {
    if (!isOpen) return;

    return () => {
      setTransactionType('income');
    };
  }, [isOpen]);

  if (isLoading) {
    return <ModalLoading isOpen={isOpen} handleClose={handleClose} />;
  } else if (isError) {
    return <ModalError isOpen={isOpen} handleClose={handleClose} error={error.toString()} />;
  }

  if (isSuccess) {
    return (
      <Modal
        id="viewTransactionHistoryModal"
        title="Transaction History"
        isOpen={isOpen}
        handleClose={handleClose}
        className="max-h-[80vh] max-w-3xl overflow-y-auto"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <label htmlFor="transactionTypeSelect" className="text-sm">
              Change Transaction Type:
            </label>
            <select
              id="transactionTypeSelect"
              value={transactionType}
              onChange={handleTypeChange}
              className="rounded-md border border-accent/10 bg-card px-2 py-1 hover:cursor-pointer"
            >
              <option value="income">Income</option>
              <option value="expenses">Expenses</option>
            </select>
          </div>

          {history.length > 0 ? (
            <>
              <TransactionsList
                isFetching={isFetching}
                transactionType={transactionType}
                setCurrentPage={setCurrentPage}
                currentTransactions={currentTransactions}
                handleClose={handleClose}
              />
              <div className="mt-4 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  className="rounded-md border border-accent/10 p-1 hover:cursor-pointer hover:border-accent/50 disabled:cursor-default disabled:border-accent/10 disabled:opacity-50"
                  disabled={currentPage === 0}
                >
                  Previous
                </button>
                <span>
                  {currentTransactions.length > 0
                    ? `Showing ${startItem} - ${endItem} of ${totalItems} transactions`
                    : 'No transactions found'}
                </span>
                <button
                  type="button"
                  onClick={handleNextPage}
                  className="rounded-md border border-accent/10 p-1 hover:cursor-pointer hover:border-accent/50 disabled:cursor-default disabled:border-accent/10 disabled:opacity-50"
                  disabled={currentPage + 1 === lastPage}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p className="py-8 text-center">No transaction history found.</p>
          )}
        </div>
      </Modal>
    );
  }
};

const TransactionsList = ({
  isFetching,
  transactionType,
  setCurrentPage,
  currentTransactions,
  handleClose,
}: TransactionsListProps) => {
  const [selectAll, setSelectAll] = useState(false);
  const [checkedTransactions, setCheckedTransactions] = useState<Record<string, boolean>>({});
  const prevTransactionTypeRef = useRef(transactionType);

  const [deleteTransactionHistory] = useDeleteTransactionHistoryMutation();

  const checkedCount = Object.values(checkedTransactions).filter(Boolean).length;
  const hasCheckedItems = checkedCount > 0;

  let tableColumns;
  if (transactionType === 'income') {
    tableColumns = ['From', 'Amount', 'Savings (%)', 'Date', 'Reference'];
  } else {
    tableColumns = ['Budget', 'Category', 'Amount', 'Date', 'Reference'];
  }

  const resetState = () => {
    setCheckedTransactions({});
    setSelectAll(false);
  };

  const handleCloseModal = () => {
    setCheckedTransactions({});
    setSelectAll(false);
    handleClose();
  };

  const handleCheckTransaction = (category: string, isChecked: boolean) => {
    setCheckedTransactions((prev) => ({
      ...prev,
      [category]: isChecked,
    }));
  };

  const handleSelectAll = (isChecked: boolean) => {
    setSelectAll(isChecked);

    const newCheckedState: Record<string, boolean> = {};
    currentTransactions.forEach((transaction) => {
      if (transaction) {
        newCheckedState[transaction.id.toString()] = isChecked;
      }
    });

    setCheckedTransactions((prev) => ({
      ...prev,
      ...newCheckedState,
    }));
  };

  const handleDeleteSelected = async () => {
    if (!window.confirm(`Are you sure you want to delete ${checkedCount} selected transactions?`)) {
      return;
    }

    const transactionsToDelete = currentTransactions.filter(
      (category) => category && checkedTransactions[category.id.toString()],
    );

    const transactionsToDeleteIds = transactionsToDelete.map((category) => category.id);

    await deleteTransactionHistory({ id: transactionsToDeleteIds });
    handleCloseModal();

    resetState();
  };

  useEffect(() => {
    if (prevTransactionTypeRef.current !== transactionType) {
      setCurrentPage(0);
      prevTransactionTypeRef.current = transactionType;
      resetState();
    }
  }, [transactionType, setCurrentPage]);

  useEffect(() => {
    const allCurrentChecked = currentTransactions.every(
      (transaction) => transaction && checkedTransactions[transaction.id.toString()],
    );
    setSelectAll(currentTransactions.length > 0 && allCurrentChecked);
  }, [currentTransactions, checkedTransactions]);

  return (
    <div className="relative flex flex-col gap-4">
      <div
        className={`items-center justify-between sm:absolute sm:-top-8 sm:right-0 sm:-translate-y-1/2 ${hasCheckedItems ? 'flex' : 'hidden'}`}
      >
        <ButtonDelete onClick={handleDeleteSelected} disabled={!hasCheckedItems}>
          <Icon SvgIcon={TrashIcon} isBorderless />
          <span className="hidden pl-2 font-semibold md:inline">
            Delete {checkedCount} {checkedCount === 1 ? 'item' : 'items'}
          </span>
          <span className="pl-2 font-semibold md:hidden">
            {checkedCount} {checkedCount === 1 ? 'item' : 'items'}
          </span>
        </ButtonDelete>
      </div>

      <table className={`flex flex-col gap-2 border border-accent/10 ${isFetching ? 'animate-pulse' : ''}`}>
        <tbody className="flex w-full flex-col overflow-x-scroll text-sm md:overflow-auto">
          <tr className="grid w-[640px] grid-cols-[30px_repeat(5,1fr)] justify-between bg-accent/5 sm:w-full">
            <th scope="col" className="rounded-xs px-2 py-1">
              <Input
                type="checkbox"
                id="select-all-checkbox"
                name="select-all-checkbox"
                checked={selectAll}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </th>
            {tableColumns?.map((column, index) => (
              <th
                scope="col"
                key={index}
                className="rounded-xs px-2 py-1 not-first:border-l not-first:border-l-accent/10"
              >
                {column}
              </th>
            ))}
          </tr>

          {transactionType === 'income' ? (
            <>
              {currentTransactions.map((transaction) => (
                <IncomeTransaction
                  key={transaction.id}
                  transaction={transaction}
                  checkedTransactions={checkedTransactions}
                  handleCheckTransaction={handleCheckTransaction}
                />
              ))}
            </>
          ) : (
            <>
              {currentTransactions.map((transaction) => (
                <ExpensesTransaction
                  key={transaction.id}
                  transaction={transaction}
                  checkedTransactions={checkedTransactions}
                  handleCheckTransaction={handleCheckTransaction}
                />
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

const IncomeTransaction = React.memo(
  ({ transaction, checkedTransactions, handleCheckTransaction }: TransactionListItemProps) => {
    return (
      <tr
        key={transaction.id}
        className="grid w-[640px] grid-cols-[30px_repeat(5,1fr)] border-b border-b-accent/10 last:border-b-0 sm:w-full"
      >
        <td className="px-2 py-1 text-sm">
          <Input
            type="checkbox"
            id={`transaction-${transaction.id}-checkbox`}
            name={`transaction-${transaction.id}-checkbox`}
            checked={transaction.id ? checkedTransactions[transaction.id.toString()] || false : false}
            onChange={(e) => handleCheckTransaction(transaction?.id.toString() || '', e.target.checked)}
          />
        </td>

        {transaction.type === 'income' && (
          <>
            <td className="border-l border-accent/10 px-2 py-1 text-sm">{transaction.from}</td>
            <td className="border-l border-accent/10 px-2 py-1 text-sm">{transaction.amount}</td>
            <td className="border-l border-accent/10 px-2 py-1 text-sm">
              {transaction.savings ? transaction.savings : '-'}
            </td>
          </>
        )}

        <td className="border-l border-accent/10 px-2 py-1 text-sm">{transaction.transaction_date}</td>
        <td className="border-l border-accent/10 px-2 py-1 text-sm">{transaction.reference}</td>
      </tr>
    );
  },
);

IncomeTransaction.displayName = 'IncomeTransaction';

const ExpensesTransaction = React.memo(
  ({ transaction, checkedTransactions, handleCheckTransaction }: TransactionListItemProps) => {
    return (
      <tr
        key={transaction.id}
        className="grid w-[640px] grid-cols-[30px_repeat(5,1fr)] border-b border-b-accent/10 last:border-b-0 sm:w-full"
      >
        <td className="px-2 py-1 text-sm">
          <Input
            type="checkbox"
            id={`transaction-${transaction.id}-checkbox`}
            name={`transaction-${transaction.id}-checkbox`}
            checked={transaction.id ? checkedTransactions[transaction.id.toString()] || false : false}
            onChange={(e) => handleCheckTransaction(transaction?.id.toString() || '', e.target.checked)}
          />
        </td>
        {transaction.type === 'expenses' && (
          <>
            <td className="border-l border-accent/10 px-2 py-1 text-sm">{transaction.budget}</td>
            <td className="border-l border-accent/10 px-2 py-1 text-sm">{transaction.category}</td>
          </>
        )}
        <td className="border-l border-accent/10 px-2 py-1 text-sm">{transaction.amount}</td>
        <td className="border-l border-accent/10 px-2 py-1 text-sm">{transaction.transaction_date}</td>
        <td className="border-l border-accent/10 px-2 py-1 text-sm">{transaction.reference}</td>
      </tr>
    );
  },
);

ExpensesTransaction.displayName = 'ExpensesTransaction';
