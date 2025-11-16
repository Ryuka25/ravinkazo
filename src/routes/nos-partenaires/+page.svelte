<script>
	import FooterSection from '$lib/components/sections/FooterSection/FooterSection.svelte';
	import HeaderSection from '$lib/components/sections/HeaderSection/HeaderSection.svelte';
	import NosPartenairesHeroSection from '$lib/components/sections/NosPartenairesHeroSection/NosPartenairesHeroSection.svelte';
	import CtaPartenaire from '$lib/components/sections/NosPartenairesSection/CtaPartenaire.svelte';
	import NosPartenaires from '$lib/components/sections/NosPartenairesSection/NosPartenairesSection.svelte';
	import SEO from '$lib/components/shared/SEO.svelte';
</script>

<div>
	<HeaderSection />
	<NosPartenairesHeroSection />
	<NosPartenaires />
	<CtaPartenaire />
	<FooterSection />
</div>

<SEO title="Nos partenaires 👋" />
