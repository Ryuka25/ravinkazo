<script>
	import Container from '$lib/components/shared/Container.svelte';
	import Section from '$lib/components/shared/Section.svelte';

	import { MoveRight } from '@lucide/svelte';
</script>

<Section class="pt-16 md:py-32">
	<Container>
		<div
			class="flex flex-col items-center justify-center gap-8 rounded-lg bg-primary p-8 text-primary-foreground md:gap-16 md:p-16"
		>
			<div class="text-center font-heading text-3xl font-bold md:text-5xl">
				Laisse
				<span class="inline-block -rotate-2 border-4 bg-white shadow-neo">pousser</span>
				le
				<span class="inline-block rotate-2 border-4 bg-white shadow-neo">futur</span>
			</div>
			<p class="max-w-lg text-center text-lg">
				En plantant aujourd'hui, tu offres à demain une chance de fleurir. Une graine mise en terre,
				un rêve éveillé : tout commence par un geste simple.
			</p>
			<div>
				<a
					href="/planter-aujourdhui"
					class="flex items-center justify-center gap-4 border-4 bg-white p-4 font-heading text-lg font-bold shadow-neo transition-all duration-100 hover:translate-x-1 hover:translate-y-1 hover:bg-white/80 hover:shadow-none md:gap-8 md:p-8 md:text-3xl"
				>
					Commencer à planter
					<MoveRight class="size-10 md:size-16" />
				</a>
			</div>
		</div>
	</Container>
</Section>
