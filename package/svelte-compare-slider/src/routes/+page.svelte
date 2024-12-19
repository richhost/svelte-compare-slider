<script lang="ts">
  import { CompareSlider, SliderHandle } from "$lib/index.js";
</script>

<div class="container">
  <CompareSlider keyboardIncrement={5}>
    {#snippet itemOne()}
      <div class="one"></div>
    {/snippet}
    {#snippet itemTwo()}
      <div class="two"></div>
    {/snippet}
    {#snippet handle()}
      <SliderHandle />
    {/snippet}
  </CompareSlider>
</div>

<style>
  .container {
    max-width: 400px;
    margin-inline: auto;
  }

  .one {
    height: 200px;
    background-color: antiquewhite;
  }
  .two {
    height: 200px;
    background-color: cadetblue;
  }
</style>
