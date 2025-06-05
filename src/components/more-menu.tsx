import React, { useEffect, useRef, useState } from 'react';

import EditIcon from '@/images/icons/edit.svg?react';
import MoreHorizontalIcon from '@/images/icons/more-horizontal.svg?react';
import TrashIcon from '@/images/icons/trash.svg?react';

import { ButtonTertiary } from '@/components/button';
import Icon from '@/components/icon';

interface MoreMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  variant?: 'vertical' | 'horizontal';
  children?: React.ReactNode;
}

export default function MoreMenu({ onEdit, onDelete, variant = 'vertical', children }: MoreMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.relatedTarget || !ref?.current?.contains(event.relatedTarget) || event.relatedTarget === ref.current) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative flex flex-row items-center" onBlur={handleBlur}>
      <button ref={buttonRef} type="button" className="hover:cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <Icon SvgIcon={MoreHorizontalIcon} width={16} height={16} isBorderless />
      </button>

      {isOpen && (
        <div
          ref={ref}
          className={`border-accent/10 bg-card absolute z-50 flex min-w-28 gap-2 rounded-md border p-1 shadow-md ${variant === 'horizontal' ? 'top-1/2 right-6 -translate-y-1/2 flex-row items-center justify-center' : 'top-6 -right-2 flex-col'}`}
          role="menu"
          aria-orientation={variant === 'horizontal' ? 'horizontal' : 'vertical'}
          aria-expanded={isOpen}
          aria-label="More menu"
          onBlur={handleBlur}
        >
          <ButtonTertiary type="button" className="hover:bg-accent/10 px-2 py-1 hover:no-underline" onClick={onEdit}>
            <Icon SvgIcon={EditIcon} width={16} height={16} isBorderless />
            <span className={variant === 'horizontal' ? 'hidden sm:inline' : ''}>Edit</span>
          </ButtonTertiary>

          {variant === 'horizontal' && <div className="bg-accent/10 h-4 w-px" />}

          <ButtonTertiary
            type="button"
            className="px-2 py-1 text-red-500 hover:bg-red-400/10 hover:no-underline"
            onClick={onDelete}
          >
            <Icon SvgIcon={TrashIcon} width={16} height={16} isBorderless />
            <span className={variant === 'horizontal' ? 'hidden sm:inline' : ''}>Delete</span>
          </ButtonTertiary>

          {children}
        </div>
      )}
    </div>
  );
}
