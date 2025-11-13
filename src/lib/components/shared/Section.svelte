<script module>
	export type SectionProps = HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children }: SectionProps = $props();
</script>

<section class={cn('px-4', className)}>{@render children?.()}</section>
