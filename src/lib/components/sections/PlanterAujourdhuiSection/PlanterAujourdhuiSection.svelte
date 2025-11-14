<script>
	import AppButton from '$lib/components/shared/AppButton.svelte';
	import Container from '$lib/components/shared/Container.svelte';
	import Section from '$lib/components/shared/Section.svelte';
	import { MoveRight } from '@lucide/svelte';
</script>

<Section class="pt-32">
	<Container>
		<div class="flex items-center justify-center gap-16 p-16">
			<div class="relative w-1/2">
				<div class="overflow-hidden rounded-lg">
					<img src="/assets/composition-19.png" alt="" />
				</div>
				<div class="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2">
					<AppButton variant="secondary" href="/planter-aujourdhui">
						Commencer à planter
						<MoveRight class="size-6" />
					</AppButton>
				</div>
			</div>
			<div class="flex w-1/2 flex-col gap-8">
				<div class="font-heading text-4xl font-bold">Planter Aujourd'hui !</div>
				<p class="text-lg">
					Planter, c'est bien plus qu'un geste. C'est un acte de foi envers l'avenir, une promesse
					silencieuse faite à la Terre et à l'humanité.
				</p>
			</div>
		</div>
	</Container>
</Section>
