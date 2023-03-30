export interface DateAdapter {
  /**
   * Get weekday names, accomodating for any week-start changes made
   */
  getWeekdays: () => [string, string, string, string, string, string, string];

  /**
   * Get the first date for the viewable month.
   */
  getMonthStart: (dateInMonth: Date) => Date;

  /**
   * Get the lest date for the viewable month.
   */
  getMonthEnd: (dateInMonth: Date) => Date;

  /**
   * Get a list of all dates in the viewable month.
   * This may include dates from the previous and next month.
   */
  getMonth: (dateInMonth: Date) => Date[];

  /**
   * Checks whether a date is in a given range
   */
  isInRange: (date: Date, range: [Date, Date]) => boolean;

  isBeforeDay: (date: Date, testDate: Date) => boolean;
  isSameDay: (date: Date, testDate: Date) => boolean;

  isSameMonth: (date: Date, testDate: Date) => boolean;

  isWeekend: (date: Date) => boolean;

  /** Diff days (including decimal part) */
  diffDays: (dateFrom: Date, dateTo: Date) => number;

  addMonth: (date: Date, months?: number) => Date;
  subtractMonth: (date: Date, months?: number) => Date;

  /**
   * Clips a duration to a given range.
   */
  boundDuration: (
    duration: [Date, Date],
    bounds: [Date, Date]
  ) => [Date, Date] | undefined;
}
