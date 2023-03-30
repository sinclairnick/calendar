import { useMonthCalendar, Day, Month, Week } from "@calendar/react/month";
import { createDayjsAdapter } from "@calendar/date-adapter/dayjs-adapter";
import dayjs from "dayjs";

const events = [
  {
    start: dayjs().add(1, "day").toDate(),
    end: dayjs().add(3, "day").toDate(),
    data: {
      title: "Birthday party",
    },
  },
];

export default function Web() {
  const calendar = useMonthCalendar({
    adapter: createDayjsAdapter(dayjs),
  });
  const spans = calendar.events(events);

  return (
    <div>
      <button onClick={calendar.prevMonth}>Prev month</button>
      <button onClick={calendar.nextMonth}>Next month</button>
      <h2>{dayjs(calendar.monthStart).format("MMMM, YYYY")}</h2>
      <Month>
        {spans.asList().map((s, i) => {
          const boundingBox = spans.getBoundingBox(s);

          return (
            <div
              key={i}
              style={{
                ...spans.boxToMonthStyle(boundingBox),
                paddingTop: 24,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "blue",
                }}
              >
                {s.event.data.title}
              </div>
            </div>
          );
        })}

        {calendar.weeks.map((week, i) => {
          return (
            <Week key={i} style={{ display: "flex", flex: 1 }}>
              {week.map((day, j) => {
                return (
                  <Day
                    key={j}
                    style={{
                      height: 100,
                      padding: 4,
                      outline: "1px solid #E9E9E9",
                      background: calendar.isToday(day)
                        ? "red"
                        : !calendar.isInCurrentMonth(day)
                        ? "#F1F1F1"
                        : undefined,
                    }}
                  >
                    {dayjs(day).format("D")}
                  </Day>
                );
              })}
            </Week>
          );
        })}
      </Month>
    </div>
  );
}
