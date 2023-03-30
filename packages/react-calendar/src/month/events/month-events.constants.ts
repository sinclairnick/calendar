import { SevenDays } from "../../types";
import { GetBoundingBoxReturn } from "../../types/event.types";
import {
  GetEventSpansArgs,
  GetEventSpansReturn,
  GetSpansForEventArgs,
  GetSpansForEventReturn,
  MonthCalendarEventSpan,
} from "../events/month-events.types";
import { groupBy } from "lodash";

export const getEventSpans = <T>(
  args: GetEventSpansArgs<T>
): GetEventSpansReturn<T> => {
  const { adapter, events, weeks } = args;

  const spans: MonthCalendarEventSpan<T>[] = events.reduce(
    (arr: MonthCalendarEventSpan<T>[], event, i) => {
      const eventSpans = getSpansForEvent({ adapter, event, weeks });
      const additional = eventSpans.map(
        (coords): MonthCalendarEventSpan<T> => ({
          eventIdx: i,
          coords,
          event,
        })
      );

      return [...arr, ...additional];
    },
    []
  );

  return {
    groupByEvent() {
      return Object.values(groupBy(spans, (s) => s.eventIdx));
    },
    groupByWeek() {
      return Object.values(groupBy(spans, (s) => s.coords.weekIdx));
    },
    asList() {
      return spans;
    },
  };
};

/** Get bounding box for span */
export const getBoundingBox = <T>(
  span: MonthCalendarEventSpan<T>,
  weeks: SevenDays[]
): GetBoundingBoxReturn => {
  return {
    topOffset: (span.coords.weekIdx / weeks.length) * 100,
    bottomOffset: 100 - ((span.coords.weekIdx + 1) / weeks.length) * 100,
    leftOffset: (span.coords.start.value / weeks[0].length) * 100,
    rightOffset:
      ((weeks[0].length - span.coords.start.value) / weeks[0].length) * 100,
    spanSizePct:
      ((span.coords.end.value - span.coords.start.value) / weeks[0].length) *
      100,
  };
};

export const boundIndices = (
  inputs: [number, number],
  bounds: [number, number]
): [number, number] => {
  const [start, end] = inputs;
  const [boundStart, boundEnd] = bounds;

  const boundedStart = Math.abs(
    Math.max(Math.min(start, boundEnd), boundStart)
  );
  const boundedEnd = Math.abs(Math.max(Math.min(end, boundEnd), boundStart));

  return [boundedStart, boundedEnd];
};

export const getSpansForEvent = <T>(
  args: GetSpansForEventArgs<T>
): GetSpansForEventReturn => {
  const { adapter, event, weeks } = args;
  const spans: GetSpansForEventReturn = [];

  for (const i in weeks) {
    const weekIdx = Number(i);
    const week = weeks[weekIdx];
    const weekStart = week[0];

    // These can be negative
    const diffStart = adapter.diffDays(event.start, weekStart);
    const unboundedStartIdx = Math.floor(diffStart);

    const diffEnd = adapter.diffDays(event.end, weekStart);
    const unboundedEndIdx = Math.ceil(diffEnd);

    const [boundedStartIdx, boundedEndIdx] = boundIndices(
      [unboundedStartIdx, unboundedEndIdx],
      [0, week.length]
    );

    const isEventStart = boundedStartIdx === unboundedStartIdx;
    const isEventEnd = boundedEndIdx === unboundedEndIdx;

    const isOutsideRange = boundedStartIdx === boundedEndIdx;
    if (isOutsideRange) continue;

    spans.push({
      start: { value: boundedStartIdx, isEventStart },
      end: { value: boundedEndIdx, isEventEnd },
      totalSpan: unboundedEndIdx - unboundedStartIdx,
      weekIdx: weekIdx,
    });
  }

  return spans;
};
