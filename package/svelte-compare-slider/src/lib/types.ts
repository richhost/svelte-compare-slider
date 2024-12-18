import type { Snippet } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type Direction = "horizontal" | "vertical";

export type CompareSliderProps = Omit<
  SvelteHTMLElements["div"],
  "style" | "onpointerdown" | "children" | "bind:this"
> & {
  /** @default "horizontal" */
  direction?: Direction;

  /** @default 50 */
  position?: number;

  itemOne?: Snippet;
  itemTwo?: Snippet;
  handle?: Snippet;
};
