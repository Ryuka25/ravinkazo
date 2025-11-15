<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import MapToolBox from './MapToolBox.svelte';
	import { cn } from '$lib/utils';
	import Map from './Map.svelte';
	import ModelSheet from './ModelSheet.svelte';

	import { map, resetMapToDefaultPosition } from '$lib/stores/map.svelte';

	type MapContainerProps = HTMLAttributes<HTMLDivElement>;

	let { class: className, ...props }: MapContainerProps = $props();
</script>

<div class={cn('relative h-full', className)} {...props}>
	<Map class="absolute inset-0" />
	<div class="pointer-events-none absolute bottom-0 w-full p-4 *:pointer-events-auto">
		<MapToolBox
			coord={map.center}
			zoom={map.zoom}
			pitch={map.pitch}
			bearing={map.bearing}
			onResetClick={resetMapToDefaultPosition}
		/>
	</div>
</div>

<ModelSheet />
