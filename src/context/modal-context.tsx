import { ReactNode, useState } from 'react';

import { ModalContext } from '@/hooks/use-modal';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modal: string) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

  return <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>{children}</ModalContext.Provider>;
};
