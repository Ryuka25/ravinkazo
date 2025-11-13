<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type ContainerProps = HTMLAttributes<HTMLDivElement>;

	let { class: className, children }: ContainerProps = $props();
</script>

<div class={cn('mx-auto w-full max-w-7xl', className)}>{@render children?.()}</div>
