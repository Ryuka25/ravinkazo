<script>
	import Container from '$lib/components/shared/Container.svelte';
	import Section from '$lib/components/shared/Section.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { MoveRight } from '@lucide/svelte';

	import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';
</script>

<Section class="pt-32">
	<Container>
		<div class="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16 md:p-16">
			<div class="relative md:w-1/2">
				<div class="aspect-video rounded-lg bg-[#f2f2f2]">
					<div class="scale-225">
						<DotLottieSvelte src="/assets/animations/moneytree.json" loop autoplay />
					</div>
				</div>
				<div class="absolute right-0 bottom-0 hidden translate-x-1/2 translate-y-1/2 md:block">
					<Button variant="secondary" href="/nos-partenaires">
						Connaitre nos partenaires
						<MoveRight class="size-6" />
					</Button>
				</div>
			</div>
			<div class="flex flex-col gap-8 md:w-1/2">
				<div class="font-heading text-4xl font-bold">Gagnez des Ravinkazo</div>
				<p class="text-lg text-pretty">
					Plantez un arbre, récoltez des Ravinkazo (Ra-vin-ka-zu) ! Chaque Ravinkazo vous ouvre les
					portes à réductions, cadeaux et avantages exclusifs auprès de nos partenaires.
				</p>
			</div>
		</div>
	</Container>
</Section>
