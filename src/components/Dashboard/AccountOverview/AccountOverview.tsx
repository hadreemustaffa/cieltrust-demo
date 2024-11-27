function AccountOverview({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-md border border-accent/10 p-4 text-left md:grid-cols-2 2xl:grid-cols-4">
      {children}
    </div>
  );
}

export default AccountOverview;
