import dayjs from 'dayjs';

import { useBudgetTables } from '@/hooks/use-budget-tables';

export default function UpcomingPayment() {
  const { budgetTables } = useBudgetTables();

  const calculateNextPaymentDate = (startDate: string, recurrence: string) => {
    const currentDate = dayjs();
    let nextDate = dayjs(startDate);

    if (nextDate.isAfter(currentDate)) {
      return nextDate;
    }

    if (recurrence.toLowerCase() === 'monthly') {
      const monthsDiff = currentDate.diff(nextDate, 'month');

      nextDate = nextDate.add(monthsDiff, 'month');

      if (nextDate.isBefore(currentDate)) {
        nextDate = nextDate.add(1, 'month');
      }
    } else if (recurrence.toLowerCase() === 'weekly') {
      const weeksDiff = currentDate.diff(nextDate, 'week');

      nextDate = nextDate.add(weeksDiff, 'week');

      if (nextDate.isBefore(currentDate)) {
        nextDate = nextDate.add(1, 'week');
      }
    }

    return nextDate;
  };

  const totalExpectedPayments = budgetTables.reduce((total, table) => {
    return (
      total +
      table.budget_categories.reduce((categoryTotal, category) => {
        return categoryTotal + parseFloat(category.amount.toString()) - parseFloat(category.spent.toString());
      }, 0)
    );
  }, 0);

  const sortedBudgetTables = [...budgetTables].sort((a, b) => {
    const nextDateA = calculateNextPaymentDate(a.start_date, a.recurrence);
    const nextDateB = calculateNextPaymentDate(b.start_date, b.recurrence);
    return nextDateA.unix() - nextDateB.unix();
  });

  return (
    <div className="col-span-full flex rounded-md border border-accent/10 p-4 xl:col-span-2 xl:col-start-3">
      <div className="flex w-full flex-col gap-4 rounded-md border border-accent/10 bg-surface p-4">
        <h2 className="text-lg font-semibold">Upcoming Payments</h2>
        {budgetTables.length > 0 ? (
          <>
            <div className="flex flex-col items-center justify-center rounded-md border border-accent/10 bg-card p-4 text-center">
              <p className="text-lg font-medium">{totalExpectedPayments < 0 ? '$0.00' : `$${totalExpectedPayments}`}</p>
              <p className="text-sm text-copy/70">Estimated payments for the upcoming month</p>
            </div>

            <ul className="flex flex-col gap-4">
              {sortedBudgetTables.map((budget) => {
                const nextPaymentDate = calculateNextPaymentDate(budget.start_date, budget.recurrence);

                return (
                  <li key={budget.id} className="flex flex-col gap-2 rounded-md border border-accent/10 p-4">
                    <div className="flex flex-col">
                      <p className="font-semibold">{budget.name}</p>
                      <p className="text-sm text-copy/70">
                        {budget.recurrence}, next on {nextPaymentDate.format('DD/MM/YYYY')}
                      </p>
                    </div>

                    {budget.budget_categories.map((category) => (
                      <div
                        key={category.id}
                        className={`flex flex-row items-center justify-between gap-2 ${category.amount - category.spent <= 0 ? 'text-copy/50' : ''}`}
                      >
                        <p>{category.name}</p>
                        <p>{category.amount - category.spent <= 0 ? '0' : category.amount - category.spent}</p>
                      </div>
                    ))}
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <p className="text-sm">You don&apos;t have any upcoming payments scheduled.</p>
        )}
      </div>
    </div>
  );
}
