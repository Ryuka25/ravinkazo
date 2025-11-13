<script lang="ts">
	import { cn } from '$lib/utils';
	import type { ButtonProps } from '../ui/button';
	import { Button } from '../ui/button';

	type AppButtonProps = ButtonProps;

	let { class: className, ...props }: ButtonProps = $props();
</script>

<Button
	class={cn(
		'rounded-lg border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none',
		className
	)}
	{...props}
/>
