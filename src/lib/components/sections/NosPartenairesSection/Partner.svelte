<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement> & {
		logo: string;
	};

	let { class: className, logo, ...props }: Props = $props();
</script>

<div class={cn('flex  items-center gap-8 rounded-lg ', className)} {...props}>
	<img src={logo} alt="" class="ml-auto aspect-square rounded-lg shadow" />
</div>
