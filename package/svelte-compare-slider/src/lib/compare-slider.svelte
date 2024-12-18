<script lang="ts">
  import type { CompareSliderProps } from "./types.js";

  let {
    direction = "horizontal",
    position = $bindable(50),
    itemOne,
    itemTwo,
    handle,
    ...props
  }: CompareSliderProps = $props();

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  let root: HTMLDivElement;

  let rect: DOMRect | null;

  const setPosition = (event: PointerEvent) => {
    if (!rect) return;
    const max = direction === "horizontal" ? rect.width : rect.height;
    const value = direction === "horizontal" ? event.clientX : event.clientY;
    const offset = direction === "horizontal" ? rect.left : rect.top;
    position = clamp(((value - offset) / max) * 100, 0, 100);
  };

  const onpointerdown = (event: PointerEvent) => {
    if (!event.currentTarget) return;
    rect = root.getBoundingClientRect();
    setPosition(event);
    const target = event.target as HTMLElement;
    target.setPointerCapture(event.pointerId);
    target.onpointermove = (e) => setPosition(e);
    target.onpointerup = () => {
      target.releasePointerCapture(event.pointerId);
      target.onpointermove = null;
      target.onpointerup = null;
      rect = null;
    };
  };
</script>

<div
  bind:this={root}
  style="--position: {position}%; position: relative; overflow: clip; touch-action: {direction ===
  'horizontal'
    ? 'pan-y'
    : 'pan-x'};"
  {onpointerdown}
  {...props}
>
  <div
    style:clip-path={direction === "horizontal"
      ? "inset(0 calc(100% - var(--position)) 0 0)"
      : "inset(0 0 calc(100% - var(--position)) 0)"}
  >
    {@render itemOne?.()}
  </div>
  <div
    style="position: absolute; inset: 0;"
    style:clip-path={direction === "horizontal"
      ? "inset(0 0 0 var(--position))"
      : "inset(var(--position) 0 0 0)"}
  >
    {@render itemTwo?.()}
  </div>

  <div style="display: contents;">
    {@render handle?.()}
  </div>
</div>
