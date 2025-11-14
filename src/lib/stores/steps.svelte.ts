import { STEPS_DETAILS } from '$lib/data/steps';

interface MapState {
	currentIndex: number;
	substepCurrentIndex: number;
}

export const steps = $state<MapState>({
	currentIndex: 0,
	substepCurrentIndex: 0
});

export const isLast = () => STEPS_DETAILS.length - 1 <= steps.currentIndex;

export const currentStep = () => STEPS_DETAILS[steps.currentIndex];

export const isLastSubStep = () => currentStep().subSteps.length - 1 <= steps.substepCurrentIndex;

export const currentSubStep = () =>
	STEPS_DETAILS[steps.currentIndex].subSteps[steps.substepCurrentIndex];

export const nextStep = () => {
	// Check if last substep reached
	if (currentStep().subSteps.length <= steps.substepCurrentIndex + 1) {
		// Check if last step reached
		if (STEPS_DETAILS.length <= steps.currentIndex + 1) return;

		steps.substepCurrentIndex = 0;
		steps.currentIndex = steps.currentIndex + 1;
		return;
	}

	steps.substepCurrentIndex = steps.substepCurrentIndex + 1;
};

export const previousStep = () => {
	// Check if first substep reached
	if (steps.substepCurrentIndex - 1 < 0) {
		// Check if first step reached
		if (steps.currentIndex - 1 < 0) return;

		steps.currentIndex = steps.currentIndex - 1;
		steps.substepCurrentIndex = currentStep().subSteps.length - 1;
		return;
	}

	steps.substepCurrentIndex = steps.substepCurrentIndex - 1;
};
