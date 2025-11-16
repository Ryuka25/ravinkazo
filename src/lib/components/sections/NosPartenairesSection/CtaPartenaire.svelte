<script>
	import Container from '$lib/components/shared/Container.svelte';
	import Section from '$lib/components/shared/Section.svelte';

	import { MoveRight } from '@lucide/svelte';
</script>

<Section class="py-16 md:py-32">
	<Container>
		<div
			class="flex flex-col items-center justify-center gap-16 rounded-lg bg-primary p-8 text-primary-foreground md:p-16"
		>
			<div class="text-center font-heading text-3xl font-bold md:text-5xl">
				Cultivons l'
				<span class="inline-block -rotate-2 border-4 bg-white shadow-neo">avenir</span>
				,
				<span class="inline-block rotate-2 border-4 bg-white shadow-neo">ensemble</span>
			</div>
			<p class="max-w-lg text-center text-lg">
				Associez votre marque à un projet qui récompense l'écologie autant que vos clients. Devenez
				partenaire et transformez vos actions responsables en valeur concrète.
			</p>
			<div>
				<a
					href="mailto:contact.dreamit.mg@gmail.com"
					class="flex items-center justify-center gap-8 border-4 bg-white p-4 font-heading text-xl font-bold shadow-neo transition-all duration-100 hover:translate-x-1 hover:translate-y-1 hover:bg-white/80 hover:shadow-none md:p-8 md:text-3xl"
				>
					Devenir partenaire du futur
					<MoveRight class="size-10 md:size-16" />
				</a>
			</div>
		</div>
	</Container>
</Section>
