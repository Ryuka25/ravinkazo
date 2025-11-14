<script>
	import Container from '$lib/components/shared/Container.svelte';
	import Section from '$lib/components/shared/Section.svelte';
	import CtaBlock from './CtaBlock.svelte';
	import MainBlock from './MainBlock.svelte';
	import SecondBlock from './SecondBlock.svelte';
</script>

<Section class="pt-16">
	<Container class="grid grid-cols-2 gap-4">
		<MainBlock class="col-span-2" />
		<SecondBlock />
		<CtaBlock />
	</Container>
</Section>
