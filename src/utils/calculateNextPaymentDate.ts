import dayjs from 'dayjs';

export const calculateNextPaymentDate = (startDate: string, recurrence: string) => {
  const currentDate = dayjs();

  if (startDate === '') {
    return currentDate;
  }

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
