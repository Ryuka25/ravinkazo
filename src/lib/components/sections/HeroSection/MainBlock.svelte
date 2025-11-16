<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import cultiver from '$lib/assets/cultiver.svg';

	import { cn } from '$lib/utils';
	import planter from '$lib/assets/planter.svg';
	import arrow from '$lib/assets/arrow.svg';

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
		<div class="relative -mt-20 hidden w-1/4 lg:block">
			<img
				src={planter}
				alt=""
				class="-rotate-2 motion-rotate-loop-4 motion-ease-linear motion-duration-4000"
			/>
			<img src={arrow} alt="" class="absolute top-0 -left-1/2 w-1/2" />
		</div>
	</div>
	<div class="flex items-center justify-center md:justify-around">
		<img
			src={cultiver}
			alt=""
			class="-mt-20 hidden w-1/3 rotate-2 -motion-rotate-loop-4 motion-ease-linear motion-duration-4000 lg:block"
		/>
		<div class="text-center font-heading text-4xl font-bold md:text-6xl">
			Cultiver
			<span class="inline-block rotate-2 border-4 bg-[#23d58c] text-foreground shadow-neo">
				demain
			</span>
		</div>
	</div>
</div>
