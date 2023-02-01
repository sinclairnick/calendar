export type Weekdays = [string, string, string, string, string, string, string];

export type SevenDays = [Date, Date, Date, Date, Date, Date, Date];

/** Month may have 5-6 rows of weeks */
export type MonthInWeeks = SevenDays[];

export type TwentyEightDaysByWeek = [
    SevenDays,
    SevenDays,
    SevenDays,
    SevenDays
];

export type TwentyEightDays = [
    ...SevenDays,
    ...SevenDays,
    ...SevenDays,
    ...SevenDays
];

export type ThirtyFiveDays = [
    ...SevenDays,
    ...SevenDays,
    ...SevenDays,
    ...SevenDays,
    ...SevenDays
];
