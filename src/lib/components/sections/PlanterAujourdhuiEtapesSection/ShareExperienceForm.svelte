<script lang="ts">
	import AppButton from '$lib/components/shared/AppButton.svelte';
	import FileInput from '$lib/components/shared/FileInput.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	const onShareExperience = () => {
		// Here I would gather all the $state variables and submit them
		alert('experience shared');
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
	let wantsToReceiveMoney = $state(false);

	// Step 4 data
	let idPicture = $state<File[]>([]);

	const nextStep = () => {
		currentStep++;
	};

	const prevStep = () => {
		currentStep--;
	};

	const getGpsLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					alert(
						`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}. Location will be uploaded.`
					);
				},
				() => {
					alert('Could not get your location.');
				}
			);
		} else {
			alert('Geolocation is not supported by this browser.');
		}
	};
</script>

<div class={cn('flex gap-6 pt-16', className)} {...props}>
	<div class="flex w-1/2 flex-col gap-6 rounded-lg bg-[#f2f2f2] p-16">
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
			<AppButton onclick={nextStep}>Suivant</AppButton>
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
				<AppButton onclick={prevStep}>Précédent</AppButton>
				<AppButton onclick={nextStep}>Suivant</AppButton>
			</div>
		{/if}

		<!-- Step 3: GPS and Money -->
		{#if currentStep === 3}
			<div class="flex flex-col gap-4">
				<Label>Localisation GPS</Label>
				<p class="text-sm text-gray-600">
					Partagez votre position pour que nous puissions localiser l'arbre.
				</p>
				<AppButton onclick={getGpsLocation}>Obtenir ma position GPS</AppButton>

				<div class="flex items-center gap-2 pt-4">
					<input type="checkbox" id="receive-money" bind:checked={wantsToReceiveMoney} />
					<Label for="receive-money"
						>Je souhaite recevoir une compensation pour ma contribution.</Label
					>
				</div>
			</div>
			<div class="flex justify-between">
				<AppButton onclick={prevStep}>Précédent</AppButton>
				{#if wantsToReceiveMoney}
					<AppButton onclick={nextStep}>Suivant</AppButton>
				{:else}
					<AppButton onclick={onShareExperience}>Soumettre</AppButton>
				{/if}
			</div>
		{/if}

		<!-- Step 4: ID Picture -->
		{#if currentStep === 4 && wantsToReceiveMoney}
			<div class="flex flex-col gap-4">
				<Label for="id-picture">Photo de votre CIN ou carte d'identité</Label>
				<p class="text-sm text-gray-600">
					Pour recevoir votre compensation, veuillez fournir une pièce d'identité.
				</p>
				<FileInput bind:files={idPicture} id="id-picture" />
			</div>
			<div class="flex justify-between">
				<AppButton onclick={prevStep}>Précédent</AppButton>
				<AppButton onclick={onShareExperience}>Soumettre</AppButton>
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
