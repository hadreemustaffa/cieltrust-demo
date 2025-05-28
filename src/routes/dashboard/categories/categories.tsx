import React, { useState } from 'react';

import ChevronDownIcon from '@/images/icons/chevron-down.svg?react';

import useOutsideClick from '@/hooks/use-outside-click';

import Icon from '@/components/icon';

interface CategoriesProps {
  children: React.ReactNode;
  selectedCategories: number[];
  handleNewCategoryModal: () => void;
}

function Categories({ children, selectedCategories, handleNewCategoryModal }: CategoriesProps) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div ref={ref} className="relative flex flex-col gap-2">
      <p className="text-sm">Categories</p>
      <button
        id="budgetCategories"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full flex-row items-center justify-between gap-2 text-nowrap rounded-md border border-accent/10 bg-transparent p-2"
      >
        {selectedCategories.length > 0 ? (
          <span>{selectedCategories.length} selected</span>
        ) : (
          <span>Select Categories</span>
        )}

        <Icon SvgIcon={ChevronDownIcon} isBorderless />
      </button>

      <ul
        className={`absolute left-0 top-full z-50 flex max-h-32 w-full flex-col gap-2 overflow-y-auto rounded-md border border-accent/10 bg-card p-4 text-sm shadow-md ${isOpen ? '' : 'invisible'}`}
      >
        {children}

        <div className="flex flex-wrap gap-2 rounded-md border border-accent/10 p-2 text-xs">
          <p>Can&apos;t find the category you&apos;re looking for?</p>
          <button type="button" className="underline hover:text-copy-secondary" onClick={handleNewCategoryModal}>
            Create a new one
          </button>
        </div>
      </ul>
    </div>
  );
}

export default React.memo(Categories);
