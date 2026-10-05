const now = new Date();

export interface IDueDateRange {
  from: Date;
  to: Date;
}

export const getToday = (): IDueDateRange => {
  const todayFrom = new Date(now);
  todayFrom.setHours(0, 0, 0, 0);

  const todayTo = new Date(now);
  todayTo.setHours(23, 59, 59, 999);

  return { from: todayFrom, to: todayTo };
};

export const getNextDays = (date: Date, days: number): IDueDateRange => {
  const nextDaysFrom = new Date(date);
  nextDaysFrom.setHours(0, 0, 0, 0);

  const nextDaysTo = new Date(date);
  nextDaysTo.setDate(nextDaysTo.getDate() + days);
  nextDaysTo.setHours(23, 59, 59, 999);

  return { from: nextDaysFrom, to: nextDaysTo };
};

export const getMonth = (): IDueDateRange => {
  const monthFrom = new Date(now.getFullYear(), now.getMonth(), 1);

  const monthTo = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  monthTo.setHours(23, 59, 59, 999);

  return { from: monthFrom, to: monthTo };
};
