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

	import { MoveLeft } from '@lucide/svelte';

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
	<Container class="relative">
		<div class="rounded-lg bg-[#f2f2f2] p-8 py-16">
			<div class="text-end font-heading text-4xl font-bold">
				{#if showForm}
					Partager votre éxpérience avec le monde
				{/if}
				{#if !showForm}
					Étape {steps.currentIndex + 1} : <span>{currentStep().name}</span>
				{/if}
			</div>
			<div class="flex gap-16 pt-16">
				<img
					class="-ml-36 aspect-square w-2/3 rounded-lg object-cover"
					src="/assets/composition-19.png"
					alt=""
				/>
				<div class="flex w-full flex-col gap-8">
					{#if showForm}
						<ShareExperienceForm />
					{:else}
						<div class="flex flex-1 flex-col justify-between">
							<div class="rounded-lg bg-white p-6">
								<div class="font-heading text-2xl font-bold">{currentSubStep().name}</div>
								<div class="pt-8">
									<Accordion.Root type="single">
										{#each currentSubStep().faqs as faq, idx}
											<Accordion.Item value={`faq-${idx}`}>
												<Accordion.Trigger class="bg-[#23d58c]">{faq.question}</Accordion.Trigger>
												<Accordion.Content class="bg-[#f2f2f2]">
													{faq.response}
												</Accordion.Content>
											</Accordion.Item>
										{/each}
									</Accordion.Root>
								</div>
							</div>
							<div class="flex items-center justify-between gap-4 pt-16">
								{#each currentStep().subSteps as _, idx}
									{#if idx != 0}
										<div
											class={cn(
												'h-6 w-16 rounded-lg bg-white',
												steps.substepCurrentIndex >= idx && 'bg-[#23d58c]'
											)}
										></div>
									{/if}
									<div
										class={cn(
											'flex size-24 items-center justify-center rounded-lg bg-white font-heading text-4xl font-bold',
											steps.substepCurrentIndex >= idx && 'bg-[#23d58c]'
										)}
									>
										{idx + 1}
									</div>
								{/each}
							</div>
						</div>
						<button
							class="border-4 bg-primary p-8 font-heading text-3xl font-bold text-primary-foreground shadow-neo transition-all duration-100 hover:translate-x-1 hover:translate-y-1 hover:bg-primary/80 hover:shadow-none"
							onclick={onNextStep}
						>
							Aller à l'étape suivante
						</button>
					{/if}
				</div>
			</div>
		</div>

		<div class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
			<button
				class="flex size-32 items-center justify-center border-4 bg-secondary shadow-neo transition-all duration-100 hover:translate-x-1 hover:translate-y-1 hover:bg-secondary/80 hover:shadow-none"
				onclick={onPreviousStep}
			>
				<MoveLeft class="size-22" />
			</button>
		</div>
		<img src={Tree} alt="" class="absolute -right-20 bottom-0 size-64 translate-y-1/2 rotate-12" />
	</Container>
</Section>
