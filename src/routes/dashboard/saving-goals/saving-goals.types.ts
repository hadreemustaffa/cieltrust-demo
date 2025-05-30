export interface SavingGoal {
  id: number;
  name: string;
  target_amount: number;
  saved_amount: number;
}

export interface AddSavingGoalsFormProps {
  handleModalClose: () => void;
}

export interface EditSavingGoalsFormProps {
  goal: SavingGoal;
  handleModalClose: () => void;
}

export interface SavingGoalsItemProps {
  goal: SavingGoal;
}

export interface AddSavingGoalsFormData {
  dashboard_id: number;
  name: string;
  target_amount: number;
  saved_amount: number;
}

export interface EditSavingGoalsFormData {
  dashboard_id: number;
  id: number;
  name: string;
  target_amount: number;
  saved_amount: number;
}

export interface GetSavingGoal {
  dashboard_id: number;
  id: number;
}

export interface DeleteSavingGoal {
  dashboard_id: number;
  id: number;
}
