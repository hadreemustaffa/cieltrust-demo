import { useState } from 'react';

import PlusIcon from '@/images/icons/plus.svg?react';

import { ButtonPrimary } from '@/components/button';
import Icon from '@/components/icon';
import Modal from '@/components/modal/modal';
import AddTransactionForm from '@/routes/dashboard/add-transaction/add-transaction-form';

export default function AddTransaction() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ButtonPrimary onClick={() => setIsModalOpen(true)} className="gap-2">
        <Icon SvgIcon={PlusIcon} isBorderless />
        <span className="hidden md:inline">Add Transaction</span>
      </ButtonPrimary>

      {isModalOpen && (
        <Modal
          id="addTransactionModal"
          title="Add Transaction"
          isOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
        >
          <AddTransactionForm handleModalClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}
