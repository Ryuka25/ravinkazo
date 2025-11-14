<script>
	import * as Accordion from '$lib/components/ui/accordion';

	import Container from '$lib/components/shared/Container.svelte';
	import Section from '$lib/components/shared/Section.svelte';
	import {
		steps,
		nextStep,
		previousStep,
		isLast,
		currentStep,
		currentSubStep,
		isLastSubStep
	} from '$lib/stores/steps.svelte';

	import { MoveLeft, MoveRight } from '@lucide/svelte';

	import Tree from '$lib/assets/tree.png';
	import ShareExperienceForm from './ShareExperienceForm.svelte';
	import { cn } from '$lib/utils';

	let showForm = false;

	const onNextStep = () => {
		if (isLast() && isLastSubStep()) {
			showForm = true;
		} else {
			nextStep();
			showForm = false;
		}
	};

	const onPreviousStep = () => {
		if (!showForm) {
			previousStep();
		}
		showForm = false;
	};
</script>

<Section class="pt-28">
	<Container class="flex flex-col gap-16">
		<div class="text-center font-heading text-4xl font-bold">
			{#if showForm}
				Partager votre éxpérience avec le monde
			{:else}
				Étape {steps.currentIndex + 1} : <span>{currentStep().name}</span>
			{/if}
		</div>
		<div class="flex gap-6">
			<div class="flex w-2/3 flex-col gap-6">
				<div class="relative">
					<div>
						<img
							class="aspect-video rounded-lg object-cover"
							src="/assets/composition-19.png"
							alt=""
						/>
					</div>
					<img
						src={Tree}
						alt=""
						class="absolute top-0 bottom-0 size-64 -translate-x-1/2 -translate-y-1/2 -rotate-12"
					/>
					<img
						src={Tree}
						alt=""
						class="absolute -right-20 bottom-0 z-1 size-64 translate-y-1/2 rotate-12"
					/>
				</div>
				<div class="flex gap-6">
					<button
						class="border-4 bg-white p-8 font-heading text-3xl font-bold text-black shadow-neo transition-all duration-100 hover:translate-x-1 hover:translate-y-1 hover:bg-white/80 hover:shadow-none"
						onclick={onPreviousStep}
					>
						<MoveLeft class="size-10" />
					</button>
					{#if showForm}
						<a
							class="border-4 bg-primary p-8 font-heading text-3xl font-bold text-primary-foreground shadow-neo transition-all duration-100 hover:translate-x-1 hover:translate-y-1 hover:bg-primary/80 hover:shadow-none"
							href="#share-experience"
						>
							Partager mon expérience
						</a>
					{:else}
						<button
							class="flex gap-8 border-4 bg-primary p-8 font-heading text-3xl font-bold text-primary-foreground shadow-neo transition-all duration-100 hover:translate-x-1 hover:translate-y-1 hover:bg-primary/80 hover:shadow-none"
							onclick={onNextStep}
						>
							Aller à l'étape suivante
							<MoveRight class="size-10" />
						</button>
					{/if}
				</div>
			</div>
			<div class="flex w-1/3 flex-col gap-6 rounded-lg bg-[#f2f2f2] p-6">
				<div class="flex items-center justify-between gap-4">
					{#each currentStep().subSteps as _, idx}
						{#if idx != 0}
							<div
								class={cn(
									'h-6 w-16 rounded-lg bg-white',
									steps.substepCurrentIndex >= idx && 'bg-[#f9edae]'
								)}
							></div>
						{/if}
						<div
							class={cn(
								'flex size-16 items-center justify-center rounded-lg bg-white font-heading text-4xl font-bold',
								steps.substepCurrentIndex >= idx && 'bg-[#f9edae]'
							)}
						>
							{idx + 1}
						</div>
					{/each}
				</div>
				<div class="font-heading text-2xl font-bold">{currentSubStep().name}</div>
				<Accordion.Root type="single">
					{#each currentSubStep().faqs as faq, idx}
						<Accordion.Item value={`faq-${idx}`}>
							<Accordion.Trigger class="bg-[#f9edae]">{faq.question}</Accordion.Trigger>
							<Accordion.Content class="bg-white">
								{faq.response}
							</Accordion.Content>
						</Accordion.Item>
					{/each}
				</Accordion.Root>
			</div>
		</div>
		<ShareExperienceForm id="share-experience" class={cn(!showForm && 'hidden')} />
	</Container>
</Section>
