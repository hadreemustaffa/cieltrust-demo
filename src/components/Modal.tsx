import { useEffect } from "react";

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({ title, isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.getElementById("goalName")?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.removeAttribute("style");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-background/90 p-4">
      <div className="flex w-full max-w-lg flex-col gap-6 rounded-md border border-accent/10 bg-card p-4">
        <h2 className="text-lg font-semibold">{title}</h2>

        {children}
      </div>
    </div>
  );
}

export default Modal;
