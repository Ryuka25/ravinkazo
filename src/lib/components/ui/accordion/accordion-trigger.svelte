<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import { cn, type WithoutChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		level = 3,
		children,
		...restProps
	}: WithoutChild<AccordionPrimitive.TriggerProps> & {
		level?: AccordionPrimitive.HeaderProps['level'];
	} = $props();
</script>

<AccordionPrimitive.Header {level} class="flex">
	<AccordionPrimitive.Trigger
		data-slot="accordion-triggxer"
		bind:ref
		class={cn(
			'flex flex-1 items-start justify-between gap-4 p-4 text-left font-heading text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 md:text-lg [&[data-state=open]>svg]:rotate-180',
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		<ChevronDownIcon
			class="pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 md:size-6"
		/>
	</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
