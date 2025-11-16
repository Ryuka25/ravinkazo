<script lang="ts">
	import { onMount } from 'svelte';
	import { experiences } from '$lib/stores/experiences.svelte';
	import { addExperienceModelToMap, flyToExperience } from '$lib/stores/map.svelte';
	import { WEBSOCKET_BASE_URL, type Experience } from '$lib/services/api'; // Assuming ExperienceData is needed for parsing
	import type { ExperienceWithModel } from '$lib/stores/experiences.svelte';

	// WebSocket URL - replace with your actual WebSocket endpoint
	const WEBSOCKET_URL = `${WEBSOCKET_BASE_URL}/ws`; // Placeholder

	onMount(() => {
		const websocket = new WebSocket(WEBSOCKET_URL);

		websocket.onopen = () => {
			console.log('WebSocket connected');
		};

		websocket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			if (message.event_type === 'experience-created') {
				const experienceData: Experience = message.event_details;

				// Create ExperienceWithModel
				const newExperience: ExperienceWithModel = {
					...experienceData,
					modelId: `experience-model-${experienceData.id}` // Generate modelId
				};

				// Add to experiences store
				experiences.data.unshift(newExperience);

				// Add model to map
				addExperienceModelToMap(newExperience);

				// Fly to the new experience
				flyToExperience(newExperience);
			}
		};

		websocket.onclose = () => {
			console.log('WebSocket disconnected');
		};

		websocket.onerror = (error) => {
			console.error('WebSocket error:', error);
		};

		return () => {
			websocket.close();
		};
	});
</script>

<!-- This component does not render any UI elements -->
