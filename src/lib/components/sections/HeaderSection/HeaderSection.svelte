<script lang="ts">
	import Container from '$lib/components/shared/Container.svelte';
	import Logo from '$lib/components/shared/Logo.svelte';
	import type { SectionProps } from '$lib/components/shared/Section.svelte';
	import Section from '$lib/components/shared/Section.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { cn } from '$lib/utils';

	import { Menu } from '@lucide/svelte';

	let { class: className }: SectionProps = $props();
</script>

<Section class={cn(className)}>
	<Container>
		<div class="item-end flex items-center justify-between py-8">
			<a href="/">
				<Logo />
			</a>
			<div class="hidden gap-4 lg:flex">
				<Button variant="secondary" class="capitalize" href="/">accueil</Button>
				<Button variant="secondary" class="capitalize" href="/nos-partenaires">
					nos partenaires
				</Button>
				<Button variant="secondary" class="capitalize" href="/explorer-demain">
					explorer demain
				</Button>
				<Button class="capitalize" href="/planter-aujourdhui">planter aujourd'hui</Button>
			</div>
			<div class="block lg:hidden">
				<Sheet.Root>
					<Sheet.Trigger>
						<Button variant="secondary" size="icon">
							<Menu class="size-6" />
						</Button>
					</Sheet.Trigger>
					<Sheet.Content class="p-4">
						<Sheet.Header>
							<Sheet.Title>
								<div class="font-heading text-3xl font-bold md:text-6xl">Ravinkazo</div>
							</Sheet.Title>
						</Sheet.Header>
						<div class="grid gap-4">
							<Button variant="secondary" class="capitalize" href="/">accueil</Button>
							<Button variant="secondary" class="capitalize" href="/nos-partenaires">
								nos partenaires
							</Button>
							<Button variant="secondary" class="capitalize" href="/explorer-demain">
								explorer demain
							</Button>
							<Button class="capitalize" href="/planter-aujourdhui">planter aujourd'hui</Button>
						</div>
					</Sheet.Content>
				</Sheet.Root>
			</div>
		</div>
	</Container>
</Section>
