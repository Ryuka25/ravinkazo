<script>
	import Container from '$lib/components/shared/Container.svelte';
	import Section from '$lib/components/shared/Section.svelte';
	import PrimaryPartner from './PrimaryPartner.svelte';
	import SecondaryPartner from './SecondaryPartner.svelte';
	import TertiaryPartner from './TertiaryPartner.svelte';
	import Partner from './Partner.svelte';
</script>

<Section class="pt-16 md:pt-32">
	<Container>
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-8">
			<PrimaryPartner class="col-span-2 sm:col-span-4" />
			<SecondaryPartner class="order-2 col-span-2 sm:order-4" />
			<TertiaryPartner class="order-1 col-span-2 sm:order-3" />
			<Partner class="order-last sm:order-1" logo="/assets/logos/logo-3.jpg" />
			<Partner class="order-last sm:order-2" logo="/assets/logos/logo-1.avif" />
			<Partner class="order-last sm:order-5" logo="/assets/logos/logo-2.avif" />
			<Partner class="order-last sm:order-6" logo="/assets/logos/logo-4.avif" />
		</div>
	</Container>
</Section>
