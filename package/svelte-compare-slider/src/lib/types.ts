import type { Snippet } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type Direction = "horizontal" | "vertical";

export type CompareSliderProps = Omit<
  SvelteHTMLElements["div"],
  "style" | "onpointerdown" | "children" | "bind:this"
> & {
  /** @default "horizontal" */
  direction?: Direction;

  /**
   * position percentage
   * @default 50
   */
  position?: number;

  itemOne?: Snippet;
  itemTwo?: Snippet;
  handle?: Snippet;

  /**
   * position percentage
   */
  keyboardIncrement?: number;

  /**
   * Whether to disable slider movement.
   * @default false
   */
  disabled?: boolean;
};
