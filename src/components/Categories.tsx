import { useEffect, useState } from "react";

import useOutsideClick from "../hooks/useOutsideClick";

// icons import
import ChevronDownIcon from "../images/icons/chevron-down.svg?react";

// components import
import Icon from "./Icon";

interface CategoriesProps {
  children: React.ReactNode;
  selectedCategories: string[];
  handleNewCategoryModal: () => void;
}

export default function Categories({
  children,
  selectedCategories,
  handleNewCategoryModal,
}: CategoriesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [categoriesSelectedAmount, setCategoriesSelectedAmount] = useState(
    selectedCategories.length,
  );

  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  useEffect(() => {
    setCategoriesSelectedAmount(selectedCategories.length);
  }, [selectedCategories.length]);

  return (
    <div ref={ref} className="relative flex flex-col gap-2">
      <p className="text-sm">Categories</p>
      <button
        id="budgetCategories"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full flex-row items-center justify-between gap-2 text-nowrap rounded-md border border-accent/10 bg-transparent p-2"
      >
        {categoriesSelectedAmount > 0 ? (
          <span className="flex w-fit flex-wrap gap-1">
            {selectedCategories.map((name, index) => {
              if (!name) {
                return null;
              }
              return (
                <span
                  key={index}
                  className="rounded-md border border-accent/10 p-1"
                >
                  {name}
                </span>
              );
            })}
          </span>
        ) : (
          <span className="border border-transparent py-1">
            Select Categories
          </span>
        )}

        <Icon SvgIcon={ChevronDownIcon} isBorderless />
      </button>

      <ul
        className={`absolute -bottom-[129px] left-0 z-50 flex max-h-32 w-full flex-col gap-2 overflow-y-scroll rounded-md border border-accent/10 bg-card p-4 text-sm shadow-md ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {children}

        <div className="flex flex-wrap gap-2 rounded-md border border-accent/10 p-2 text-xs">
          <p>Can't find the category you're looking for?</p>
          <button
            type="button"
            className="underline hover:text-copy-secondary"
            onClick={handleNewCategoryModal}
          >
            Create a new one
          </button>
        </div>
      </ul>
    </div>
  );
}
