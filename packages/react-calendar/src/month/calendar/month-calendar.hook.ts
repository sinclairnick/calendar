import { splitMonthIntoWeeks } from "./month-calendar.constants";
import {
  UseMonthCalendarArgs,
  UseMonthCalendarReturn,
} from "./month-calendar.types";
import { useState } from "react";
import {
  getBoundingBox,
  getEventSpans,
} from "../events/month-events.constants";

export function useMonthCalendar(
  args: UseMonthCalendarArgs
): UseMonthCalendarReturn {
  const { adapter, defaultStart = new Date() } = args;
  const [focusDate, setFocusDate] = useState(defaultStart);

  const monthStart = adapter.getMonthStart(focusDate);
  const monthEnd = adapter.getMonthEnd(focusDate);
  const month = adapter.getMonth(monthStart);
  const weeks = splitMonthIntoWeeks(month);

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

  const events: UseMonthCalendarReturn["events"] = (events) => {
    return {
      ...getEventSpans({ adapter, events, weeks }),
      getBoundingBox: (span) => getBoundingBox(span, weeks),
      boxToWeekStyle: (box) => ({
        left: `${box.leftOffset}`,
        width: `${box.spanSizePct}%`,
      }),
      boxToMonthStyle: (box) => ({
        top: `${box.topOffset}%`,
        left: `${box.leftOffset}%`,
        width: `${box.spanSizePct}%`,
        position: "absolute",
      }),
    };
  };

  return {
    weeks,
    isBeforeToday,
    isInCurrentMonth,
    isToday,
    isWeekend,
    setDate,
    monthStart,
    monthEnd,
    nextMonth,
    prevMonth,
    events,
  };
}
