<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import MapToolBox from './MapToolBox.svelte';
	import { cn } from '$lib/utils';
	import Map from './Map.svelte';
	import ModelSheet from './ModelSheet.svelte';
	import MapWebsocket from './MapWebsocket.svelte';

	import { map, resetMapToDefaultPosition } from '$lib/stores/map.svelte';
	import { Sheet, SheetContent, SheetHeader, SheetTitle } from '$lib/components/ui/sheet';
	import { addExperienceModelToMap } from '$lib/stores/map.svelte';
	import { onMount } from 'svelte'; // Keep onMount
	import { experiences, fetchExperiences } from '$lib/stores/experiences.svelte';
	import ExperiencesList from './ExperiencesList.svelte';

	type MapContainerProps = HTMLAttributes<HTMLDivElement>;

	let { class: className, ...props }: MapContainerProps = $props();

	onMount(async () => {
		await fetchExperiences(); // Call fetchExperiences from the store
		experiences.data.map((experience) => {
			addExperienceModelToMap(experience);
		});
	});

	let isExperiencesSheetOpen = $state(false);

	const openExperiencesSheet = () => {
		isExperiencesSheetOpen = true;
	};

	const closeExperiencesSheet = () => {
		isExperiencesSheetOpen = false;
	};
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
			onShowAllClick={openExperiencesSheet}
		/>
	</div>

	<!-- New scrollable list of experiences -->
	<div
		class="pointer-events-none absolute top-0 left-0 hidden h-1/2 w-full p-4 pt-20 *:pointer-events-auto md:block"
	>
		<div class="h-full w-full overflow-y-auto rounded-lg bg-white p-4 shadow-lg md:max-w-xs">
			<ExperiencesList />
		</div>
	</div>
</div>

<ModelSheet />
<MapWebsocket />
<Sheet
	open={isExperiencesSheetOpen}
	onOpenChange={(v) => {
		if (!v) {
			closeExperiencesSheet();
		}
	}}
>
	<SheetContent side="top" class="w-full max-w-2xl overflow-y-scroll">
		<SheetHeader>
			<SheetTitle class="sr-only">Experiences Partagé</SheetTitle>
		</SheetHeader>
		<ExperiencesList onExperienceClickCallback={closeExperiencesSheet} />
	</SheetContent>
</Sheet>
