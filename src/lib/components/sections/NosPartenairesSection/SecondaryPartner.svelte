<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement>;

	let { class: className, ...props }: Props = $props();
</script>

<div
	class={cn(
		'flex flex-row items-center gap-4 rounded-lg bg-[#f2f2f2] p-4 md:gap-8 md:p-8',
		className
	)}
	{...props}
>
	<div class="w-1/2 font-heading text-xl text-black md:text-3xl">Mass'In</div>
	<img src="/assets/logos/massin.jpg" alt="" class="ml-auto aspect-square w-1/2 rounded-lg" />
</div>
