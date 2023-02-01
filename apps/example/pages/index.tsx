import { useMonthCalendar } from "@calendar/react";
import { createDayjsAdapter } from "@calendar/date-adapter/dayjs-adapter";
import dayjs from "dayjs";

export default function Web() {
  const calendar = useMonthCalendar({
    adapter: createDayjsAdapter(dayjs),
  });

  return (
    <div>
      <button onClick={calendar.prevMonth}>Prev month</button>
      <button onClick={calendar.nextMonth}>Next month</button>
      <h2>{dayjs(calendar.monthStart).format("MMMM, YYYY")}</h2>
      <div
        style={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "stretch",
          width: "100%",
          height: "100%",
        }}
      >
        {calendar.weeks.map((week, i) => {
          return (
            <div key={i} style={{ display: "flex", flex: 1 }}>
              {week.map((day, j) => {
                return (
                  <div
                    key={j}
                    style={{
                      flex: 1,
                      height: 100,
                      padding: 4,
                      outline: calendar.isToday(day)
                        ? "1px solid red"
                        : "1px solid #E9E9E9",
                      background: !calendar.isInCurrentMonth(day)
                        ? "#F1F1F1"
                        : undefined,
                    }}
                  >
                    {dayjs(day).format("D")}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
