import { MonthInWeeks, SevenDays } from "../..";
import { MonthCalendarEventSpan } from "../events/month-events.types";
import { UseMonthCalendarReturn } from "./month-calendar.types";

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

export const getEventSpanProperties = (
  event: MonthCalendarEventSpan,
  weeks: SevenDays[]
) => {
  return {
    // The same as month, but top and bottom are zero
    topOffset: 0,
    bottomOffset: 0,
    leftOffset: (event.coords.start.value / weeks[0].length) * 100,
    rightOffset:
      ((weeks[0].length - event.coords.start.value) / weeks[0].length) * 100,
    spanSizePct:
      ((event.coords.end.value - event.coords.start.value) / weeks[0].length) *
      100,
  };
};
