import { ButtonPrimary } from '@/components/button';
import Icon from '@/components/icon';
import Modal from '@/components/modal';
import { useModal } from '@/hooks/use-modal';
import PlusIcon from '@/images/icons/plus.svg?react';
import AddTransactionForm from '@/routes/dashboard/add-transaction/add-transaction-form';

export default function AddTransaction() {
  const { activeModal, openModal, closeModal } = useModal();

  return (
    <>
      <ButtonPrimary onClick={() => openModal('addTransaction')} className="gap-2">
        <Icon SvgIcon={PlusIcon} isBorderless />
        <span className="hidden sm:inline">Add Transaction</span>
      </ButtonPrimary>

      {activeModal === 'addTransaction' && (
        <Modal
          id="addTransactionModal"
          title="Add Transaction"
          isOpen={activeModal === 'addTransaction'}
          handleClose={closeModal}
        >
          <AddTransactionForm />
        </Modal>
      )}
    </>
  );
}
