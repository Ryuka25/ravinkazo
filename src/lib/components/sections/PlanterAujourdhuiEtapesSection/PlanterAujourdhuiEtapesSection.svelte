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
		<div class="rounded-lg bg-[#f2f2f2] p-8 py-16">
			<div class="text-end font-heading text-4xl font-bold">Étape 1 : Se procurer un arbre</div>
			<div class="flex gap-16 pt-16">
				<img
					class="-ml-36 aspect-square w-2/3 rounded-lg object-cover"
					src="/assets/composition-19.png"
					alt=""
				/>
				<div class="flex w-full flex-col gap-8">
					<SousEtape class="flex-1" />
					<div
						class="border-4 bg-primary p-8 font-heading text-3xl font-bold text-primary-foreground shadow-neo transition-all duration-100 hover:translate-x-1 hover:translate-y-1 hover:bg-primary/80 hover:shadow-none"
					>
						Aller à l'étape suivante
					</div>
				</div>
			</div>
		</div>

		<div class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
			<div
				class="flex size-32 items-center justify-center border-4 bg-secondary shadow-neo transition-all duration-100 hover:translate-x-1 hover:translate-y-1 hover:bg-secondary/80 hover:shadow-none"
			>
				<MoveLeft class="size-22" />
			</div>
		</div>
		<img src={Tree} alt="" class="absolute -right-20 bottom-0 size-64 translate-y-1/2 rotate-12" />
	</Container>
</Section>
