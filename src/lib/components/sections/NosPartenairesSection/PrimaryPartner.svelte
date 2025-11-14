<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement>;

	let { class: className, ...props }: Props = $props();
</script>

<div class={cn('flex items-center gap-8 rounded-lg bg-[#f9edae] p-16', className)} {...props}>
	<div class="flex w-2/3 flex-col gap-8 text-black">
		<div class="font-heading text-5xl">Institut Français de Madagascar</div>
		<div class="text-xl">Your future in your hands</div>
	</div>
	<img src="/assets/logos/ifm.jpg" alt="" class="ml-auto aspect-square w-1/3 rounded-lg" />
</div>
