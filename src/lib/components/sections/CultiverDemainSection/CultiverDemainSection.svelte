<script>
	import Container from '$lib/components/shared/Container.svelte';
	import Section from '$lib/components/shared/Section.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { MoveRight } from '@lucide/svelte';

	import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';
</script>

<Section class="pt-32">
	<Container>
		<div class="flex items-center justify-center gap-16 p-16">
			<div class="flex w-1/2 flex-col gap-8">
				<div class="font-heading text-4xl font-bold">Cultiver Demain !</div>
				<p class="text-lg">
					Chaque graine plantée, chaque savoir partagé, est un acte de reconstruction — un geste
					doux mais puissant pour retisser le lien avec le monde qui nous porte.
				</p>
			</div>
			<div class="relative w-1/2">
				<div class="aspect-video rounded-lg bg-[#f2f2f2]">
					<div class="scale-175">
						<DotLottieSvelte src="/assets/animations/greenify.json" loop autoplay speed={0.5} />
					</div>
				</div>
				<div class="absolute bottom-0 -translate-x-1/2 translate-y-1/2">
					<Button variant="secondary" href="/explorer-demain">
						Explorer le monde de demain
						<MoveRight class="size-6" />
					</Button>
				</div>
			</div>
		</div>
	</Container>
</Section>
