import React, { useEffect, useRef } from 'react';
import { MoonLoader } from 'react-spinners';

import AlertCircleIcon from '@/images/icons/alert-circle.svg?react';
import XIcon from '@/images/icons/x.svg?react';

import { cn } from '@/utils/cn';

import { ButtonSecondary } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import Icon from '@/components/icon';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  isOpen: boolean;
  children: React.ReactNode;
  handleClose: () => void;
}

interface ModalErrorProps extends Pick<ModalProps, 'isOpen' | 'handleClose'> {
  error: string;
}

export default function Modal({ title, isOpen, children, handleClose, className }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.removeAttribute('style');
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    const handleFocusOutsideClick = (event: FocusEvent) => {
      console.log(event.target);
      if (
        modalRef.current &&
        event.relatedTarget instanceof HTMLElement &&
        !modalRef.current.contains(event.relatedTarget)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mouseup', handleOutsideClick);
      document.addEventListener('focusout', handleFocusOutsideClick);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mouseup', handleOutsideClick);
      document.removeEventListener('focusout', handleFocusOutsideClick);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="bg-background/90 fixed inset-0 z-50 flex h-full w-full items-center justify-center p-4">
      <div
        ref={modalRef}
        role="dialog"
        aria-labelledby="modal-title"
        className={cn('border-accent/10 bg-card flex w-full max-w-lg flex-col gap-6 rounded-md border p-4', className)}
      >
        <div className="flex flex-row items-center justify-between gap-2">
          <h2 id="modal-title" className="text-lg font-semibold">
            {title}
          </h2>

          <ButtonSecondary type="button" onClick={handleClose}>
            <Icon SvgIcon={XIcon} isBorderless />
          </ButtonSecondary>
        </div>

        {children}
      </div>
    </div>
  );
}

export const ModalLoading = ({ isOpen, handleClose }: Pick<ModalProps, 'isOpen' | 'handleClose'>) => {
  return (
    <Modal id="loadingModal" title="" isOpen={isOpen} handleClose={handleClose}>
      <div className="h-[300px] content-center self-center">
        <MoonLoader color="hsla(210, 96%, 40%, 1)" />
      </div>
    </Modal>
  );
};

export const ModalError = ({ isOpen, handleClose, error }: ModalErrorProps) => {
  return (
    <Modal id="errorModal" title="" isOpen={isOpen} handleClose={handleClose}>
      <div className="border-accent/10 flex h-[300px] flex-col items-center justify-center gap-4 rounded-md border">
        <Icon SvgIcon={AlertCircleIcon} width={64} height={64} isBorderless />
        <h2 className="text-lg font-semibold">Something went wrong</h2>
        <ErrorMessage error={error} />
      </div>
    </Modal>
  );
};
