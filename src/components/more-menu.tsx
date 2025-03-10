import React, { useEffect, useRef, useState } from 'react';

import Icon from '@/components/icon';
import EditIcon from '@/images/icons/edit.svg?react';
import MoreHorizontalIcon from '@/images/icons/more-horizontal.svg?react';
import TrashIcon from '@/images/icons/trash.svg?react';

type MoreMenuProps =
  | {
      isEditable: true;
      onEdit: () => void;
      isDeletable: true;
      onDelete: () => void;
      children?: React.ReactNode;
    }
  | {
      isEditable?: false;
      onEdit?: never;
      isDeletable?: false;
      onDelete?: never;
      children?: React.ReactNode;
    };

export default function MoreMenu({ isEditable, onEdit, isDeletable, onDelete, children }: MoreMenuProps) {
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
          className="absolute -right-2 top-6 z-50 flex min-w-28 flex-col gap-2 rounded-md border border-accent/10 bg-card p-2 shadow-md"
          onBlur={handleBlur}
        >
          {isEditable && (
            <MoreMenuEdit
              onEdit={() => {
                setIsOpen(false);
                onEdit();
              }}
            />
          )}

          {isDeletable && (
            <MoreMenuDelete
              onDelete={() => {
                setIsOpen(false);
                onDelete();
              }}
            />
          )}

          {children}
        </div>
      )}
    </div>
  );
}

export const MoreMenuEdit = ({ onEdit }: { onEdit: () => void }) => {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-sm px-2 py-1 text-left hover:bg-accent/10"
      onClick={onEdit}
    >
      <Icon SvgIcon={EditIcon} width={16} height={16} isBorderless />
      Edit
    </button>
  );
};

export const MoreMenuDelete = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-sm px-2 py-1 text-left text-red-500 hover:bg-accent/10 hover:bg-red-500 hover:text-white"
      onClick={onDelete}
    >
      <Icon SvgIcon={TrashIcon} width={16} height={16} isBorderless />
      Delete
    </button>
  );
};
