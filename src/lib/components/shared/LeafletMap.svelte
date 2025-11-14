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

	onMount(() => {
		let map: L.Map;

		const initMap = async () => {
			const L = (await import('leaflet')).default;
			await import('leaflet/dist/leaflet.css');

			// clean up default icon path
			delete (L.Icon.Default.prototype as any)._getIconUrl;
			L.Icon.Default.mergeOptions({
				iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
				iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
				shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
			});

			map = L.map(mapElement).setView([lat, lon], 13);

			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);

			const marker = L.marker([lat, lon], { draggable: true }).addTo(map);

			marker.on('dragend', () => {
				const { lat, lng } = marker.getLatLng();
				onLocationChange(lat, lng);
			});
		};

		initMap();

		return () => {
			if (map) {
				map.remove();
			}
		};
	});
</script>

<div bind:this={mapElement} class="h-64 w-full rounded-lg" {...props}></div>
