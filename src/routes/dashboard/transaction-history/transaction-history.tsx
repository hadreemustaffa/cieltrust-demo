import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ButtonDelete, ButtonSecondary } from '@/components/button';
import { Input } from '@/components/forms/custom_form';
import Icon from '@/components/icon';
import Modal from '@/components/modal';
import { useModal } from '@/hooks/use-modal';
import ClockIcon from '@/images/icons/clock.svg?react';
import {
  deleteTransactionHistory,
  getTransactionHistory,
} from '@/routes/dashboard/transaction-history/transaction-history.api';
import { Transaction, TransactionHistoryProps } from '@/routes/dashboard/transaction-history/transaction-history.types';

export default function TransactionHistory({ data }: TransactionHistoryProps) {
  const [transactionType, setTransactionType] = useState('income');
  const [history, setHistory] = useState<Transaction[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const prevTransactionTypeRef = useRef(transactionType);
  const itemsPerPage = 10;

  const { activeModal, openModal, closeModal } = useModal();

  const {
    register,
    getValues,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm();

  let tableColumns;
  if (transactionType === 'income') {
    tableColumns = ['From', 'Amount', 'Date', 'Reference'];
  } else {
    tableColumns = ['Budget', 'Category', 'Amount', 'Date', 'Reference'];
  }

  const incomeTransactions = history.filter((transaction) => transaction.type === 'income');
  const expensesTransactions = history.filter((transaction) => transaction.type === 'expenses');

  const currentTransactions = useMemo(
    () => (transactionType === 'income' ? incomeTransactions : expensesTransactions),
    [transactionType, incomeTransactions, expensesTransactions],
  );
  const paginatedTransactions = useMemo(
    () => currentTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [currentTransactions, currentPage],
  );

  const startItem = currentTransactions.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, currentTransactions.length);
  const totalPages = Math.ceil(currentTransactions.length / itemsPerPage);

  const checkboxNames = useMemo(
    () => paginatedTransactions.map((t) => `historyCheckbox-${t.id}`),
    [paginatedTransactions],
  );
  const watchedValues = watch(checkboxNames);
  const allChecked = useMemo(
    () => checkboxNames.length > 0 && (watchedValues || []).every(Boolean),
    [checkboxNames, watchedValues],
  );

  const handleCheckAllCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    paginatedTransactions.forEach((transaction) => {
      setValue(`historyCheckbox-${transaction.id}`, checked);
    });
  };

  const onSubmit: SubmitHandler<{ [key: string]: boolean }> = async () => {
    const getSelectedIds = () => {
      const values = getValues();
      return Object.entries(values)
        .filter(([key, value]) => key.startsWith('historyCheckbox-') && value)
        .map(([key]) => key.replace('historyCheckbox-', ''));
    };

    await deleteTransactionHistory({
      id: getSelectedIds(),
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      closeModal();
    }
  }, [closeModal, isSubmitSuccessful]);

  useEffect(() => {
    if (prevTransactionTypeRef.current !== transactionType) {
      setCurrentPage(1);
      prevTransactionTypeRef.current = transactionType;
      return;
    }

    if (paginatedTransactions.length === 0 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [transactionType, currentPage, paginatedTransactions.length]);

  useEffect(() => {
    if (activeModal !== 'viewTransactionHistory') return;

    const fetchData = async () => {
      await getTransactionHistory({
        setState: setHistory,
      });
    };

    fetchData();

    return () => {
      reset();
      setTransactionType('income');
    };
  }, [activeModal, reset]);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setTransactionType(e.target.value);

  return (
    <>
      <ButtonSecondary onClick={() => openModal('viewTransactionHistory')} className="gap-2">
        <Icon SvgIcon={ClockIcon} isBorderless />
        <span className="hidden sm:inline">View Transaction History</span>
      </ButtonSecondary>

      {activeModal === 'viewTransactionHistory' && (
        <Modal
          id="viewTransactionHistoryModal"
          title="Transaction History"
          isOpen={activeModal === 'viewTransactionHistory'}
          handleClose={closeModal}
          className="max-h-[80vh] max-w-3xl overflow-y-auto"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-row flex-wrap justify-between gap-2">
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

              {watchedValues.filter(Boolean).length > 0 && <ButtonDelete type="submit">Delete Selected</ButtonDelete>}
            </div>

            {history.length > 0 ? (
              <>
                <table className="flex flex-col gap-2 border border-accent/10">
                  <tbody className="flex w-full flex-col overflow-x-scroll text-sm md:overflow-auto">
                    <tr
                      className={`grid w-[640px] justify-between bg-accent/5 sm:w-full ${
                        transactionType === 'income'
                          ? 'grid-cols-[30px_repeat(4,_1fr)]'
                          : 'grid-cols-[30px_repeat(5,_1fr)]'
                      }`}
                    >
                      <th scope="col" className="rounded-sm px-2 py-1">
                        <Input
                          type="checkbox"
                          name="historyCheckbox-all"
                          id="historyCheckbox-all"
                          checked={allChecked}
                          onChange={handleCheckAllCheckbox}
                        />
                      </th>
                      {tableColumns?.map((column, index) => (
                        <th
                          scope="col"
                          key={index}
                          className="rounded-sm px-2 py-1 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-l-accent/10"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>

                    {transactionType === 'income' &&
                      paginatedTransactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="grid w-[640px] grid-cols-[30px_repeat(4,_1fr)] border-b border-b-accent/10 last:border-b-0 sm:w-full"
                        >
                          <td className="px-2 py-1 text-sm">
                            <Input
                              id={`checkbox-${transaction.id}`}
                              type="checkbox"
                              {...register(`historyCheckbox-${transaction.id}`)}
                            />
                          </td>
                          <td className="border-l border-accent/10 px-2 py-1 text-sm">{transaction.from_source}</td>
                          <td className="border-l border-accent/10 px-2 py-1 text-sm">{transaction.amount}</td>
                          <td className="border-l border-accent/10 px-2 py-1 text-sm">
                            {transaction.transaction_date}
                          </td>
                          <td className="border-l border-accent/10 px-2 py-1 text-sm">{transaction.reference}</td>
                        </tr>
                      ))}

                    {transactionType === 'expenses' &&
                      paginatedTransactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="grid w-[640px] grid-cols-[30px_repeat(5,_1fr)] border-b border-b-accent/10 last:border-b-0 sm:w-full"
                        >
                          <td className="px-2 py-1 text-sm">
                            <Input
                              id={`checkbox-${transaction.id}`}
                              type="checkbox"
                              {...register(`historyCheckbox-${transaction.id}`)}
                            />
                          </td>
                          <td className="border-l border-accent/10 px-2 py-1 text-sm">{transaction.budget}</td>
                          <td className="border-l border-accent/10 px-2 py-1 text-sm">{transaction.category}</td>
                          <td className="border-l border-accent/10 px-2 py-1 text-sm">{transaction.amount}</td>
                          <td className="border-l border-accent/10 px-2 py-1 text-sm">
                            {transaction.transaction_date}
                          </td>
                          <td className="border-l border-accent/10 px-2 py-1 text-sm">{transaction.reference}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <div className="flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={handlePrevPage}
                    className="rounded-md border border-accent/10 p-1 hover:cursor-pointer hover:border-accent/50 disabled:cursor-default disabled:border-accent/10 disabled:opacity-50"
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>
                    {currentTransactions.length > 0
                      ? `Showing ${startItem} - ${endItem} of ${currentTransactions.length} transactions`
                      : 'No transactions found'}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextPage}
                    className="rounded-md border border-accent/10 p-1 hover:cursor-pointer hover:border-accent/50 disabled:cursor-default disabled:border-accent/10 disabled:opacity-50"
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center">No transaction history found.</p>
            )}
          </form>
        </Modal>
      )}
    </>
  );
}
