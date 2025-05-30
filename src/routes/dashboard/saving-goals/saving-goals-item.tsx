import { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';

import XIcon from '@/images/icons/x.svg?react';

import { useAppSelector } from '@/hooks/use-redux';

import { ButtonDelete, ButtonSecondary } from '@/components/button';
import Icon from '@/components/icon';
import Modal from '@/components/modal/modal';
import MoreMenu from '@/components/more-menu';
import { useDeleteSavingGoalMutation } from '@/routes/dashboard/api.slice';
import { getDashboardId } from '@/routes/dashboard/dashboard.slice';
import { EditSavingGoalsForm } from '@/routes/dashboard/saving-goals/saving-goals-form';
import { SavingGoalsItemProps } from '@/routes/dashboard/saving-goals/saving-goals.types';

export default function SavingGoalsItem({ goal }: SavingGoalsItemProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const dashboardId = useAppSelector(getDashboardId);
  const [deleteSavingGoal, { isLoading, isSuccess }] = useDeleteSavingGoalMutation();

  const savedAmountPercentage = Math.round((goal.saved_amount / goal.target_amount) * 100);
  const isComplete = goal.saved_amount >= goal.target_amount;

  const handleDelete = async () => {
    try {
      await deleteSavingGoal({
        dashboard_id: dashboardId,
        id: goal.id,
      }).unwrap();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    if (isSuccess) {
      handleModalClose();
    }
  }, [isSuccess]);

  return (
    <li className="relative flex flex-row items-center justify-between gap-2 rounded-md border border-accent/10 p-2">
      <p className="flex flex-row items-center gap-2 pl-4 before:absolute before:left-2 before:top-1/2 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-md before:bg-brand before:content-['']">
        {goal.name}
        <span className="text-xs text-copy/30">
          ({goal.saved_amount !== null ? goal.saved_amount : 0}/{goal.target_amount})
        </span>
      </p>
      <div className="flex flex-row items-center gap-4">
        <p className={`${isComplete && 'text-green-500'} font-semibold`}>{savedAmountPercentage}%</p>

        {isComplete ? (
          <button type="button" onClick={() => setActiveModal(`deleteGoalModal-${goal.id}`)}>
            <Icon SvgIcon={XIcon} width={16} height={16} isBorderless />
          </button>
        ) : (
          <MoreMenu
            variant="horizontal"
            onEdit={() => setActiveModal(`editGoalModal-${goal.id}`)}
            onDelete={() => setActiveModal(`deleteGoalModal-${goal.id}`)}
          />
        )}
      </div>

      <Modal
        id={`editGoalModal-${goal.id}`}
        title="Edit this goal?"
        isOpen={activeModal === `editGoalModal-${goal.id}`}
        handleClose={handleModalClose}
      >
        <EditSavingGoalsForm goal={goal} handleModalClose={handleModalClose} />
      </Modal>

      <Modal
        id={`deleteGoalModal-${goal.id}`}
        title="Delete this goal?"
        isOpen={activeModal === `deleteGoalModal-${goal.id}`}
        handleClose={handleModalClose}
      >
        <div className="flex flex-col gap-2">
          <p>Are you sure you want to delete this goal?</p>
          <p className="font-semibold">{goal.name}</p>
        </div>

        <div className="flex flex-row items-center justify-end gap-2">
          <ButtonSecondary type="button" onClick={handleModalClose}>
            Cancel
          </ButtonSecondary>

          <div className="flex flex-row items-center justify-end gap-2 disabled:opacity-50">
            <ButtonDelete
              type="button"
              className={isLoading ? 'opacity-50' : ''}
              onClick={handleDelete}
              disabled={isLoading}
            >
              <MoonLoader loading={isLoading} size={16} color="#fff" />
              <span className="ml-2">{`${isLoading ? 'Deleting' : 'Delete'}`} Goal</span>
            </ButtonDelete>
          </div>
        </div>
      </Modal>
    </li>
  );
}
