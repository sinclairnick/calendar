import _dayjs from "dayjs";
import { DateAdapter } from "../types/date-adapter.interface";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import minMax from "dayjs/plugin/minMax";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

export const createDayjsAdapter = (dayjs: typeof _dayjs): DateAdapter => {
  dayjs.extend(localeData);
  dayjs.extend(weekday);
  dayjs.extend(minMax);
  dayjs.extend(isBetween);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);

  const getWeekdays = () => {
    return dayjs.weekdays();
  };

  const getMonthStart: DateAdapter["getMonthStart"] = (date) => {
    return dayjs(date).startOf("month").toDate();
  };

  const getMonth: DateAdapter["getMonth"] = (date) => {
    const _date = dayjs(date);
    const firstCell = _date.startOf("week");
    const days = Array.from({ length: 42 }).map((_, i) =>
      firstCell.add(i, "day").toDate()
    );

    // Trim last row if none of this month included
    const firstCellOfLastRow = days[35];
    if (firstCellOfLastRow.getMonth() !== _date.month()) {
      return days.slice(0, 35);
    }
    return days;
  };

  const isInRange: DateAdapter["isInRange"] = (date, range) => {
    return dayjs(date).isBetween(
      dayjs(range[0]).startOf("day"),
      dayjs(range[1]).endOf("day")
    );
  };

  const boundDuration: DateAdapter["boundDuration"] = (duration, bounds) => {
    const start = dayjs(duration[0]);
    const end = dayjs(duration[1]);
    const lowerBound = dayjs(bounds[0]);
    const upperBound = dayjs(bounds[1]);

    if (end.isBefore(lowerBound)) {
      return;
    }
    if (start.isAfter(upperBound)) {
      return;
    }

    return [
      dayjs.max(start, lowerBound).toDate(),
      dayjs.min(end, upperBound).toDate(),
    ];
  };

  const isBeforeDay: DateAdapter["isBeforeDay"] = (date, testDate) => {
    return dayjs(date).isBefore(testDate, "D");
  };

  const isSameDay: DateAdapter["isSameDay"] = (date, testDate) => {
    return dayjs(date).isSame(testDate, "D");
  };

  const isSameMonth: DateAdapter["isSameMonth"] = (date, testDate) => {
    return dayjs(date).isSame(testDate, "M");
  };

  const isWeekend: DateAdapter["isWeekend"] = (date) => {
    const day = dayjs(date).day();
    return day === 0 || day === 6;
  };

  const diffDays: DateAdapter["diffDays"] = (dateFrom, dateTo) => {
    return dayjs(dateFrom).diff(dateTo, "D", true);
  };

  const addMonth: DateAdapter["addMonth"] = (date, months = 1) => {
    return dayjs(date).add(months, "M").toDate();
  };

  const subtractMonth: DateAdapter["subtractMonth"] = (date, months = 1) => {
    return dayjs(date).subtract(months, "M").toDate();
  };

  return {
    boundDuration,
    getMonth,
    getMonthStart,
    getWeekdays,
    isInRange,
    isBeforeDay,
    isSameDay,
    isSameMonth,
    isWeekend,
    diffDays,
    addMonth,
    subtractMonth,
  };
};
