import { DateAdapter } from "@calendar/date-adapter";
import { SevenDays } from "src/types/calendar.types";
import {
  CalendarEventInput,
  CalendarEventSpanEnd,
  CalendarEventSpanStart,
} from "src/types/event.types";
import { MonthCalendarEventSpan } from "../events/month-events.types";

const getEventIndices = (
  event: Pick<CalendarEventInput, "start" | "end">,
  minDate: Date,
  weekLength = 7,
  adapter: DateAdapter
) => {
  // These can be negative
  let _startIndex = Math.floor(adapter.diffDays(event.start, minDate));
  let _endIndex = Math.ceil(adapter.diffDays(event.end, minDate));

  const boundedStartIndex = Math.max(_startIndex, 0);
  const isEventStart = boundedStartIndex === _startIndex;

  const boundedEndIndex = Math.min(_endIndex, weekLength);
  const isEventEnd = boundedEndIndex === _endIndex;

  // Avoid negative zero
  _startIndex = Math.max(_startIndex, 0);
  _endIndex = Math.max(_endIndex, 0);

  const isEntirelyInFuture = _startIndex > weekLength && _endIndex > weekLength;
  const isEntirelyInPast = _startIndex < 0 && _endIndex < 0;
  const hasNoDuration = _startIndex === _endIndex;

  const isOutsideRange =
    isEntirelyInFuture || isEntirelyInPast || hasNoDuration;
  if (isOutsideRange) return;

  // Bound start/end to [0,7)

  const startIndex: CalendarEventSpanStart = {
    value: boundedStartIndex,
    isEventStart,
  };
  const endIndex: CalendarEventSpanEnd = {
    value: boundedEndIndex,
    isEventEnd,
  };
  return { startIndex, endIndex, totalSpan: _endIndex - _startIndex };
};

export const getStackIndex = (
  start: CalendarEventSpanStart,
  prevInWeek: MonthCalendarEventSpan[]
) => {
  return prevInWeek.reduce((acc, val) => {
    const prevStart = val.coords.start.value;
    const prevEnd = val.coords.end.value;
    const prevStackIndex = val.coords.stackIndex;
    return acc + Number(prevStackIndex === acc && prevEnd > start.value);
  }, 0);
};

export const getEventSpans = <
  T extends CalendarEventInput = CalendarEventInput
>(args: {
  weeks: SevenDays[];
  events: T[];
  adapter: DateAdapter;
}): MonthCalendarEventSpan<T>[] => {
  const { events, weeks } = args;
  const spans: MonthCalendarEventSpan<T>[] = [];
  const eventsSortedByStart = events
    .map((x, i) => ({ event: x, index: i })) // Keep original index
    .sort((a, b) => {
      return a.event.start > b.event.start ? 1 : -1;
    });

  for (const i in weeks) {
    const index = Number(i);
    const week = weeks[index];
    const minDate = week[0];

    const prevSpans: MonthCalendarEventSpan<T>[] = [];

    for (const eventIndex in eventsSortedByStart) {
      const event = eventsSortedByStart[eventIndex];
      const indices = getEventIndices(
        event.event,
        minDate,
        week.length,
        args.adapter
      );
      if (indices === undefined) continue;

      const { endIndex, startIndex, totalSpan } = indices;

      const span: MonthCalendarEventSpan<T> = {
        index: event.index,
        data: event.event,
        coords: {
          end: endIndex,
          start: startIndex,
          weekIndex: index,
          stackIndex: getStackIndex(startIndex, prevSpans),
          totalSpan,
        },
      };

      spans.push(span);
      prevSpans.push(span);
    }
  }
  return spans;
};
