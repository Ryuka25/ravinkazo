<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AccordionPrimitive.ItemProps = $props();
</script>

<AccordionPrimitive.Item
	bind:ref
	data-slot="accordion-item"
	class={cn(
		'mb-4 rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
		className
	)}
	{...restProps}
/>
