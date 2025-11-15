<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { MoveRight } from '@lucide/svelte';
	import { cn } from '$lib/utils';

	type CtaBlockProps = HTMLAttributes<HTMLDivElement>;

	let { class: className }: CtaBlockProps = $props();
</script>

<div
	class={cn(
		'flex flex-col items-center justify-center gap-2 rounded-lg bg-[#f2f2f2] p-4 font-heading md:gap-4 md:p-8 md:text-xl',
		className
	)}
>
	<div>#Ravinkazo</div>
	<div>
		<a
			href="/planter-aujourdhui"
			class="flex items-center justify-center gap-4 border-4 bg-primary p-4 font-heading text-xl font-bold shadow-neo transition-all duration-100 hover:translate-x-1 hover:translate-y-1 hover:bg-primary/80 hover:shadow-none md:gap-8 md:p-8 md:text-3xl"
		>
			Participer
			<MoveRight class="size-8 md:size-16" />
		</a>
	</div>
</div>
