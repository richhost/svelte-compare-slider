<script lang="ts">
  import { createComparison } from "../lib/index.js";

  const api = createComparison();
</script>

<div {...api.rootProps}>
  <div {...api.panelAProps} class="left">left</div>
  <div {...api.panelBProps} class="right">right</div>

  <div {...api.handleProps} class="handle">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-chevrons-left-right"
      ><path d="m9 7-5 5 5 5"></path><path d="m15 7 5 5-5 5"></path></svg
    >
  </div>
</div>

<style>
  .left,
  .right {
    height: 200px;
  }
  .left {
    background-color: cadetblue;
  }
  .right {
    background-color: coral;
    text-align: right;
  }

  .handle {
    width: 1px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
</style>
