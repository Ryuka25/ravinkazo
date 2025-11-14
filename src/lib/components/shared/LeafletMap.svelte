<script lang="ts">
	import { onMount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type L from 'leaflet';

	type Props = {
		lat: number;
		lon: number;
		onLocationChange: (lat: number, lon: number) => void;
	} & HTMLAttributes<HTMLDivElement>;

	let { lat, lon, onLocationChange, ...props }: Props = $props();

	let mapElement: HTMLElement;
	let mapInstance = $state<L.Map | undefined>(undefined);
	let markerInstance = $state<L.Marker | undefined>(undefined);
	let Leaflet: typeof L | undefined; // Store the Leaflet object

	onMount(() => {
		const initMap = async () => {
			Leaflet = (await import('leaflet')).default; // Assign to component-scoped variable
			await import('leaflet/dist/leaflet.css');

			// clean up default icon path
			delete (Leaflet.Icon.Default.prototype as any)._getIconUrl;
			Leaflet.Icon.Default.mergeOptions({
				iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
				iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
				shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
			});

			mapInstance = Leaflet.map(mapElement).setView([lat, lon], 13);

			Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(mapInstance);

			markerInstance = Leaflet.marker([lat, lon], { draggable: true }).addTo(mapInstance);

			markerInstance.on('dragend', () => {
				const { lat, lng } = markerInstance!.getLatLng();
				onLocationChange(lat, lng);
			});
		};

		initMap();

		return () => {
			if (mapInstance) {
				mapInstance.remove();
			}
		};
	});

	// Effect to react to changes in lat/lon props
	$effect(() => {
		if (mapInstance && markerInstance && Leaflet) {
			// Check if Leaflet is loaded
			const newLatLng = Leaflet.latLng(lat, lon);
			markerInstance.setLatLng(newLatLng);
			mapInstance.flyTo(newLatLng, 13);
		}
	});
</script>

<div bind:this={mapElement} class="h-64 w-full rounded-lg" {...props}></div>
