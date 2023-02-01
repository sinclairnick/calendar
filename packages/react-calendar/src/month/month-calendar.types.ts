import { SevenDays } from "../types/calendar.types";
import type { DateAdapter } from "@calendar/date-adapter";
import {
  CalendarEventInput,
  CalendarEventSpanBoundingBox,
} from "src/types/event.types";
import { MonthCalendarEventSpan } from "./events/month-events.types";

export type UseMonthCalendarArgs<T> = {
  adapter: DateAdapter;
  events?: CalendarEventInput<T>[];
  /** (Optional) Date to initially show in calendar */
  defaultStart?: Date;
};

export type MonthCalendarProps = {};

export type UseMonthCalendarReturn<
  Event extends CalendarEventInput = CalendarEventInput
> = MonthCalendarProps & {
  weeks: SevenDays[];
  spans: MonthCalendarEventSpan<Event>[];
  monthStart: Date;
  setDate: (date: Date) => void;
  nextMonth: () => void;
  prevMonth: () => void;
  isInCurrentMonth: (date: Date) => boolean;
  isBeforeToday: (date: Date) => boolean;
  isToday: (date: Date) => boolean;
  isWeekend: (date: Date) => boolean;
  getSpanBoundingBox: (
    event: MonthCalendarEventSpan
  ) => CalendarEventSpanBoundingBox;
};

export type MonthCalendarMeta = {};
