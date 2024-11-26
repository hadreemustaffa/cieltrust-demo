function AccountOverview({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-auto-fit-sm gap-4 rounded-md border border-accent/10 p-4 text-left">
      {children}
    </div>
  );
}

export default AccountOverview;
