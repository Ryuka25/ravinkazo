<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import MapToolBox from './MapToolBox.svelte';
	import { cn } from '$lib/utils';
	import Map from './Map.svelte';
	import ModelSheet from './ModelSheet.svelte';

	import { map, MAP_CONFIG, resetMapToDefaultPosition } from '$lib/stores/map.svelte';
	import { onMount } from 'svelte'; // Keep onMount
	import { experiences, fetchExperiences } from '$lib/stores/experiences.svelte';
	import type { Experience } from '$lib/services/api';

	type MapContainerProps = HTMLAttributes<HTMLDivElement>;

	let { class: className, ...props }: MapContainerProps = $props();

	onMount(async () => {
		await fetchExperiences(); // Call fetchExperiences from the store
	});

	function flyToExperience(experience: Experience) {
		if (map.instance) {
			map.instance.flyTo({
				center: [experience.lon, experience.lat], // Coordinates are [lon, lat]
				zoom: MAP_CONFIG.initialZoom, // A reasonable zoom level
				pitch: MAP_CONFIG.initialPitch, // A reasonable zoom level
				essential: true // This animation is considered essential with respect to other animations
			});
		}
	}
</script>

<div class={cn('relative h-full', className)} {...props}>
	<Map class="absolute inset-0" />
	<div class="pointer-events-none absolute bottom-0 w-full p-4 *:pointer-events-auto">
		<MapToolBox
			coord={map.center}
			zoom={map.zoom}
			pitch={map.pitch}
			bearing={map.bearing}
			onResetClick={resetMapToDefaultPosition}
		/>
	</div>

	<!-- New scrollable list of experiences -->
	<div
		class="pointer-events-none absolute top-0 left-0 h-1/2 w-full p-4 pt-20 *:pointer-events-auto"
	>
		<div class="h-full w-full overflow-y-auto rounded-lg bg-white p-4 shadow-lg md:max-w-xs">
			<h2 class="mb-4 text-center font-heading font-bold">Expériences Partagées</h2>
			{#if experiences.data.length === 0}
				<p class="text-center text-gray-500">Aucune expérience partagée pour le moment.</p>
			{:else}
				<ul class="">
					{#each experiences.data as experience (experience.id)}
						<li>
							<button
								type="button"
								class="w-full cursor-pointer rounded-md p-2 px-3 text-left hover:bg-gray-50"
								onclick={() => flyToExperience(experience)}
							>
								<h3 class="font-semibold">
									{`${experience.firstname} ${experience.lastname}`.substring(0, 20)}...
								</h3>
								<p class="text-xs text-gray-400">
									{new Date(experience.added_date).toLocaleDateString()}
								</p>
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>

<ModelSheet />
