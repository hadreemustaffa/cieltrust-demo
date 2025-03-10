import { useBudgetTables } from '@/hooks/use-budget-tables';

export default function UpcomingPayment() {
  const { budgetTables } = useBudgetTables();

  const totalExpectedPayments = budgetTables.reduce((total, table) => {
    return (
      total +
      table.budget_categories.reduce((categoryTotal, category) => {
        return categoryTotal + parseFloat(category.amount.toString());
      }, 0)
    );
  }, 0);

  const sortedBudgetTables = [...budgetTables].sort(
    (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
  );

  return (
    <div className="col-span-full flex rounded-md border border-accent/10 p-4 xl:col-span-2">
      <div className="flex w-full flex-col gap-4 rounded-md border border-accent/10 bg-surface p-4">
        <h2 className="text-lg font-semibold">Upcoming Payments</h2>
        {budgetTables.length > 0 ? (
          <>
            <div className="flex flex-col items-center justify-center rounded-md border border-accent/10 bg-card p-4 text-center">
              <p className="text-lg font-medium">${totalExpectedPayments}</p>
              <p className="text-sm text-copy/70">Estimated payments for the upcoming month</p>
            </div>

            <ul className="flex flex-col gap-4">
              {sortedBudgetTables.map((budget) => (
                <li key={budget.id} className="flex flex-col gap-2 rounded-md border border-accent/10 p-4">
                  <div className="flex flex-col">
                    <p className="font-semibold">{budget.name}</p>
                    <p className="text-sm text-copy/70">
                      {budget.recurrence}, next on {new Date(budget.start_date).toLocaleDateString()}
                    </p>
                  </div>

                  {budget.budget_categories.map((category) => (
                    <div key={category.id} className="flex flex-row items-center justify-between gap-2">
                      <p>{category.name}</p>
                      <p>${category.amount}</p>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-sm">You don&apos;t have any upcoming payments scheduled.</p>
        )}
      </div>
    </div>
  );
}
