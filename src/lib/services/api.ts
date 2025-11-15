const API_BASE_URL = 'http://localhost:8000';

export interface Picture {
	id: number;
	path: string;
	experience_id: number;
	is_id_picture: number;
}

export interface Experience {
	id: number;
	firstname: string;
	lastname: string;
	message: string;
	lat: number;
	lon: number;
	added_date: string;
	pictures: Picture[];
}

export interface ExperienceData {
	firstname: string;
	lastname: string;
	message: string;
	journeyPictures: File[];
	idPicture?: File;
	coordinates: { lat: number; lon: number };
	email?: string;
}

export const api = {
	submitExperience: async (
		data: ExperienceData
	): Promise<{ success: boolean; message: string }> => {
		console.log('Submitting experience data:', data);

		const formData = new FormData();
		formData.append('firstname', data.firstname);
		formData.append('lastname', data.lastname);
		formData.append('message', data.message);
		formData.append('coordinates', JSON.stringify(data.coordinates));

		data.journeyPictures.forEach((file) => {
			formData.append(`journeyPictures`, file);
		});

		if (data.idPicture) {
			formData.append('idPicture', data.idPicture);
		}
		if (data.email) {
			formData.append('email', data.email);
		}

		try {
			const response = await fetch(`${API_BASE_URL}/experiences/`, {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				return { success: true, message: 'Experience submitted successfully!' };
			} else {
				return { success: false, message: 'Failed to submit experience.' };
			}
		} catch {
			return { success: false, message: 'An error occurred.' };
		}
	},

	getExperiences: async (): Promise<Experience[]> => {
		try {
			const response = await fetch(`${API_BASE_URL}/experiences/`);
			if (response.ok) {
				return await response.json();
			} else {
				return [];
			}
		} catch {
			return [];
		}
	},

	getExperienceDataById: async (id: string): Promise<Experience | null> => {
		try {
			const response = await fetch(`${API_BASE_URL}/experiences/${id}`);
			if (response.ok) {
				return await response.json();
			} else {
				return null;
			}
		} catch {
			return null;
		}
	}
};
