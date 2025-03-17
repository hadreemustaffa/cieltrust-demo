import { useEffect, useState } from 'react';

import { ButtonSecondary } from '@/components/button';
import Icon from '@/components/icon';
import Modal from '@/components/modal';
import { useModal } from '@/hooks/use-modal';
import ClockIcon from '@/images/icons/clock.svg?react';
import { Transaction } from '@/routes/dashboard/transaction-history/transaction-history.types';
import { formatStr } from '@/utils/formatStr';
import supabase from '@/utils/supabase';

export default function TransactionHistory() {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedHistory = history.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(history.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, history.length);

  const { activeModal, openModal, closeModal } = useModal();

  useEffect(() => {
    if (paginatedHistory.length === 0 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage, paginatedHistory.length]);

  useEffect(() => {
    const getTransactionHistory = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('transaction_date', { ascending: false });

      if (data) {
        setHistory(data);
      }

      if (error) {
        console.error('Error fetching transaction history:', error);
      }
    };

    if (activeModal === 'viewTransactionHistory') {
      getTransactionHistory();
    }
  }, [activeModal]);

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
        >
          {history.length > 0 ? (
            <>
              <table className="flex flex-col gap-2">
                <tbody className="flex w-full flex-col gap-4 overflow-x-scroll text-sm md:overflow-auto">
                  <tr className="grid grid-cols-6 justify-between sm:w-full">
                    <th scope="col" className="rounded-sm border border-accent/10 px-2 py-1">
                      Type
                    </th>
                    <th scope="col" className="rounded-sm border border-accent/10 px-2 py-1">
                      From
                    </th>
                    <th scope="col" className="rounded-sm border border-accent/10 px-2 py-1">
                      Budget
                    </th>
                    <th scope="col" className="rounded-sm border border-accent/10 px-2 py-1">
                      Category
                    </th>
                    <th scope="col" className="rounded-sm border border-accent/10 px-2 py-1">
                      Amount
                    </th>
                    <th scope="col" className="rounded-sm border border-accent/10 px-2 py-1">
                      Date
                    </th>
                  </tr>
                  {paginatedHistory.map((transaction: Transaction) => (
                    <tr
                      key={transaction.id}
                      className="flex flex-row justify-between gap-2 rounded-md border border-accent/10 px-2 py-1"
                    >
                      <th scope="row">{formatStr(transaction.type)}</th>
                      <td className="text-sm">{transaction.from ? transaction.from : 'N/A'}</td>
                      <td className="text-sm">{transaction.budget ? transaction.budget : 'N/A'}</td>
                      <td className="text-sm">{transaction.category ? transaction.category : 'N/A'}</td>
                      <td className="text-sm">{transaction.amount}</td>
                      <td className="text-sm">{transaction.transaction_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between text-xs">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="rounded-md border border-accent/10 p-1 hover:cursor-pointer hover:border-accent/50 disabled:cursor-default disabled:border-accent/10 disabled:opacity-50"
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Showing {startItem} - {endItem} of {history.length} transactions
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="rounded-md border border-accent/10 p-1 hover:cursor-pointer hover:border-accent/50 disabled:cursor-default disabled:border-accent/10 disabled:opacity-50"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p className="text-center">No transaction history found.</p>
          )}
        </Modal>
      )}
    </>
  );
}
