import maplibregl from 'maplibre-gl';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { addExperience } from './experiences.svelte';
import type { Experience } from '$lib/services/api';
import { SvelteDate } from 'svelte/reactivity';
import type { ExperienceWithModel } from './experiences.svelte';

// Constants
export const MAP_CONFIG = {
	initialZoom: 17,
	// Antanarivo, Anosy
	initialCenter: [47.522, -18.917] as [number, number],
	initialPitch: 50,
	initialBearing: 0,
	maxZoom: 18,
	minZoom: 3,
	maxPitch: 60,
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

export interface ModelDetails {
	id: string;
	name: string;
	description: string;
	addedDate: string;
	coordinates: [number, number];
}

export const map = $state<MapState>({
	instance: null,
	zoom: MAP_CONFIG.initialZoom,
	center: MAP_CONFIG.initialCenter,
	pitch: MAP_CONFIG.initialPitch,
	bearing: MAP_CONFIG.initialBearing
});

export const modelSheet = $state({
	selectedModel: null as ModelDetails | null,
	isModelSheetOpen: false
});

import { api } from '$lib/services/api';

// ... other code

export function openModelSheet(id: string) {
	modelSheet.isModelSheetOpen = true;
	modelSheet.selectedModel = null; // Clear previous selection for loading state

	api
		.getExperienceDataById(id)
		.then((data) => {
			if (data) {
				modelSheet.selectedModel = {
					id: data.id.toString(), // Convert number to string
					name: `${data.firstname} ${data.lastname}`, // Combine firstname and lastname
					description: data.message, // Map message to description
					addedDate: data.added_date, // Map added_date to addedDate
					coordinates: [data.lon, data.lat] // Map lat/lon to coordinates array
				};
			} else {
				console.error(`No experience data found for ID: ${id}`);
			}
		})
		.catch((error) => {
			console.error('Error fetching experience data:', error);
		});
}

export function closeModelSheet() {
	modelSheet.isModelSheetOpen = false;
}

// --- 3D Model Helper Functions ---
export interface ModelConfig {
	id: string;
	origin: [number, number];
	altitude: number;
	rotation: [number, number, number];
	path: string;
}

function calculateModelTransform(modelConfig: ModelConfig) {
	const mercatorCoord = maplibregl.MercatorCoordinate.fromLngLat(
		modelConfig.origin,
		modelConfig.altitude
	);

	return {
		translateX: mercatorCoord.x,
		translateY: mercatorCoord.y,
		translateZ: mercatorCoord.z,
		rotateX: modelConfig.rotation[0],
		rotateY: modelConfig.rotation[1],
		rotateZ: modelConfig.rotation[2],
		scale: mercatorCoord.meterInMercatorCoordinateUnits()
	};
}

function createLights() {
	const lights: { position: THREE.Vector3Tuple }[] = [
		{ position: [0, -70, 100] },
		{ position: [0, 70, 100] }
	];

	return lights.map(({ position }) => {
		const light = new THREE.DirectionalLight(0xffffff);
		light.position.set(...position).normalize();
		return light;
	});
}

function createRotationMatrix(axis: THREE.Vector3, angle: number) {
	return new THREE.Matrix4().makeRotationAxis(axis, angle);
}

function create3DModelLayer(modelConfig: ModelConfig) {
	const modelTransform = calculateModelTransform(modelConfig);

	type CustomLayer = maplibregl.AddLayerObject & {
		scene?: THREE.Scene;
		camera?: THREE.Camera;
		renderer?: THREE.WebGLRenderer;
		map?: maplibregl.Map;
	};

	const customLayer: CustomLayer = {
		id: modelConfig.id,
		type: 'custom',
		renderingMode: '3d',

		onAdd(map, gl) {
			this.camera = new THREE.Camera();
			this.scene = new THREE.Scene();
			this.map = map;

			// Add lighting
			createLights().forEach((light) => this.scene?.add(light));

			// Load 3D model
			const loader = new GLTFLoader();
			loader.load(modelConfig.path, (gltf) => {
				this.scene?.add(gltf.scene);
			});

			// Initialize renderer
			this.renderer = new THREE.WebGLRenderer({
				canvas: map.getCanvas(),
				context: gl,
				antialias: true
			});
			this.renderer.autoClear = false;
		},

		render(gl, args) {
			if (!this.camera || !this.scene || !this.renderer || !this.map) return;

			// Create rotation matrices
			const rotationX = createRotationMatrix(new THREE.Vector3(1, 0, 0), modelTransform.rotateX);
			const rotationY = createRotationMatrix(new THREE.Vector3(0, 1, 0), modelTransform.rotateY);
			const rotationZ = createRotationMatrix(new THREE.Vector3(0, 0, 1), modelTransform.rotateZ);

			// Calculate projection matrix
			const projectionMatrix = new THREE.Matrix4().fromArray(args.defaultProjectionData.mainMatrix);
			const modelMatrix = new THREE.Matrix4()
				.makeTranslation(
					modelTransform.translateX,
					modelTransform.translateY,
					modelTransform.translateZ
				)
				.scale(new THREE.Vector3(modelTransform.scale, -modelTransform.scale, modelTransform.scale))
				.multiply(rotationX)
				.multiply(rotationY)
				.multiply(rotationZ);

			this.camera.projectionMatrix = projectionMatrix.multiply(modelMatrix);
			this.renderer.resetState();
			this.renderer.render(this.scene, this.camera);
			this.map.triggerRepaint();
		}
	};

	return customLayer;
}

// --- End of Helper Functions ---

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
		minZoom: MAP_CONFIG.minZoom,
		canvasContextAttributes: { antialias: true }
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

		map.instance?.addSource('clickable-points', {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: []
			}
		});
		map.instance?.addLayer({
			id: 'clickable-points-layer',
			type: 'circle',
			source: 'clickable-points',
			paint: {
				'circle-radius': 30, // Adjust for click area
				'circle-opacity': 0 // Invisible
			}
		});

		map.instance?.on('click', 'clickable-points-layer', (e) => {
			if (e.features && e.features.length > 0) {
				const feature = e.features[0];
				const details = JSON.parse(feature.properties.details);
				openModelSheet(details.id); // Pass the ID
			}
		});

		// Change cursor to pointer when hovering over clickable points
		map.instance?.on('mouseenter', 'clickable-points-layer', () => {
			if (map.instance) map.instance.getCanvas().style.cursor = 'pointer';
		});
		map.instance?.on('mouseleave', 'clickable-points-layer', () => {
			if (map.instance) map.instance.getCanvas().style.cursor = '';
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

let modelCounter = 0;

export function addExperienceModelToMap(experience: ExperienceWithModel) {
	if (!map.instance) return;

	const modelConfig: ModelConfig = {
		id: experience.modelId,
		origin: [experience.lon, experience.lat],
		altitude: 0, // Default altitude
		rotation: [Math.PI / 2, 0, 0], // Default rotation
		path: '/assets/34M_17/34M_17.gltf' // Default model path
	};

	// Add 3D model layer
	if (!map.instance.getLayer(modelConfig.id)) {
		const newLayer = create3DModelLayer(modelConfig);
		map.instance.addLayer(newLayer);
	}

	// Add clickable point to GeoJSON source
	// const source = map.instance.getSource('clickable-points') as maplibregl.GeoJSONSource;
	// const data = source._data as GeoJSON.FeatureCollection;
	// data.features.push({
	// 	type: 'Feature',
	// 	geometry: {
	// 		type: 'Point',
	// 		coordinates: modelConfig.origin // Use the origin from modelConfig
	// 	},
	// 	properties: {
	// 		details: JSON.stringify({ id: experience.id.toString() })
	// 	}
	// });
	// source.setData(data);

	alert('here2');
}

export const addRandomModelAndFlyTo = () => {
	if (!map.instance) return;

	modelCounter++;
	const randomLng = MAP_CONFIG.initialCenter[0] + (Math.random() - 0.5) * 0.02;
	const randomLat = MAP_CONFIG.initialCenter[1] + (Math.random() - 0.5) * 0.02;
	const newCoords: [number, number] = [randomLng, randomLat];

	const modelId = `random-model-${modelCounter}`;

	const newModelConfig: ModelConfig = {
		id: modelId,
		origin: newCoords,
		altitude: 0,
		rotation: [Math.PI / 2, 0, 0],
		path: '/assets/34M_17/34M_17.gltf'
	};
	// Create a mock Experience object
	const newExperience: Experience = {
		id: modelCounter, // Use modelCounter as a mock ID
		firstname: 'Random',
		lastname: 'User',
		message: `Cet arbre a été ajouté de manière aléatoire pour la démonstration. ID: ${modelCounter}`,
		lat: newCoords[1],
		lon: newCoords[0],
		added_date: new SvelteDate().toISOString(),
		pictures: [] // No pictures for mock
	};

	// Add the new experience to the experiences store
	addExperience(newExperience);

	// Add 3D model layer
	if (!map.instance.getLayer(modelId)) {
		const newLayer = create3DModelLayer(newModelConfig);
		map.instance.addLayer(newLayer);
	}

	// Add clickable point to GeoJSON source
	const source = map.instance.getSource('clickable-points') as maplibregl.GeoJSONSource;
	const data = source._data as GeoJSON.FeatureCollection;
	data.features.push({
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: newCoords
		},
		properties: {
			// Pass the ID of the new experience
			details: JSON.stringify({ id: newExperience.id.toString() }) // openModelSheet expects string ID
		}
	});
	source.setData(data);

	map.instance.flyTo({
		center: newCoords,
		zoom: 18,
		pitch: 75
	});
};
