import { useState } from "react";

type ActiveModal = "add" | "edit" | "delete" | "addNewCategory";

export default function useModal() {
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);

  const openModal = (modal: ActiveModal) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

  return { activeModal, openModal, closeModal };
}
