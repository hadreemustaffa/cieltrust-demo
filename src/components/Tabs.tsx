interface TabsProps {
  children: React.ReactNode;
  isColumn?: boolean;
}

export default function Tabs({ children, isColumn }: TabsProps) {
  return (
    <div
      className={`aria-selected:bg-brand-2 flex justify-center gap-4 rounded-md border border-accent/10 px-4 py-2 ${isColumn ? "flex-col md:flex-row" : "flex-row"}`}
      role="tablist"
    >
      {children}
    </div>
  );
}
