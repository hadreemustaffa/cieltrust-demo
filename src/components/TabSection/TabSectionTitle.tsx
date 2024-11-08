import { PropsWithChildren } from "react";

export const TabSectionTitle = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex max-w-[85ch] flex-col gap-4 lg:text-left">
      {children}
    </div>
  );
};
