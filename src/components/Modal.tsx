import { useEffect } from "react";

// icons import
import XIcon from "../images/icons/x.svg?react";

// components import
import { ButtonPrimary, ButtonSecondary } from "./Button";
import Icon from "./Icon";

type ModalProps =
  | {
      title: string;
      isOpen: boolean;
      children: React.ReactNode;
      closeModalFn: () => void;
      isFormModal?: true;
      formId: string;
      submitButtonText: string;
      onDelete?: never;
    }
  | {
      title: string;
      isOpen: boolean;
      children: React.ReactNode;
      closeModalFn: () => void;
      isFormModal: false;
      formId?: never;
      submitButtonText?: never;
      onDelete: () => void;
    };

function Modal({
  title,
  isOpen,
  children,
  closeModalFn,
  isFormModal,
  formId,
  submitButtonText,
  onDelete,
}: ModalProps) {
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
    <div
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-background/90 p-4"
    >
      <div className="flex w-full max-w-lg flex-col gap-6 rounded-md border border-accent/10 bg-card p-4">
        <div className="flex flex-row items-center justify-between gap-2">
          <h2 id="modal-title" className="text-lg font-semibold">
            {title}
          </h2>

          <ButtonSecondary type="button" onClick={closeModalFn}>
            <Icon SvgIcon={XIcon} isBorderless />
          </ButtonSecondary>
        </div>

        {children}

        <div className="flex flex-row items-center justify-end gap-2">
          <ButtonSecondary type="button" onClick={closeModalFn}>
            Cancel
          </ButtonSecondary>

          {isFormModal ? (
            <ButtonPrimary type="submit" form={formId}>
              {submitButtonText}
            </ButtonPrimary>
          ) : (
            <button
              type="button"
              className="w-fit rounded-md bg-red-700 px-6 py-3 text-white hover:bg-red-500"
              onClick={onDelete}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
