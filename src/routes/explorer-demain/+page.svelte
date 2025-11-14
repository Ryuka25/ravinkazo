<script>
	import HeaderSection from '$lib/components/sections/HeaderSection/HeaderSection.svelte';
	import MapContainer from '$lib/components/sections/MapSection/MapContainer.svelte';
</script>

<div class="relative h-screen">
	<MapContainer class="pt-12" />
	<div class="absolute top-0 right-0 left-0">
		<HeaderSection class="bg-background" />
	</div>
</div>
