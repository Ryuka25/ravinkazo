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
	import AppButton from '$lib/components/shared/AppButton.svelte';

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
	class={cn(
		'flex w-full flex-col gap-4 rounded-lg border-2 bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:max-w-xs',
		className
	)}
	{...props}
>
	<h2 class="text-center font-heading font-bold">Boite à outils</h2>
	<div class="grid grid-cols-[1fr_2fr] gap-1">
		<div class="col">Coord</div>
		<div>: {coord[0].toFixed(5)}, {coord[1].toFixed(5)}</div>
		<div>Zoom</div>
		<div>: {zoom.toFixed(2)}</div>
		<div>Pitch</div>
		<div>: {pitch.toFixed(2)}</div>
		<div>Bearing</div>
		<div>: {bearing.toFixed(2)}</div>
	</div>
	<div class="flex justify-end">
		<AppButton class="w-full md:w-auto" onclick={onResetClick}>Reinitialiser</AppButton>
	</div>
</div>
