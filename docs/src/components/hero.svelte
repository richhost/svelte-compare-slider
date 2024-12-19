<script lang="ts">
  import {
    CompareSlider,
    SliderHandle,
    type Direction,
  } from "svelte-compare-slider";

  let checked = $state(false);
  let position = $state(50);
  let direction = $derived.by<Direction>(() => {
    return checked ? "vertical" : "horizontal";
  });
</script>

<div class="min-h-[80vh] flex items-center justify-center p-5">
  <div class="max-w-xl text-center text-balance">
    <h1 class="text-2xl font-bold md:text-4xl">Svelte Compare Slider</h1>
    <p class="md:text-lg text-gray-500 mb-10 mt-2">
      Compare two components side-by-side or top-to-toe.
    </p>
    <CompareSlider bind:position {direction} keyboardIncrement={5}>
      {#snippet itemOne()}
        <img
          draggable="false"
          src="https://images.unsplash.com/photo-1636777299552-4fbb482b9267?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      {/snippet}
      {#snippet itemTwo()}
        <img
          class="contrast-50"
          draggable="false"
          src="https://images.unsplash.com/photo-1636777299552-4fbb482b9267?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />"
      {/snippet}

      {#snippet handle()}
        <SliderHandle {direction} />
      {/snippet}
    </CompareSlider>

    <div class="mt-10 text-gray-700 gap-5 flex flex-col items-center">
      <div class="max-w-64 w-full">
        <label for="price-range" class="block font-bold mb-2">Position</label>
        <input
          type="range"
          id="price-range"
          class="w-full accent-indigo-600"
          min="0"
          max="100"
          bind:value={position}
        />
        <div class="flex items-center justify-between">
          <span>0</span>
          <span>100</span>
        </div>
      </div>

      <div class="mx-auto flex items-center gap-3 font-medium">
        <span>Horizontal</span>
        <input
          type="checkbox"
          bind:checked
          class="peer sr-only opacity-0"
          id="toggle"
        />
        <label
          for="toggle"
          class="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-300 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-indigo-600 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
        >
          <span class="sr-only">Enable</span>
        </label>
        <span>Vertical</span>
      </div>
    </div>
  </div>
</div>
