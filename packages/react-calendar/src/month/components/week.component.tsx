import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";

export type WeekProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Week = forwardRef<HTMLDivElement, WeekProps>((props, ref) => {
  return (
    <div {...props} style={{ display: "flex", flex: 1, ...props }} ref={ref} />
  );
});

Week.displayName = "Week";
