import { MonthInWeeks, SevenDays } from "src/types/calendar.types";

export const splitMonthIntoWeeks = (days: Date[]): MonthInWeeks => {
  const weeks: Date[][] = [];

  for (const i in days) {
    const index = Number(i);
    const weekNum = Math.floor(index / 7) + 1;
    const week = weeks[weekNum - 1] ?? [];
    week.push(days[index]);
    weeks[weekNum - 1] = week;
  }

  return weeks as MonthInWeeks;
};