<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type SectionProps = HTMLAttributes<HTMLDivElement>;

	let { class: className, children }: SectionProps = $props();
</script>

<section class={cn('px-4', className)}>{@render children?.()}</section>
