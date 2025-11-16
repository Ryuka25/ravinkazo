<script>
	import CtaSection from '$lib/components/sections/CtaSection/CtaSection.svelte';
	import CultiverDemainSection from '$lib/components/sections/CultiverDemainSection/CultiverDemainSection.svelte';
	import FooterSection from '$lib/components/sections/FooterSection/FooterSection.svelte';
	import HeaderSection from '$lib/components/sections/HeaderSection/HeaderSection.svelte';
	import HeroSection from '$lib/components/sections/HeroSection/HeroSection.svelte';
	import PlanterAujourdhuiSection from '$lib/components/sections/PlanterAujourdhuiSection/PlanterAujourdhuiSection.svelte';

	import arrowLtr from '$lib/assets/arrow-ltr.svg';
	import GagnerRecompenseSection from '$lib/components/sections/GagnerRecompenseSection/GagnerRecompenseSection.svelte';
	import SEO from '$lib/components/shared/SEO.svelte';
</script>

<div>
	<HeaderSection />
	<HeroSection />
	<PlanterAujourdhuiSection />
	<div class="-mb-32 flex w-full items-center justify-center">
		<img src={arrowLtr} alt="" class="md:w-1/2" />
	</div>
	<CultiverDemainSection />
	<div class="-mb-32 flex w-full items-center justify-center">
		<img src={arrowLtr} alt="" class="scale-x-[-1] md:w-1/2" />
	</div>
	<GagnerRecompenseSection />
	<CtaSection />
	<FooterSection />
</div>

<SEO title="Planter aujourd'hui, Cultiver demain 🍃" />
