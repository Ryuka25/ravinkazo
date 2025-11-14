<script lang="ts" module>
	export type MapToolBoxProps = HTMLAttributes<HTMLDivElement> & {
		coord?: [number, number];
		zoom?: number;
		pitch?: number;
		bearing?: number;
		onResetClick?: () => void;
	};
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';
	import Button from '$lib/components/ui/button/button.svelte';
	import { addRandomModelAndFlyTo } from '$lib/stores/map.svelte';

	let {
		class: className,
		coord = [0, 0],
		zoom = 0,
		pitch = 0,
		bearing = 0,
		onResetClick = () => {},
		...props
	}: MapToolBoxProps = $props();
</script>

<div
	class={cn('flex w-full flex-col gap-4 rounded-lg bg-white p-4  md:max-w-xs', className)}
	{...props}
>
	<h2 class="text-center font-heading font-bold">Boite à outils</h2>
	<div class="hidden grid-cols-[1fr_2fr] gap-1 md:grid">
		<div class="col">Coord</div>
		<div>: {coord[0].toFixed(5)}, {coord[1].toFixed(5)}</div>
		<div>Zoom</div>
		<div>: {zoom.toFixed(2)}</div>
		<div>Pitch</div>
		<div>: {pitch.toFixed(2)}</div>
		<div>Bearing</div>
		<div>: {bearing.toFixed(2)}</div>
	</div>
	<div class="flex justify-end gap-2">
		<Button class="w-full md:w-auto" onclick={onResetClick}>Rétourner au point de départ</Button>
		<Button class="w-full md:w-auto" onclick={addRandomModelAndFlyTo}>Ajouter un modèle 3D</Button>
	</div>
</div>
