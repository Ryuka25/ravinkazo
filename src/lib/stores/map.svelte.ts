import maplibregl from 'maplibre-gl';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

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

// --- 3D Model Helper Functions ---
interface ModelConfig {
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

export const addRandomModelAndFlyTo = () => {
	if (!map.instance) return;

	modelCounter++;
	const randomLng = MAP_CONFIG.initialCenter[0] + (Math.random() - 0.5) * 0.01;
	const randomLat = MAP_CONFIG.initialCenter[1] + (Math.random() - 0.5) * 0.01;
	const newCoords: [number, number] = [randomLng, randomLat];

	const newModelConfig: ModelConfig = {
		id: `random-model-${modelCounter}`,
		origin: newCoords,
		altitude: 0,
		rotation: [Math.PI / 2, 0, 0],
		path: '/assets/34M_17/34M_17.gltf'
	};

	const newLayer = create3DModelLayer(newModelConfig);
	map.instance.addLayer(newLayer);

	map.instance.flyTo({
		center: newCoords,
		zoom: 18,
		pitch: 75
	});
};
