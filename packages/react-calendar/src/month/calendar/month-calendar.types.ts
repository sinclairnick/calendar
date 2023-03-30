import type { DateAdapter } from "@calend/date-adapter";
import { CSSProperties } from "react";
import { SevenDays } from "../../types";
import { CalendarEventInput, SpanBoundingBox } from "../../types/event.types";
import {
  GetEventSpansReturn,
  MonthCalendarEventSpan,
} from "../events/month-events.types";

export type UseMonthCalendarArgs = {
  adapter: DateAdapter;
  /** (Optional) Date to initially show in calendar */
  defaultStart?: Date;
};

export type MonthCalendarProps = {};

export type UseMonthCalendarReturn = MonthCalendarProps & {
  weeks: SevenDays[];
  monthStart: Date;
  monthEnd: Date;
  events: <T>(events: CalendarEventInput<T>[]) => GetEventSpansReturn<T> & {
    getBoundingBox: (span: MonthCalendarEventSpan<T>) => SpanBoundingBox;
    boxToWeekStyle: (box: SpanBoundingBox) => CSSProperties;
    boxToMonthStyle: (box: SpanBoundingBox) => CSSProperties;
  };
  setDate: (date: Date) => void;
  nextMonth: () => void;
  prevMonth: () => void;
  isInCurrentMonth: (date: Date) => boolean;
  isBeforeToday: (date: Date) => boolean;
  isToday: (date: Date) => boolean;
  isWeekend: (date: Date) => boolean;
};
