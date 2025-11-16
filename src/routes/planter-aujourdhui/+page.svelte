<script>
	import FooterSection from '$lib/components/sections/FooterSection/FooterSection.svelte';
	import HeaderSection from '$lib/components/sections/HeaderSection/HeaderSection.svelte';
	import PlanterAujourdhuiEtapesSection from '$lib/components/sections/PlanterAujourdhuiEtapesSection/PlanterAujourdhuiEtapesSection.svelte';
	import PlanterAujourdhuiHeroSection from '$lib/components/sections/PlanterAujourdhuiHeroSection/PlanterAujourdhuiHeroSection.svelte';
	import SEO from '$lib/components/shared/SEO.svelte';
</script>

<div>
	<HeaderSection />
	<PlanterAujourdhuiHeroSection />
	<PlanterAujourdhuiEtapesSection />
	<div class="my-24"></div>
	<FooterSection />
</div>

<SEO title="Planter aujourd'hui ✨" />
