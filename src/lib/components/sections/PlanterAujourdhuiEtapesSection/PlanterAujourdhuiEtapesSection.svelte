<script>
	import AppButton from '$lib/components/shared/AppButton.svelte';
	import Container from '$lib/components/shared/Container.svelte';
	import Section from '$lib/components/shared/Section.svelte';
	import SousEtape from './SousEtape.svelte';

	import { MoveLeft } from '@lucide/svelte';

	import Tree from '$lib/assets/tree.png';
</script>

<Section class="pt-28">
	<Container class="relative">
		<div class="rounded-lg border-4 bg-[#7db9e8] p-8 py-16 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
			<div class="text-end font-heading text-4xl font-bold">Étape 1 : Se procurer un arbre</div>
			<div class="flex gap-16 pt-16">
				<img
					class="-ml-36 aspect-square w-2/3 rounded-lg border-4 object-cover shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
					src="/assets/composition-6.png"
					alt=""
				/>
				<div class="flex w-full flex-col gap-8">
					<SousEtape class="flex-1" />
					<div
						class="rounded-lg border-4 bg-primary/80 p-8 font-heading text-3xl font-bold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-100 hover:translate-x-1 hover:translate-y-1 hover:bg-primary hover:shadow-none"
					>
						Aller à l'étape suivante
					</div>
				</div>
			</div>
		</div>

		<div class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
			<div
				class="flex size-32 items-center justify-center rounded-full border-4 bg-secondary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-100 hover:translate-x-1 hover:translate-y-1 hover:bg-[#f9edae] hover:shadow-none"
			>
				<MoveLeft class="size-22" />
			</div>
		</div>
		<div class="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2">
			<img src={Tree} alt="" class="size-64 rotate-12" />
		</div>
	</Container>
</Section>
