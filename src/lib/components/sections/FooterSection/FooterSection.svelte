<script lang="ts">
	import Container from '$lib/components/shared/Container.svelte';
	import type { SectionProps } from '$lib/components/shared/Section.svelte';
	import Section from '$lib/components/shared/Section.svelte';
	import { cn } from '$lib/utils';

	let { class: className }: SectionProps = $props();
</script>

<Section class={cn('py-2 pt-8', className)}>
	<Container>
		<div class="flex items-center justify-center">
			<div class="text-sm">
				© Copyright 2025 par <a class="font-heading font-bold" href="/">GreenDay</a>
			</div>
		</div>
	</Container>
</Section>
