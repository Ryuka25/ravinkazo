<script lang="ts">
	import { experiences } from '$lib/stores/experiences.svelte';
	import { flyToExperience } from '$lib/stores/map.svelte';

	type Props = {
		onExperienceClickCallback?: () => void;
	};

	let { onExperienceClickCallback }: Props = $props();
</script>

<h2 class="mb-4 text-center font-heading font-bold">Expériences Partagées 🌍</h2>
{#if experiences.data.length === 0}
	<p class="text-center text-gray-500">Aucune expérience partagée pour le moment.</p>
{:else}
	<ul class="">
		{#each experiences.data as experience (experience.id)}
			<li>
				<button
					type="button"
					class="flex w-full cursor-pointer gap-4 rounded-md p-2 px-3 text-left hover:bg-gray-50"
					onclick={() => {
						onExperienceClickCallback?.();
						flyToExperience(experience);
					}}
				>
					<p class="text-2xl">🌳</p>
					<div class="flex flex-col gap-1">
						<h3 class="font-semibold">
							{`${experience.firstname} ${experience.lastname}`.length > 20
								? `${experience.firstname} ${experience.lastname}`.substring(0, 20) + '...'
								: `${experience.firstname} ${experience.lastname}`}
						</h3>
						<p class="text-xs text-gray-400">
							{new Date(experience.added_date).toLocaleDateString()}
						</p>
					</div>
				</button>
			</li>
		{/each}
	</ul>
{/if}
