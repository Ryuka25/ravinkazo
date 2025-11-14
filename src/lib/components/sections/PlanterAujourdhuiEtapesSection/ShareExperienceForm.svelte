<script lang="ts">
	import AppButton from '$lib/components/shared/AppButton.svelte';
	import FileInput from '$lib/components/shared/FileInput.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	const onShareExperience = () => {
		alert('experience shared');
	};

	type Props = HTMLAttributes<HTMLDivElement>;
	let { class: className, ...props }: Props = $props();

	let dayPictures = $state<File[]>([]);
	let idPicture = $state<File[]>([]);
</script>

<div class={cn('flex gap-6 pt-16', className)} {...props}>
	<div class="flex w-1/2 flex-col gap-6 rounded-lg bg-[#f2f2f2] p-16">
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col gap-4">
				<Label for="firstname">Votre nom</Label>
				<Input type="text" placeholder="Rakoto" id="firstname" />
			</div>
			<div class="flex flex-col gap-4">
				<Label for="lastname">Votre prénom</Label>
				<Input type="text" placeholder="Jean" id="lastname" />
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<Label for="message">Votre message</Label>
			<Textarea id="message" />
		</div>
		<div class="flex flex-col gap-4">
			<Label for="day-pictures">Insérer des photos de votre journée</Label>
			<FileInput bind:files={dayPictures} multiple id="day-pictures" />
		</div>
		<div class="flex flex-col gap-4">
			<Label for="id-picture">Insérer une photo de CIN pour valider votre identité</Label>
			<FileInput bind:files={idPicture} id="id-picture" />
		</div>

		<AppButton onclick={onShareExperience}>Obtenir mes Ravinkazo</AppButton>
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
