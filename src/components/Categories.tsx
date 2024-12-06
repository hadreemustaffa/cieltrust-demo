import { useState } from "react";

// icons import
import ChevronDownIcon from "../images/icons/chevron-down.svg?react";

// components import
import Icon from "./Icon";
import useOutsideClick from "../hooks/useOutsideClick";

interface CategoriesProps {
  children: React.ReactNode;
}

export default function Categories({ children }: CategoriesProps) {
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
        Select Categories
        <span
          className={`${isOpen ? "rotate-0" : "-rotate-180"} transition-all`}
        >
          <Icon SvgIcon={ChevronDownIcon} isBorderless />
        </span>
      </button>

      <ul
        className={`absolute left-0 top-20 z-50 flex w-full flex-col gap-2 rounded-md border border-accent/10 bg-background p-4 text-sm shadow-md transition-all ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {children}
      </ul>
    </div>
  );
}
