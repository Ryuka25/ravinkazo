<script>
	import Container from '$lib/components/shared/Container.svelte';
	import Section from '$lib/components/shared/Section.svelte';
	import PrimaryPartner from './PrimaryPartner.svelte';
	import SecondaryPartner from './SecondaryPartner.svelte';
	import TertiaryPartner from './TertiaryPartner.svelte';
	import Partner from './Partner.svelte';
</script>

<Section class="pt-32">
	<Container>
		<div class="grid grid-cols-4 gap-8">
			<PrimaryPartner class="col-span-4" />
			<Partner logo="/assets/logos/logo-3.jpg" />
			<Partner logo="/assets/logos/logo-1.avif" />
			<TertiaryPartner class="col-span-2" />
			<SecondaryPartner class="col-span-2" />
			<Partner logo="/assets/logos/logo-2.avif" />
			<Partner logo="/assets/logos/logo-4.avif" />
		</div>
	</Container>
</Section>
