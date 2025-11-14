<script lang="ts">
	import { onMount } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three-stdlib';
	import { Button } from '$lib/components/ui/button/index.ts';

	let counter = 0;

	// Constants
	const MAP_CONFIG = {
		initialZoom: 17,
		initialCenter: [148.9819, -35.3981] as [number, number],
		initialPitch: 70,
		maxZoom: 18,
		maxPitch: 85,
		style: 'https://tiles.openfreemap.org/styles/liberty'
	} as const;

	const MODELS_CONFIG = [
		{
			id: 'model-1',
			origin: [148.9819, -35.39847] as [number, number],
			altitude: 0,
			rotation: [Math.PI / 2, 0, 0] as [number, number, number],
			path: '/assets/34M_17/34M_17.gltf'
		}
	] as const;

	// State
	let zoom: number = MAP_CONFIG.initialZoom;
	let center = MAP_CONFIG.initialCenter;
	let pitch = MAP_CONFIG.initialPitch;
	let map: maplibregl.Map | null = null;

	// Helper functions
	function calculateModelTransform(modelConfig: (typeof MODELS_CONFIG)[number]) {
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

	// Custom layer factory
	function create3DModelLayer(modelConfig: (typeof MODELS_CONFIG)[number]) {
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
				const projectionMatrix = new THREE.Matrix4().fromArray(
					args.defaultProjectionData.mainMatrix
				);
				const modelMatrix = new THREE.Matrix4()
					.makeTranslation(
						modelTransform.translateX,
						modelTransform.translateY,
						modelTransform.translateZ
					)
					.scale(
						new THREE.Vector3(modelTransform.scale, -modelTransform.scale, modelTransform.scale)
					)
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

	function initializeMap() {
		map = new maplibregl.Map({
			container: 'map',
			style: MAP_CONFIG.style,
			center: MAP_CONFIG.initialCenter,
			zoom: MAP_CONFIG.initialZoom,
			pitch: MAP_CONFIG.initialPitch,
			maxZoom: MAP_CONFIG.maxZoom,
			maxPitch: MAP_CONFIG.maxPitch,
			canvasContextAttributes: { antialias: true }
		});

		map.on('load', () => {
			// Add all models
			MODELS_CONFIG.forEach((modelConfig) => {
				map?.addLayer(create3DModelLayer(modelConfig));
			});
		});

		map.on('move', () => {
			if (!map) return;
			const c = map.getCenter();
			center = [c.lng, c.lat];
			zoom = map.getZoom();
		});
	}

	function resetMapView() {
		if (!map) return;

		counter = counter + 1;
		const long = 148.9819 + counter * 0.0005800000000135697;
		console.log(long);

		map!.addLayer(
			create3DModelLayer({
				id: `model-${counter + 1}`,
				origin: [long, -35.39847] as [number, number], // Slightly east
				altitude: 0,
				rotation: [Math.PI / 2, 0, 0] as [number, number, number],
				path: '/assets/34M_17/34M_17.gltf'
			})
		);

		map.flyTo({
			center: MAP_CONFIG.initialCenter,
			zoom: MAP_CONFIG.initialZoom,
			pitch: MAP_CONFIG.initialPitch
		});
	}

	onMount(() => {
		initializeMap();
	});
</script>

<div class="relative h-screen">
	<div id="map" class="h-full"></div>
	<div class="pointer-events-none absolute top-0 left-0 h-full w-full *:pointer-events-auto">
		<div class="flex max-w-md flex-col gap-2 bg-white p-4">
			<div>Center: {center[0].toFixed(5)}, {center[1].toFixed(5)}</div>
			<div>Zoom: {zoom.toFixed(2)}</div>
			<div>Pitch: {pitch.toFixed(0)}°</div>
			{counter}
			<Button onclick={resetMapView}>Reset View</Button>
		</div>
	</div>
</div>
