<script>
	import FooterSection from '$lib/components/sections/FooterSection/FooterSection.svelte';
	import HeaderSection from '$lib/components/sections/HeaderSection/HeaderSection.svelte';
	import MapContainer from '$lib/components/sections/MapSection/MapContainer.svelte';
</script>

<div class="relative h-screen">
	<MapContainer />
	<div class="absolute top-0 right-0 left-0">
		<HeaderSection class="border-b-4 bg-[#d0fa93]" />
	</div>
	<div class="pointer-events-none absolute right-0 bottom-0 left-0">
		<FooterSection class="*:pointer-events-auto" />
	</div>
</div>
