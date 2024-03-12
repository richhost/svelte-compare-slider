import * as CSS from "csstype";

export type Style = CSS.Properties;

export type Orientation = "horizontal" | "vertical";

export type InitProps = {
  orientation?: Orientation;
  position?: number;
};
