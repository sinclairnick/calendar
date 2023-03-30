import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";
import React from "react";

export type MonthProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Month = forwardRef<HTMLDivElement, MonthProps>((props, ref) => {
  return (
    <div
      {...props}
      style={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "stretch",
        width: "100%",
        height: "100%",
        ...props,
      }}
      ref={ref}
    />
  );
});

Month.displayName = "Month";
