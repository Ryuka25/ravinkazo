// src/lib/stores/experiences.svelte.ts
import { api, type Experience } from '$lib/services/api';

export const experiences = $state<{ data: Experience[] }>({ data: [] });

export async function fetchExperiences() {
	experiences.data = await api.getExperiences();
}

export function addExperience(newExperience: Experience) {
	experiences.data.unshift(newExperience); // Add to the beginning of the list
}
