export const ButtonPrimary = ({ children, isMobileOnly, ...props }) => {
  return (
    <button
      type="button"
      className={`rounded-md bg-brand px-6 py-3 text-accent hover:cursor-pointer hover:bg-brand-hover ${isMobileOnly ? "sm:hidden" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonSecondary = ({ children, ...props }) => {
  return (
    <button
      className="rounded-md border border-surface bg-transparent px-6 py-3 text-accent hover:cursor-pointer hover:bg-brand-hover"
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonMenuToggle = ({ children, isMobileOnly, ...props }) => {
  return (
    <button
      type="button"
      className={`absolute -top-10 right-0 z-50 translate-y-1/2 transform rounded-md bg-brand px-4 py-2 text-accent hover:cursor-pointer hover:bg-brand-hover ${isMobileOnly ? "md:hidden" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
