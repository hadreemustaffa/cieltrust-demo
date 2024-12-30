export interface SavingGoalsFormProps {
  id: number;
  name: string;
  target_amount: number;
  saved_amount: number;
}

export interface SavingGoals {
  id: number;
  name: string;
  target_amount: number;
  saved_amount: number;
}

export interface SavingGoalsProps {
  data: SavingGoals[];
}

export interface SavingGoalsItemProps {
  id: number;
  name: string;
  targetAmount: number;
  savedAmount: number;
  onDelete: () => void;
  onEditSuccess: (data: SavingGoalsFormProps) => void;
}

export interface EditGoalFormProps {
  name: string;
  target_amount: number;
  saved_amount: number;
}
