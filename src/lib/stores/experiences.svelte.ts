// src/lib/stores/experiences.svelte.ts
import { api, type Experience } from '$lib/services/api';

export interface ExperienceWithModel extends Experience {
	modelId: string;
}

export const experiences = $state<{ data: ExperienceWithModel[] }>({ data: [] });

export async function fetchExperiences() {
	const fetchedExperiences = await api.getExperiences();
	experiences.data = fetchedExperiences.map((exp) => {
		const experienceWithModel = {
			...exp,
			modelId: `experience-model-${exp.id}` // Generate a unique modelId
		};
		return experienceWithModel;
	});
}

export function addExperience(newExperience: Experience) {
	const experienceWithModel: ExperienceWithModel = {
		...newExperience,
		modelId: `experience-model-${newExperience.id}` // Generate a unique modelId
	};
	experiences.data.unshift(experienceWithModel); // Add to the beginning of the list
}
