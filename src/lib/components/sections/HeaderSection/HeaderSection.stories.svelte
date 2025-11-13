<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import HeaderSection from './HeaderSection.svelte';

	const { Story } = defineMeta({
		title: 'sections/HeaderSection',
		component: HeaderSection
	});
</script>

<Story name="Default" args={{}} />
