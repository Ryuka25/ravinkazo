<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Sheet, SheetContent, SheetHeader, SheetTitle } from '$lib/components/ui/sheet';
	import { getUploadFullPath } from '$lib/services/api';
	import { modelSheet, closeModelSheet } from '$lib/stores/map.svelte';
	import { MoveRight } from '@lucide/svelte';
</script>

<Sheet
	open={modelSheet.isModelSheetOpen}
	onOpenChange={(v) => {
		if (!v) {
			closeModelSheet();
		}
	}}
>
	<SheetContent class="max-w-2xl overflow-y-scroll">
		<SheetHeader>
			<SheetTitle class="sr-only">
				{modelSheet.selectedModel?.name}
			</SheetTitle>
		</SheetHeader>
		<div class="flex flex-col gap-8 p-4 md:p-8">
			{#if modelSheet.selectedModel}
				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-2">
						<img
							src={getUploadFullPath(modelSheet.selectedModel?.pictures[0].path)}
							class="aspect-square rounded-lg object-cover"
							alt=""
						/>
						<div class="grid md:grid-cols-2">
							<div class="flex items-center gap-1">
								<p class="text-lg">📌</p>
								<p class="text-xs">
									{modelSheet.selectedModel.coordinates[0].toFixed(5)}, {modelSheet.selectedModel.coordinates[1].toFixed(
										5
									)}
								</p>
							</div>
							<div class="flex items-center gap-1">
								<p class="text-lg">📆</p>
								<p class="text-xs">
									{new Date(modelSheet.selectedModel.addedDate).toLocaleDateString()}
								</p>
							</div>
						</div>
					</div>
					<div class="font-heading text-xl font-bold">
						{modelSheet.selectedModel?.name}
					</div>
					<div class="flex flex-col items-center gap-2 md:flex-row">
						<div class="self-start text-3xl md:text-6xl">🌳</div>
						<p class="md:text-lg">{modelSheet.selectedModel.description}</p>
					</div>
				</div>
			{/if}
			<div
				class="flex flex-col items-center justify-center gap-8 rounded-lg bg-[#23d58c] p-6 text-primary-foreground"
			>
				<div class="text-center font-heading text-xl font-bold">
					<span class="inline-block -rotate-2 border-4 bg-white shadow-neo">Planter</span>
					<span class="inline-block rotate-2 border-4 bg-white shadow-neo">Aujourd'hui</span>
				</div>
				<div>
					<Button variant="outline" href="/planter-aujourdhui">
						Commencer à planter
						<MoveRight class="md:size-10" />
					</Button>
				</div>
			</div>
		</div>
	</SheetContent>
</Sheet>
