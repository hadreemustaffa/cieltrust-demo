import { useEffect, useState } from "react";

// icons import
import ChevronDownIcon from "../images/icons/chevron-down.svg?react";

// components import
import Icon from "./Icon";
import useOutsideClick from "../hooks/useOutsideClick";

interface CategoriesProps {
  children: React.ReactNode;
  selectedCategoriesName: string[];
  categoriesSelectedAmount: number;
}

export default function Categories({
  children,
  selectedCategoriesName,
  categoriesSelectedAmount,
}: CategoriesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [categoriesSelected, setCategoriesSelected] = useState(
    categoriesSelectedAmount,
  );

  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  useEffect(() => {
    setCategoriesSelected(categoriesSelectedAmount);
  }, [categoriesSelectedAmount]);

  return (
    <div ref={ref} className="relative flex flex-col gap-2">
      <p className="text-sm">Categories</p>
      <button
        id="budgetCategories"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full flex-row items-center justify-between gap-2 text-nowrap rounded-md border border-accent/10 bg-transparent p-2"
      >
        {categoriesSelected > 0 ? (
          <span className="flex w-fit flex-wrap gap-1">
            {selectedCategoriesName.map((name, index) => {
              if (!name) {
                return null;
              }
              return (
                <span
                  key={index}
                  className="rounded-md border border-accent/10 p-1 text-sm"
                >
                  {name}
                </span>
              );
            })}
          </span>
        ) : (
          "Select Categories"
        )}
        <span
          className={`${isOpen ? "rotate-0" : "-rotate-180"} transition-all`}
        >
          <Icon SvgIcon={ChevronDownIcon} isBorderless />
        </span>
      </button>

      <ul
        className={`absolute left-0 top-[72px] z-50 flex max-h-32 w-full flex-col gap-2 overflow-y-scroll rounded-md border border-accent/10 bg-card p-4 text-sm shadow-md transition-all ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {children}
      </ul>
    </div>
  );
}
