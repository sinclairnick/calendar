export interface CalendarEventInput<T = any> {
  start: Date;
  end: Date;
  data: T;
}

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
  /** Total event span */
  totalSpan: number;
};

export type CalendarEventSpanBase<T = unknown> = {
  eventIdx: number;
  event: CalendarEventInput<T>;
};

export type GetBoundingBoxReturn = SpanBoundingBox;

export type SpanBoundingBox = {
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
};
