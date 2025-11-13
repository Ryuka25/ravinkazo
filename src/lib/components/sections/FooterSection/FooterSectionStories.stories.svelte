<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FooterSection from './FooterSection.svelte';

	const { Story } = defineMeta({
		title: 'sections/FooterSection',
		component: FooterSection
	});
</script>

<Story name="Default" args={{}} />
