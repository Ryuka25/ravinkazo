<script lang="ts">
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import 'maplibre-gl/dist/maplibre-gl.css';
	import { initializeMap } from '$lib/stores/map.svelte';

	type MapProps = HTMLAttributes<HTMLDivElement>;
	let { class: className }: MapProps = $props();

	// Ref
	let ref: HTMLElement;

	onMount(() => {
		initializeMap(ref);
	});
</script>

<div class={cn('h-full min-h-[80vh] bg-[#7db9e8]', className)} bind:this={ref}></div>
