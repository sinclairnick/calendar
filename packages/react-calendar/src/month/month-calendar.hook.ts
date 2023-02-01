import { splitMonthIntoWeeks } from "./month-calendar.constants";
import {
  UseMonthCalendarArgs,
  UseMonthCalendarReturn,
} from "./month-calendar.types";
import { useState } from "react";
import { getEventSpans } from "./events/month-events.constants";

export const useMonthCalendar = <T>(
  args: UseMonthCalendarArgs<T>
): UseMonthCalendarReturn => {
  const { adapter, defaultStart = new Date() } = args;
  const [focusDate, setFocusDate] = useState(defaultStart);

  const monthStart = adapter.getMonthStart(focusDate);
  const month = adapter.getMonth(monthStart);
  const weeks = splitMonthIntoWeeks(month);

  const spans = args.events
    ? getEventSpans({ adapter: args.adapter, events: args.events, weeks })
    : [];

  const setDate: UseMonthCalendarReturn["setDate"] = (date) => {
    setFocusDate(date);
  };

  const nextMonth: UseMonthCalendarReturn["nextMonth"] = () => {
    setFocusDate(adapter.addMonth(monthStart));
  };

  const prevMonth: UseMonthCalendarReturn["prevMonth"] = () => {
    setFocusDate(adapter.subtractMonth(monthStart));
  };

  const isBeforeToday: UseMonthCalendarReturn["isBeforeToday"] = (date) => {
    return adapter.isBeforeDay(date, new Date());
  };

  const isInCurrentMonth: UseMonthCalendarReturn["isInCurrentMonth"] = (
    date
  ) => {
    return adapter.isSameMonth(date, monthStart);
  };

  const isToday: UseMonthCalendarReturn["isToday"] = (date) => {
    return adapter.isSameDay(date, new Date());
  };

  const isWeekend: UseMonthCalendarReturn["isWeekend"] = (date) => {
    return adapter.isWeekend(date);
  };

  const getSpanBoundingBox: UseMonthCalendarReturn["getSpanBoundingBox"] = (
    event
  ) => {
    return {
      topOffset: (event.coords.weekIndex / weeks.length) * 100,
      bottomOffset: 100 - ((event.coords.weekIndex + 1) / weeks.length) * 100,
      leftOffset: (event.coords.start.value / weeks[0].length) * 100,
      rightOffset:
        ((weeks[0].length - event.coords.start.value) / weeks[0].length) * 100,
      spanSizePct:
        ((event.coords.end.value - event.coords.start.value) /
          weeks[0].length) *
        100,
      totalEventSpanSize: (event.coords.totalSpan / weeks[0].length) * 100,
    };
  };

  return {
    isBeforeToday,
    isInCurrentMonth,
    isToday,
    isWeekend,
    setDate,
    monthStart,
    weeks,
    getSpanBoundingBox,
    spans,
    nextMonth,
    prevMonth,
  };
};
