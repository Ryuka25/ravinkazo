<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapContainer from './MapContainer.svelte';

	const { Story } = defineMeta({
		title: 'sections/MapSection/MapContainer',
		component: MapContainer
	});
</script>

<Story name="Default" args={{ coord: [0, 0], zoom: 17 }} />
