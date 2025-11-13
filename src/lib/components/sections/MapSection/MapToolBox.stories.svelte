<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapToolBox from './MapToolBox.svelte';

	const { Story } = defineMeta({
		title: 'sections/MapSection/MapToolBox',
		component: MapToolBox
	});
</script>

<Story name="Default" args={{ coord: [0, 0], zoom: 17 }} />
