<script lang="ts">
  import type { SvelteHTMLElements } from "svelte/elements";
  import type { Direction } from "./types.js";

  type Props = SvelteHTMLElements["div"] & {
    direction?: Direction;
    color?: string;
  };

  let {
    direction = "horizontal",
    color = "#fff",
    class: className,
    style,
    ...props
  }: Props = $props();
</script>

<div
  class="handle {className}"
  style="--color: {color}; color: {color}; {style}"
  class:horizontal={direction === "horizontal"}
  class:vertical={direction === "vertical"}
  {...props}
>
  <div class="icons" style="--rotate: {direction === 'vertical' ? '90deg' : 0}">
    <svg class="left" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M13.729 5.575c1.304-1.074 3.27-.146 3.27 1.544v9.762c0 1.69-1.966 2.618-3.27 1.544l-5.927-4.881a2 2 0 0 1 0-3.088z"
        clip-rule="evenodd"
      ></path>
    </svg>

    <svg class="right" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
        clip-rule="evenodd"
      ></path>
    </svg>
  </div>
</div>

<style>
  .handle {
    position: absolute;
    box-shadow: 0 0 2px hsla(0 0 0 / 0.2);
    background-color: var(--color);
  }

  .horizontal {
    inset: 0 auto;
    width: 2px;
    left: var(--position);
    transform: translateX(-50%);
  }

  .vertical {
    inset: auto 0;
    height: 2px;
    top: var(--position);
    transform: translateY(-50%);
  }

  .icons {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(var(--rotate));
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid var(--color);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
    box-shadow: 0 0 2px hsla(0 0 0 / 0.2);
  }
</style>
