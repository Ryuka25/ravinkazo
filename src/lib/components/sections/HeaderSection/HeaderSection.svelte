<script>
	import AppButton from '$lib/components/shared/AppButton.svelte';
	import Container from '$lib/components/shared/Container.svelte';
	import Section from '$lib/components/shared/Section.svelte';
	import * as Sheet from '$lib/components/ui/sheet';

	import { Hamburger } from '@lucide/svelte';
</script>

<Section>
	<Container>
		<div class="item-end flex items-center justify-between py-4">
			<a class="font-heading text-3xl font-bold md:text-6xl" href="/">GreenDay</a>
			<div class="hidden gap-4 md:flex">
				<AppButton variant="secondary" class="capitalize" href="/">accueil</AppButton>
				<AppButton variant="secondary" class="capitalize" href="/explorer-demain">
					explorer demain
				</AppButton>
				<AppButton class="capitalize" href="/planter-aujourdhui">planter aujourd'hui</AppButton>
			</div>
			<div class="block md:hidden">
				<Sheet.Root>
					<Sheet.Trigger>
						<AppButton variant="secondary" size="icon">
							<Hamburger class="size-6" />
						</AppButton>
					</Sheet.Trigger>
					<Sheet.Content class="p-4">
						<Sheet.Header>
							<Sheet.Title>
								<div class="font-heading text-3xl font-bold md:text-6xl">GreenDay</div>
							</Sheet.Title>
						</Sheet.Header>
						<div class="grid gap-4">
							<AppButton variant="secondary" class="capitalize" href="/">accueil</AppButton>
							<AppButton variant="secondary" class="capitalize" href="/explorer-demain">
								explorer demain
							</AppButton>
							<AppButton class="capitalize" href="/planter-aujourdhui"
								>planter aujourd'hui</AppButton
							>
						</div>
					</Sheet.Content>
				</Sheet.Root>
			</div>
		</div>
	</Container>
</Section>
