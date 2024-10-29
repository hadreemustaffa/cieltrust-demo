import { Link } from "react-router-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isMobileOnly?: boolean;
  isFullWidth?: boolean;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  to: string;
  isMobileOnly?: boolean;
  isFullWidth?: boolean;
}

export const ButtonPrimary = ({
  children,
  isMobileOnly,
  isFullWidth,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`flex items-center justify-center rounded-md bg-brand px-6 py-3 text-white hover:cursor-pointer hover:bg-brand-hover hover:text-white ${isMobileOnly ? "md:hidden" : ""} ${isFullWidth ? "w-full" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const LinkButtonPrimary = ({
  children,
  isMobileOnly,
  isFullWidth,
  to,
  ...props
}: LinkProps) => {
  return (
    <Link
      to={to}
      className={`flex items-center justify-center rounded-md bg-brand px-6 py-3 text-white hover:cursor-pointer hover:bg-brand-hover hover:text-white ${isMobileOnly ? "md:hidden" : ""} ${isFullWidth ? "w-full" : ""}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export const ButtonSecondary = ({
  children,
  isMobileOnly,
  isFullWidth,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`flex h-fit items-center justify-center whitespace-nowrap rounded-md border border-accent/30 bg-transparent px-6 py-3 hover:cursor-pointer hover:border-accent-hover/50 hover:text-accent-hover active:bg-accent/10 ${isMobileOnly ? "md:hidden" : ""} ${isFullWidth ? "w-full" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const LinkButtonSecondary = ({
  children,
  isMobileOnly,
  isFullWidth,
  to,
  ...props
}: LinkProps) => {
  return (
    <Link
      to={to}
      className={`flex items-center justify-center whitespace-nowrap rounded-md border border-accent/30 bg-transparent px-6 py-3 hover:cursor-pointer hover:border-accent-hover/50 hover:text-accent-hover active:bg-accent/10 ${isMobileOnly ? "md:hidden" : ""} ${isFullWidth ? "w-full" : ""}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export const ButtonTertiary = ({
  children,
  isMobileOnly,
  isFullWidth,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center rounded-md bg-transparent px-6 py-3 hover:cursor-pointer hover:underline ${isMobileOnly ? "md:hidden" : ""} ${isFullWidth ? "w-full" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const LinkButtonTertiary = ({
  children,
  isMobileOnly,
  isFullWidth,
  to,
  ...props
}: LinkProps) => {
  return (
    <Link
      to={to}
      className={`flex items-center justify-center rounded-md bg-transparent px-6 py-3 hover:cursor-pointer hover:text-copy ${isMobileOnly ? "md:hidden" : ""} ${isFullWidth ? "w-full" : ""}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export const ButtonMenuToggle = ({
  children,
  isMobileOnly,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`absolute -top-10 right-0 z-50 translate-y-1/2 transform rounded-md bg-brand px-4 py-2 hover:cursor-pointer hover:bg-brand-hover ${isMobileOnly ? "lg:hidden" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
