<script lang="ts">
	import FileInput from '$lib/components/shared/FileInput.svelte';
	import LeafletMap from '$lib/components/shared/LeafletMap.svelte';
	import { api } from '$lib/services/api';
	import { Button } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { cn } from '$lib/utils';
	import { LoaderCircle } from '@lucide/svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { toast } from 'svelte-sonner';

	let isSubmitting = $state(false);

	const resetForm = () => {
		currentStep = 1;
		firstname = '';
		lastname = '';
		message = '';
		journeyPictures = [];
		coordinates = null;
		wantsToReceiveMoney = false;
		idPicture = [];
		email = '';
		isSubmitting = false;
	};

	const onShareExperience = async () => {
		isSubmitting = true;
		const experienceData = {
			firstname: firstname,
			lastname: lastname,
			message: message,
			journeyPictures: journeyPictures,
			idPicture: idPicture.length > 0 ? idPicture[0] : undefined,
			coordinates: coordinates!, // The submit button is disabled if coordinates is null
			email: email // Added email to experienceData
		};

		// Show a loading toast
		const promise = api.submitExperience(experienceData);

		toast.promise(promise, {
			loading: 'Envoi de votre expérience...',
			success: (res) => {
				isSubmitting = false; // Reset submitting state
				if (res.success) {
					resetForm();
					return res.message;
				} else {
					// If the API call was not successful (e.g., non-2xx status handled by API service)
					// we throw an error to trigger the error toast.
					throw new Error(res.message || 'Une erreur est survenue lors de la soumission.');
				}
			},
			error: (err: unknown) => {
				console.log('err', err);
				isSubmitting = false;
				if (err instanceof Error) {
					return err.message;
				}
				return 'Une erreur est survenue lors de la soumission de votre expérience.';
			}
		});
	};

	type Props = HTMLAttributes<HTMLDivElement>;
	let { class: className, ...props }: Props = $props();

	let currentStep = $state(1);

	// Step 1 data
	let firstname = $state('');
	let lastname = $state('');
	let message = $state('');

	// Step 2 data
	let journeyPictures = $state<File[]>([]);

	// Step 3 data
	let coordinates = $state<{ lat: number; lon: number } | null>(null);
	let isLoadingLocation = $state(false);
	const defaultLocation = { lat: -18.8792, lon: 47.5079 }; // Antananarivo

	// Step 4 data
	let wantsToReceiveMoney = $state(false);
	let idPicture = $state<File[]>([]);
	let email = $state('');

	let showConfirmationDialog = $state(false);
	let isSubmittingWithCompensation = $state(false); // To store the choice before dialog confirmation

	const nextStep = () => {
		currentStep++;
	};

	const prevStep = () => {
		currentStep--;
	};

	const getGpsLocation = (isRetry = false) => {
		isLoadingLocation = true;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					coordinates = {
						lat: position.coords.latitude,
						lon: position.coords.longitude
					};
					isLoadingLocation = false;
					if (isRetry) toast.success('Position trouvée !');
				},
				() => {
					isLoadingLocation = false;
					if (!coordinates) {
						coordinates = defaultLocation;
					}
					toast.error("Impossible d'obtenir votre position. Vous pouvez la définir manuellement.");
				}
			);
		} else {
			isLoadingLocation = false;
			if (!coordinates) {
				coordinates = defaultLocation;
			}
			toast.error(
				"La géolocalisation n'est pas supportée. Vous pouvez définir votre position manuellement."
			);
		}
	};

	const onMapLocationChange = (lat: number, lon: number) => {
		coordinates = { lat, lon };
	};

	const handleSubmission = () => {
		isSubmittingWithCompensation = idPicture.length > 0;
		showConfirmationDialog = true; // Open the dialog
	};

	const confirmSubmission = () => {
		wantsToReceiveMoney = isSubmittingWithCompensation;
		onShareExperience();
		showConfirmationDialog = false; // Close the dialog
	};

	const cancelSubmission = () => {
		showConfirmationDialog = false; // Close the dialog
	};

	// Reactive statement to trigger location on step entry
	$effect(() => {
		if (currentStep === 3 && !coordinates && !isLoadingLocation) {
			getGpsLocation();
		}
	});
</script>

<div class={cn('flex gap-6 pt-16', className)} {...props}>
	<div class="flex w-1/2 flex-col gap-6 rounded-lg bg-[#f2f2f2] p-16">
		<div class="pb-8 text-center font-heading text-3xl font-bold">Partager mon experience</div>
		<!-- Step 1: Names and Message -->
		{#if currentStep === 1}
			<div class="grid grid-cols-2 gap-4">
				<div class="flex flex-col gap-4">
					<Label for="firstname">Votre nom</Label>
					<Input type="text" placeholder="Rakoto" id="firstname" bind:value={firstname} />
				</div>
				<div class="flex flex-col gap-4">
					<Label for="lastname">Votre prénom</Label>
					<Input type="text" placeholder="Jean" id="lastname" bind:value={lastname} />
				</div>
			</div>
			<div class="flex flex-col gap-4">
				<Label for="message">Votre message</Label>
				<Textarea id="message" bind:value={message} />
			</div>
			<Button onclick={nextStep} disabled={!firstname || !lastname || !message}>Suivant</Button>
		{/if}

		<!-- Step 2: Journey Pictures -->
		{#if currentStep === 2}
			<div class="flex flex-col gap-4">
				<Label for="day-pictures">Photos de votre journée</Label>
				<p class="text-sm text-gray-600">
					Veuillez partager des photos de votre expérience de plantation. Montrez-nous votre nouvel
					arbre !
				</p>
				<FileInput bind:files={journeyPictures} multiple id="day-pictures" />
			</div>
			<div class="flex justify-between">
				<Button variant="outline" onclick={prevStep}>Précédent</Button>
				<Button onclick={nextStep} disabled={journeyPictures.length === 0}>Suivant</Button>
			</div>
		{/if}

		<!-- Step 3: GPS -->
		{#if currentStep === 3}
			<div class="flex flex-col gap-4">
				<Label>Localisation GPS</Label>
				<p class="text-sm text-gray-600">
					Partagez votre position pour que nous puissions localiser l'arbre. Vous pouvez ajuster la
					position en déplaçant le marqueur.
				</p>

				{#if isLoadingLocation && !coordinates}
					<p class="text-center text-gray-500">Chargement de votre position...</p>
				{:else if coordinates}
					<div class="relative">
						<LeafletMap
							lat={coordinates.lat}
							lon={coordinates.lon}
							onLocationChange={onMapLocationChange}
						/>
						<Button
							variant="outline"
							class="absolute right-2 bottom-2 z-1000"
							onclick={() => getGpsLocation(true)}
						>
							Obtenir ma position
						</Button>
					</div>
				{/if}
			</div>
			<div class="flex justify-between">
				<Button variant="outline" onclick={prevStep}>Précédent</Button>
				<Button onclick={nextStep} disabled={!coordinates}>Suivant</Button>
			</div>
		{/if}

		<!-- Step 4: ID Picture and Email -->
		{#if currentStep === 4}
			<div class="flex flex-col gap-4">
				<Label for="email">Votre adresse e-mail</Label>
				<p class="text-sm text-gray-600">
					Pour recevoir votre compensation, veuillez fournir une adresse e-mail valide.
				</p>
				<Input type="email" placeholder="email@example.com" id="email" bind:value={email} />
			</div>
			<div class="flex flex-col gap-4">
				<Label for="id-picture">Photo de votre CIN ou carte d'identité</Label>
				<p class="text-sm text-gray-600">
					Pour recevoir votre compensation, veuillez fournir une pièce d'identité.
				</p>
				<FileInput bind:files={idPicture} id="id-picture" />
				<div class="text-sm">
					<span class="font-bold">Conseil:</span> Assurez-vous que votre photo est claire et que toutes
					les informations sont lisibles. Ceci est nécessaire pour valider votre identité pour la compensation.
				</div>
			</div>
			<div class="flex justify-between">
				<Button variant="outline" onclick={prevStep}>Précédent</Button>
				<Button
					onclick={handleSubmission}
					disabled={isSubmitting || (idPicture.length > 0 && !email)}
				>
					{#if isSubmitting}
						<LoaderCircle class="mr-2 animate-spin" />
						Envoi en cours...
					{:else}
						{idPicture.length > 0 ? 'Soumettre avec compensation' : 'Soumettre sans compensation'}
					{/if}
				</Button>
			</div>
		{/if}
	</div>
	<div class="flex w-1/2 flex-col items-center justify-center gap-16 rounded-lg bg-primary p-16">
		<div class="font-heading text-3xl font-bold">
			Laisse
			<span class="inline-block -rotate-2 border-4 bg-white shadow-neo">pousser</span>
			le
			<span class="inline-block rotate-2 border-4 bg-white shadow-neo">futur</span>
		</div>

		<p class="text-center text-lg">
			Regardez l'évolution de votre arbre, sa taille et la densité des feuilles. Chaque progrès est
			un succès.
		</p>
	</div>
</div>

<!-- Confirmation Dialog -->
<Dialog bind:open={showConfirmationDialog}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Confirmer votre soumission</DialogTitle>
			<DialogDescription>
				{#if isSubmittingWithCompensation}
					Vous êtes sur le point de soumettre votre expérience avec une demande de compensation.
					Veuillez confirmer.
				{:else}
					Vous êtes sur le point de soumettre votre expérience sans demande de compensation.
					Veuillez confirmer.
				{/if}
			</DialogDescription>
		</DialogHeader>
		<DialogFooter>
			<Button variant="outline" onclick={cancelSubmission}>Annuler</Button>
			<Button onclick={confirmSubmission}>Confirmer</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
