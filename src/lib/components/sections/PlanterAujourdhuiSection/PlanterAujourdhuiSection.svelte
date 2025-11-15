<script lang="ts">
	import Container from '$lib/components/shared/Container.svelte';
	import Section from '$lib/components/shared/Section.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { MoveRight } from '@lucide/svelte';

	import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';
</script>

<Section class="pt-16 md:pt-32">
	<Container>
		<div class="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16 md:p-16">
			<div class="relative md:w-1/2">
				<div class="aspect-video rounded-lg bg-[#f2f2f2]">
					<div class="scale-175">
						<DotLottieSvelte src="/assets/animations/plant.json" loop autoplay />
					</div>
				</div>
				<div class="right-0 bottom-0 md:absolute md:translate-x-1/2 md:translate-y-1/2">
					<Button variant="secondary" href="/planter-aujourdhui" class="hidden">
						Commencer à planter
						<MoveRight class="size-6" />
					</Button>
				</div>
			</div>
			<div class="flex flex-col gap-8 md:w-1/2">
				<div class="font-heading text-4xl font-bold">Planter Aujourd'hui !</div>
				<p class="text-lg">
					Planter, c'est bien plus qu'un geste. C'est un acte de foi envers l'avenir, une promesse
					silencieuse faite à la Terre et à l'humanité.
				</p>
				<Button variant="secondary" href="/planter-aujourdhui" class="w-full">
					Commencer à planter
					<MoveRight class="size-6" />
				</Button>
			</div>
		</div>
	</Container>
</Section>
