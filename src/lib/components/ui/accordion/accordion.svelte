<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		value = $bindable(),
		...restProps
	}: AccordionPrimitive.RootProps = $props();
</script>

<AccordionPrimitive.Root
	bind:ref
	bind:value={value as never}
	data-slot="accordion"
	class="w-full overflow-hidden rounded-lg border-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
	{...restProps}
/>
