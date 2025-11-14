// src/lib/services/api.ts

export interface ExperienceData {
    firstname: string;
    lastname: string;
    message: string;
    journeyPictures: File[];
    idPicture?: File;
    coordinates: { lat: number; lon: number };
}

export const api = {
    submitExperience: async (data: ExperienceData): Promise<{ success: boolean; message: string }> => {
        console.log("Submitting experience data:", data);

        const formData = new FormData();
        formData.append('firstname', data.firstname);
        formData.append('lastname', data.lastname);
        formData.append('message', data.message);
        formData.append('coordinates', JSON.stringify(data.coordinates));

        data.journeyPictures.forEach((file, index) => {
            formData.append(`journeyPicture_${index}`, file);
        });

        if (data.idPicture) {
            formData.append('idPicture', data.idPicture);
        }

        // Mocking the API call
        return new Promise(resolve => {
            setTimeout(() => {
                console.log("Mock API call successful");
                // Here you would use fetch:
                // try {
                //     const response = await fetch('/api/experience', {
                //         method: 'POST',
                //         body: formData,
                //     });
                //     if (response.ok) {
                //         resolve({ success: true, message: 'Experience submitted successfully!' });
                //     } else {
                //         resolve({ success: false, message: 'Failed to submit experience.' });
                //     }
                // } catch (error) {
                //     resolve({ success: false, message: 'An error occurred.' });
                // }
                resolve({ success: true, message: 'Votre expérience a été partagée avec succès !' });
            }, 1000); // 1 second delay
        });
    }
};
