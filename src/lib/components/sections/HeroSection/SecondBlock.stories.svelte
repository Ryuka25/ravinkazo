<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SecondBlock from './SecondBlock.svelte';

	const { Story } = defineMeta({
		title: 'sections/HeroSection/SecondBlock',
		component: SecondBlock
	});
</script>

<Story name="Default" args={{}} />
