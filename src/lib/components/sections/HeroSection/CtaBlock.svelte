<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { MoveRight } from '@lucide/svelte';
	import { cn } from '$lib/utils';

	type CtaBlockProps = HTMLAttributes<HTMLDivElement>;

	let { class: className }: CtaBlockProps = $props();
</script>

<div
	class={cn(
		'flex flex-col items-center justify-center gap-4 rounded-lg bg-[#f2f2f2] p-8 font-heading text-xl',
		className
	)}
>
	<div>#Ravinkazo</div>
	<div>
		<a
			href="/planter-aujourdhui"
			class="flex items-center justify-center gap-8 border-4 bg-primary p-8 font-heading text-3xl font-bold shadow-neo transition-all duration-100 hover:translate-x-1 hover:translate-y-1 hover:bg-primary/80 hover:shadow-none"
		>
			Participer
			<MoveRight class="size-16" />
		</a>
	</div>
</div>
