<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FaqSection from './FaqSection.svelte';

	const { Story } = defineMeta({
		title: 'sections/FaqSection',
		component: FaqSection
	});
</script>

<Story name="Default" args={{}} />
