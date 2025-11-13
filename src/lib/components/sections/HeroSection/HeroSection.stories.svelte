<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import HeroSection from './HeroSection.svelte';

	const { Story } = defineMeta({
		title: 'sections/HeroSection',
		component: HeroSection
	});
</script>

<Story name="Default" args={{}} />
