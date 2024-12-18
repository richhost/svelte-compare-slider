## Install
Use your favorite package manager to install it:
```bash
pnpm add -D svelte-compare-slider
```

## Usage
```svelte
<script lang="ts">
  import { CompareSlider, SliderHandle } from "svelte-compare-slider";
</script>

<CompareSlider>
  {#snippet itemOne()}
  {/snippet}
  {#snippet itemTwo()}
  {/snippet}

  {#snippet handle()}
    <SliderHandle />
  {/snippet}
</CompareSlider>
```

## Props

### CompareSlider

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `direction` | `horizontal` or `vertical` | `horizontal` | The direction of the slider. |
| `position` | `number` | `50` | The position of the slider. |
| `itemOne` | `Snippet` |  | First item to show. |
| `itemTwo` | `Snippet` |  | Second item to show. |
| `handle` | `Snippet` |  | Custom handle component. You can also use the provided SliderHandle component. |