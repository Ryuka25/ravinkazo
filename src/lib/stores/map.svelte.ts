import maplibregl from 'maplibre-gl';

// Constants
const MAP_CONFIG = {
	initialZoom: 17,
	// Antanarivo, Anosy
	initialCenter: [47.522, -18.917] as [number, number],
	initialPitch: 70,
	initialBearing: 0,
	maxZoom: 18,
	minZoom: 3,
	maxPitch: 80,
	minPitch: 30,
	style: 'https://tiles.openfreemap.org/styles/liberty'
};

interface MapState {
	zoom: number;
	center: [number, number];
	bearing: number;
	pitch: number;
	instance: maplibregl.Map | null;
}

export const map = $state<MapState>({
	instance: null,
	zoom: MAP_CONFIG.initialZoom,
	center: MAP_CONFIG.initialCenter,
	pitch: MAP_CONFIG.initialPitch,
	bearing: MAP_CONFIG.initialBearing
});

export const initializeMap = (ref: HTMLElement) => {
	map.instance = new maplibregl.Map({
		container: ref,
		center: map.center,
		zoom: map.zoom,
		bearing: map.bearing,
		style: MAP_CONFIG.style,
		pitch: map.pitch,
		minPitch: MAP_CONFIG.minPitch,
		maxPitch: MAP_CONFIG.maxPitch,
		maxZoom: MAP_CONFIG.maxZoom,
		minZoom: MAP_CONFIG.minZoom
	});

	// Set projection to globe
	map.instance.on('style.load', () => {
		map.instance?.setProjection({
			type: 'globe'
		});
	});

	map.instance.addControl(
		new maplibregl.NavigationControl({
			visualizePitch: true,
			showZoom: true,
			showCompass: true
		})
	);

	map.instance.on('load', () => {
		map.instance?.setSky({
			'sky-color': '#7db9e8',
			'horizon-color': '#ffffff',
			'sky-horizon-blend': 0.5
		});
	});

	map.instance.on('move', () => {
		const c = map.instance!.getCenter();
		map.center = [c.lng, c.lat];
		map.zoom = map.instance!.getZoom();
		map.pitch = map.instance!.getPitch();
		map.bearing = map.instance!.getBearing();
	});
};

export const resetMapToDefaultPosition = () => {
	if (!map.instance) return;

	map.instance.flyTo({
		center: MAP_CONFIG.initialCenter,
		zoom: MAP_CONFIG.initialZoom,
		pitch: MAP_CONFIG.initialPitch,
		bearing: MAP_CONFIG.initialBearing
	});
};
