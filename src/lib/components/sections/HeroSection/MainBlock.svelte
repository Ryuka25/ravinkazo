<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import CultiverImage from './CultiverImage.svelte';
	import PlanterImage from './PlanterImage.svelte';
	import { cn } from '$lib/utils';

	type MainBlockProps = HTMLAttributes<HTMLDivElement>;

	let { class: className }: MainBlockProps = $props();
</script>

<div class={cn('flex flex-col gap-4 rounded-lg bg-[#f2f2f2] p-8 text-black md:p-16', className)}>
	<div class="flex flex-col items-center justify-center md:flex-row md:justify-around">
		<div class="text-center font-heading text-4xl font-bold md:text-6xl">
			Planter
			<span class="inline-block -rotate-2 border-4 bg-[#7db9e8] text-foreground shadow-neo">
				aujourd'hui
			</span>
		</div>
		<PlanterImage />
	</div>
	<div class="flex items-center justify-center md:justify-around">
		<CultiverImage />
		<div class="text-center font-heading text-4xl font-bold md:text-6xl">
			Cultiver
			<span class="inline-block rotate-2 border-4 bg-[#23d58c] text-foreground shadow-neo">
				demain
			</span>
		</div>
	</div>
</div>
