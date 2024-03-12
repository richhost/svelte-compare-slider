<script lang="ts">
	import '../app.css';
	import { createComparison, type Orientation } from 'svelte-compare-slider';

	const orientation: Orientation = 'horizontal';

	const api = createComparison({ position: 70, orientation });
</script>

<div class="root" {...api.rootProps}>
	<div {...api.panelAProps}>
		<img class="w-full" src="https://picsum.photos/id/237/200/300" alt="" />
	</div>

	<div {...api.panelBProps}>
		<img class="w-full" src="https://picsum.photos/id/238/200/300" alt="" />
	</div>

	<div {...api.handleProps} class="w-1 bg-red-400">
		<div class="grow w-0.5 bg-white shadow" />
		<div
			class="w-10 h-10 border-2 rounded-full shadow backdrop-blur flex items-center justify-center"
		>
			<div
				class="w-0 h-0"
				style="border: inset 6px transparent; border-right: 6px solid white; margin-right: 10px;"
			/>
			<div class="w-0 h-0" style="border: inset 6px transparent; border-left: 6px solid white;" />
		</div>
		<div class="grow w-0.5 bg-white shadow" />
	</div>
</div>
