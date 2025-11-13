<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CtaSection from './CtaSection.svelte';

	const { Story } = defineMeta({
		title: 'sections/CtaSection',
		component: CtaSection
	});
</script>

<Story name="Default" args={{}} />
