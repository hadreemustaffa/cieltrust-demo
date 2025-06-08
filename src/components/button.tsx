import React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  to: string;
}

export const ButtonPrimary = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        `bg-brand hover:bg-brand-hover flex items-center justify-center gap-2 rounded-md px-2 py-2 text-white hover:cursor-pointer hover:text-white lg:px-4`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const LinkButtonPrimary = ({ children, to, className, ...props }: LinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        `bg-brand hover:bg-brand-hover flex items-center justify-center gap-2 rounded-md px-2 py-2 text-white hover:cursor-pointer hover:text-white lg:px-4`,
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export const ButtonSecondary = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        `border-accent/30 hover:border-accent-hover/50 hover:text-accent-hover active:bg-accent/10 flex items-center justify-center gap-2 rounded-md border bg-transparent px-2 py-2 whitespace-nowrap hover:cursor-pointer lg:px-4`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const LinkButtonSecondary = ({ children, to, className, ...props }: LinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        `border-accent/30 hover:border-accent-hover/50 hover:text-accent-hover active:bg-accent/10 flex items-center justify-center gap-2 rounded-md border bg-transparent px-2 py-2 whitespace-nowrap hover:cursor-pointer lg:px-4`,
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export const ButtonTertiary = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        `flex items-center justify-center gap-2 rounded-md bg-transparent px-2 py-2 hover:cursor-pointer hover:underline lg:px-4`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const LinkButtonTertiary = ({ children, to, className, ...props }: LinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        `flex items-center gap-2 rounded-md bg-transparent hover:cursor-pointer hover:underline`,
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export const ButtonDelete = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        `flex items-center justify-center gap-2 rounded-md border border-red-800 bg-red-700 px-2 py-2 text-white hover:cursor-pointer hover:bg-red-500 hover:text-white lg:px-4`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
