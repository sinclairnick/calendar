import React from "react";
import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";

export type DayProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Day = forwardRef<HTMLDivElement, DayProps>((props, ref) => {
  return <div {...props} style={{ flex: 1, ...props.style }} ref={ref} />;
});

Day.displayName = "Day";
