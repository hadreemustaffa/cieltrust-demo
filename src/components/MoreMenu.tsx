import { useEffect, useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

// icons import
import MoreHorizontalIcon from "../images/icons/more-horizontal.svg?react";

// components import
import Icon from "./Icon";

type MoreMenuProps =
  | {
      onEdit: () => void;
      isDeletable: true;
      onDelete: () => void;
    }
  | {
      onEdit: () => void;
      isDeletable?: false;
      onDelete?: never;
    };

export default function MoreMenu({
  onEdit,
  isDeletable,
  onDelete,
}: MoreMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      !event.relatedTarget ||
      !ref?.current?.contains(event.relatedTarget) ||
      event.relatedTarget === ref.current
    ) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative flex flex-row items-center" onBlur={handleBlur}>
      <button ref={buttonRef} type="button" onClick={() => setIsOpen(!isOpen)}>
        <Icon
          SvgIcon={MoreHorizontalIcon}
          width={16}
          height={16}
          isBorderless
        />
      </button>

      {isOpen && (
        <div
          ref={ref}
          className="absolute -right-2 top-6 z-50 flex flex-col gap-2 rounded-md border border-accent/10 bg-card py-4 shadow-md after:absolute after:-top-[10px] after:right-[10px] after:h-0 after:w-0 after:border-b-[10px] after:border-l-[6px] after:border-r-[6px] after:border-b-copy after:border-l-transparent after:border-r-transparent after:content-['']"
          onBlur={(event: React.FocusEvent) => {
            if (
              !event.relatedTarget ||
              !ref?.current?.contains(event.relatedTarget) ||
              event.relatedTarget === ref.current
            ) {
              setIsOpen(false);
            }
          }}
        >
          <button
            type="button"
            className="px-6 text-left hover:bg-accent/10"
            onClick={() => {
              setIsOpen(false);
              onEdit();
            }}
          >
            Edit
          </button>

          {isDeletable && (
            <button
              type="button"
              className="px-6 text-left hover:bg-accent/10"
              onClick={() => {
                setIsOpen(false);
                onDelete();
              }}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
