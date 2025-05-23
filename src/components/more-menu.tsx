import React, { useEffect, useRef, useState } from 'react';

import EditIcon from '@/images/icons/edit.svg?react';
import MoreHorizontalIcon from '@/images/icons/more-horizontal.svg?react';
import TrashIcon from '@/images/icons/trash.svg?react';

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
      <button ref={buttonRef} type="button" onClick={() => setIsOpen(!isOpen)}>
        <Icon SvgIcon={MoreHorizontalIcon} width={16} height={16} isBorderless />
      </button>

      {isOpen && (
        <div
          ref={ref}
          className={`absolute z-50 flex min-w-28 gap-2 rounded-md border border-accent/10 bg-card p-1 shadow-md ${variant === 'horizontal' ? 'right-6 top-1/2 -translate-y-1/2 flex-row items-center justify-center' : '-right-2 top-6 flex-col'}`}
          role="menu"
          aria-orientation={variant === 'horizontal' ? 'horizontal' : 'vertical'}
          aria-expanded={isOpen}
          aria-label="More menu"
          onBlur={handleBlur}
        >
          <button
            type="button"
            className="flex items-center gap-2 rounded-sm px-2 py-1 text-left hover:bg-accent/10"
            onClick={onEdit}
          >
            <Icon SvgIcon={EditIcon} width={16} height={16} isBorderless />
            <span className={variant === 'horizontal' ? 'hidden sm:inline' : ''}>Edit</span>
          </button>

          {variant === 'horizontal' && <div className="h-4 w-px bg-accent/10" />}

          <button
            type="button"
            className="flex items-center gap-2 rounded-sm px-2 py-1 text-left text-red-500 hover:bg-accent/10 hover:bg-red-500 hover:text-white"
            onClick={onDelete}
          >
            <Icon SvgIcon={TrashIcon} width={16} height={16} isBorderless />
            <span className={variant === 'horizontal' ? 'hidden sm:inline' : ''}>Delete</span>
          </button>

          {children}
        </div>
      )}
    </div>
  );
}
