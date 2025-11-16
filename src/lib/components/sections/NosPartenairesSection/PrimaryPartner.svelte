<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement>;

	let { class: className, ...props }: Props = $props();
</script>

<div
	class={cn(
		'flex flex-col items-center gap-4 rounded-lg bg-[#23d58c] p-4 sm:flex-row md:gap-8 md:p-16',
		className
	)}
	{...props}
>
	<img
		src="/assets/logos/ifm.jpg"
		alt=""
		class="ml-auto aspect-square w-full rounded-lg md:w-1/3"
	/>
	<div class="flex w-full flex-col gap-4 text-black sm:order-first md:w-2/3 md:gap-8">
		<div class="font-heading text-3xl md:text-5xl">Institut Français de Madagascar</div>
		<div class="text-xl">Your future in your hands</div>
	</div>
</div>
