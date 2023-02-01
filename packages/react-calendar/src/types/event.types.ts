export type CalendarEventInput<T extends any = any> = {
  start: Date;
  end: Date;
  data: T;
};

export type CalendarEventSpanStart = {
  value: number;
  /** Whether the span start is also the start of the event */
  isEventStart: boolean;
};

export type CalendarEventSpanEnd = {
  value: number;
  /** Whether the span end is also the end of the event */
  isEventEnd: boolean;
};

export type CalendarEventSpanCoords = {
  /** The span's start index, along the main axis */
  start: CalendarEventSpanStart;
  /** The span's end index, along the main axis */
  end: CalendarEventSpanEnd;
  /** The stacked index of a span. Used for overlapping events */
  stackIndex: number;
  /** Total event span */
  totalSpan: number;
};

export type CalendarEventSpanBase<
  T extends CalendarEventInput = CalendarEventInput
> = {
  index: number;
  data: T;
};

export type CalendarEventSpanBoundingBox = {
  /** Distance from origin top to top of row, in % */
  topOffset: number;
  /** Distance from origin bottom to bottom of row, in % */
  bottomOffset: number;
  /** Distance from left origin to left edge of cell, in % */
  leftOffset: number;
  /** Distance from right origin to right edge of cell, in % */
  rightOffset: number;
  /** The span size, in % */
  spanSizePct: number;
  /** The span size of the entire event, in % */
  totalEventSpanSize: number;
};
