<script>
	import HeaderSection from '$lib/components/sections/HeaderSection/HeaderSection.svelte';
	import MapContainer from '$lib/components/sections/MapSection/MapContainer.svelte';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTitle,
		DialogFooter,
		DialogClose
	} from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import SEO from '$lib/components/shared/SEO.svelte';

	let showWelcomeDialog = $state(false);

	onMount(() => {
		showWelcomeDialog = true;

		window.scrollTo(0, document.body.scrollHeight);
	});
</script>

<div class="relative h-screen">
	<MapContainer class="pt-16 md:pt-12" />
	<div class="absolute top-0 right-0 left-0">
		<HeaderSection class="bg-background" />
	</div>
</div>

<Dialog bind:open={showWelcomeDialog}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle class="sr-only">Explorer Demain</DialogTitle>
		</DialogHeader>
		<div class="py-4">
			<p>
				La carte se met à jour en temps réel pour vous guider vers les dernières actions de
				reforestation. Explorez, suivez, partagez : chaque arbre planté dessine notre avenir commun.
			</p>
		</div>
		<DialogFooter>
			<DialogClose>
				<Button class="w-full md:w-auto" type="button" onclick={() => (showWelcomeDialog = false)}>
					C'est compris !
				</Button>
			</DialogClose>
		</DialogFooter>
	</DialogContent>
</Dialog>

<SEO title="Explorer demain 🌍" />
