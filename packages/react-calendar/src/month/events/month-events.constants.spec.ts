import * as Subject from "./month-events.constants";
import dayjs from "dayjs";
import { splitMonthIntoWeeks } from "../calendar/month-calendar.constants";
import { createDayjsAdapter } from "@calend/date-adapter/dayjs-adapter";

describe("Month events", () => {
  const adapter = createDayjsAdapter(dayjs);

  const mon10thJan = dayjs()
    .set("year", 2022)
    .set("month", 0)
    .set("date", 10)
    .startOf("day");
  const monthStart = adapter.getMonthStart(mon10thJan.toDate());
  const month = adapter.getMonth(monthStart);
  const weeks = splitMonthIntoWeeks(month);

  it("Includes spans within the same week", () => {
    const tuesday4thJan = mon10thJan.clone().set("date", 4);
    const thursday13thJan = tuesday4thJan.clone().set("date", 13);

    const result = Subject.getSpansForEvent({
      adapter,
      weeks,
      event: {
        start: tuesday4thJan.toDate(),
        end: thursday13thJan.toDate(),
        data: {},
      },
    });

    // Duration carries over weekend, so two spans
    expect(result.length).toBe(2);
  });
});
