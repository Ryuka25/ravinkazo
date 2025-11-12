<script>
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onMount } from 'svelte';

	onMount(() => {
		const map = new maplibregl.Map({
			container: 'map', // container id
			style: 'https://demotiles.maplibre.org/globe.json', // style URL
			center: [0, 0], // starting position [lng, lat]
			zoom: 1 // starting zoom
		});
	});
</script>

<div class="h-screen">
	<!-- <div id="map" class="h-screen">Map is not working</div> -->
</div>
