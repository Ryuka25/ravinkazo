<script>
	import Container from '$lib/components/shared/Container.svelte';
	import Section from '$lib/components/shared/Section.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { MoveRight } from '@lucide/svelte';

	import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';
</script>

<Section class="pt-32">
	<Container>
		<div class="flex flex-col items-center justify-center gap-16 md:flex-row md:p-16">
			<div class="order-2 flex flex-col gap-8 md:order-1 md:w-1/2">
				<div class="font-heading text-4xl font-bold">Cultiver Demain !</div>
				<p class="text-lg">
					Chaque graine plantée, chaque savoir partagé, est un acte de reconstruction — un geste
					doux mais puissant pour retisser le lien avec le monde qui nous porte.
				</p>
				<Button class="md:hidden" variant="secondary" href="/explorer-demain">
					Explorer le monde de demain
					<MoveRight class="size-6" />
				</Button>
			</div>
			<div class="relative order-1 md:order-2 md:w-1/2">
				<div class="aspect-video rounded-lg bg-[#f2f2f2]">
					<div class="scale-175">
						<DotLottieSvelte src="/assets/animations/greenify.json" loop autoplay speed={0.5} />
					</div>
				</div>
				<div class="absolute bottom-0 hidden -translate-x-1/2 translate-y-1/2 md:block">
					<Button variant="secondary" href="/explorer-demain">
						Explorer le monde de demain
						<MoveRight class="size-6" />
					</Button>
				</div>
			</div>
		</div>
	</Container>
</Section>
