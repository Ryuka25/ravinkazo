<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement>;

	let { class: className, ...props }: Props = $props();
</script>

<div class={cn('flex items-center gap-8 rounded-lg bg-[#f2f2f2] p-8', className)} {...props}>
	<div class="w-1/2 font-heading text-3xl text-black">Mass'In</div>
	<img src="/assets/logos/massin.jpg" alt="" class="ml-auto aspect-square w-1/2 rounded-lg" />
</div>
