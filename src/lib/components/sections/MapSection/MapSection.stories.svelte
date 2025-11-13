<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapSection from './MapSection.svelte';

	const { Story } = defineMeta({
		title: 'sections/MapSection',
		component: MapSection
	});
</script>

<Story name="Default" args={{}} />
