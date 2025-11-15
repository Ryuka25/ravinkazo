<script lang="ts">
	import {
		Sheet,
		SheetContent,
		SheetDescription,
		SheetHeader,
		SheetTitle
	} from '$lib/components/ui/sheet';
	import { modelSheet, closeModelSheet } from '$lib/stores/map.svelte';
</script>

<Sheet
	open={modelSheet.isModelSheetOpen}
	onOpenChange={(v) => {
		if (!v) {
			closeModelSheet();
		}
	}}
>
	<SheetContent>
		<SheetHeader>
			<SheetTitle>{modelSheet.selectedModel?.name ?? 'Détails du modèle'}</SheetTitle>
			<SheetDescription>Informations sur le point d'intérêt sélectionné.</SheetDescription>
		</SheetHeader>
		{#if modelSheet.selectedModel}
			<div class="flex flex-col gap-4 py-4">
				<div>
					<h3 class="font-bold">Description</h3>
					<p>{modelSheet.selectedModel.description}</p>
				</div>
				<div>
					<h3 class="font-bold">Coordonnées</h3>
					<p>
						{modelSheet.selectedModel.coordinates[0].toFixed(5)}, {modelSheet.selectedModel.coordinates[1].toFixed(5)}
					</p>
				</div>
				<div>
					<h3 class="font-bold">Date d'ajout</h3>
					<p>{new Date(modelSheet.selectedModel.addedDate).toLocaleString()}</p>
				</div>
			</div>
		{/if}
	</SheetContent>
</Sheet>
