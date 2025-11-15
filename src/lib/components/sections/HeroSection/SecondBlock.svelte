<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type SecondBlockProps = HTMLAttributes<HTMLDivElement>;

	let { class: className }: SecondBlockProps = $props();
</script>

<div
	class={cn(
		'flex flex-col items-center justify-center gap-4 rounded-lg bg-[#7db9e8] p-4 text-center font-heading md:p-8 md:text-xl',
		className
	)}
>
	<div>
		Réjoigner
		<span class="inline-block rotate-6 border-2 bg-white px-2 py-1 shadow-neo">+1000</span>
		personnes
	</div>
	<div>
		et faites partie du
		<span class="inline-block -rotate-6 border-2 bg-white px-2 py-1 shadow-neo">mouvement</span>
	</div>
</div>
