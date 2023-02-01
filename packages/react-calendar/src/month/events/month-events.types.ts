import {
  CalendarEventInput,
  CalendarEventSpanBase,
  CalendarEventSpanCoords,
} from "src/types/event.types";

export type MonthCalendarEventSpan<
  T extends CalendarEventInput = CalendarEventInput
> = CalendarEventSpanBase<T> & {
  coords: CalendarEventSpanCoords & {
    weekIndex: number;
  };
};
