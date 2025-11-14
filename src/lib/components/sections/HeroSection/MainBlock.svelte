<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import CultiverImage from './CultiverImage.svelte';
	import PlanterImage from './PlanterImage.svelte';
	import { cn } from '$lib/utils';

	type MainBlockProps = HTMLAttributes<HTMLDivElement>;

	let { class: className }: MainBlockProps = $props();
</script>

<div class={cn('flex flex-col rounded-lg bg-[#f2f2f2] p-16 text-black', className)}>
	<div class="flex items-center justify-around">
		<div class="font-heading text-6xl font-bold">
			Planter
			<span class="inline-block -rotate-2 border-4 bg-[#7db9e8] text-foreground shadow-neo">
				aujourd'hui
			</span>
		</div>
		<PlanterImage />
	</div>
	<div class="flex items-center justify-around">
		<CultiverImage />
		<div class="font-heading text-6xl font-bold">Cultiver demain</div>
	</div>
</div>
