import type { DateAdapter } from "@calendar/date-adapter";
import {
  CalendarEventInput,
  CalendarEventSpanBase,
  CalendarEventSpanCoords,
  SevenDays,
} from "../../";

export type MonthCalendarEventSpanCoords = CalendarEventSpanCoords & {
  weekIdx: number;
};

export type MonthCalendarEventSpan<T = unknown> = CalendarEventSpanBase<T> & {
  coords: MonthCalendarEventSpanCoords;
};

export type GetSpansForEventArgs<T> = {
  event: CalendarEventInput<T>;
  weeks: SevenDays[];
  adapter: DateAdapter;
};

export type GetSpansForEventReturn = MonthCalendarEventSpanCoords[];

export type GetEventSpansArgs<T> = {
  events: CalendarEventInput<T>[];
  weeks: SevenDays[];
  adapter: DateAdapter;
};

export type GetEventSpansReturn<T> = {
  groupByWeek: () => MonthCalendarEventSpan<T>[][];

  groupByEvent: () => MonthCalendarEventSpan<T>[][];

  asList: () => MonthCalendarEventSpan<T>[];
};
