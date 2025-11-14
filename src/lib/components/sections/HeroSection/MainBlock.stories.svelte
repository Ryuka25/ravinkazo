<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MainBlock from './MainBlock.svelte';

	const { Story } = defineMeta({
		title: 'sections/HeroSection/MainBlock',
		component: MainBlock
	});
</script>

<Story name="Default" args={{}} />
