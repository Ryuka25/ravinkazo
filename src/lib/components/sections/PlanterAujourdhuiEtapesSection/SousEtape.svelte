<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type SousEtapeProps = HTMLAttributes<HTMLDivElement>;

	let { class: className, ...props }: SousEtapeProps = $props();
</script>

<div class={cn('flex flex-col justify-between', className)} {...props}>
	<div class="rounded-lg bg-white p-6">
		<div class="font-heading text-2xl font-bold">Choisir l'espèce adaptée</div>
		<div class="pt-8">
			<Accordion.Root type="single">
				<Accordion.Item value="item-1">
					<Accordion.Trigger class="bg-[#f9edae]">Is it accessible?</Accordion.Trigger>
					<Accordion.Content class="bg-[#f2f2f2]">
						Yes. It adheres to the WAI-ARIA design pattern.
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="item-2">
					<Accordion.Trigger class="bg-[#f9edae]">Is it accessible?</Accordion.Trigger>
					<Accordion.Content class="bg-[#f2f2f2]">
						Yes. It adheres to the WAI-ARIA design pattern.
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</div>
	</div>
	<div class="flex items-center justify-between gap-4 pt-16">
		<div
			class="flex size-24 items-center justify-center rounded-lg bg-[#f9edae] font-heading text-4xl font-bold"
		>
			1
		</div>
		<div class="h-6 w-16 rounded-lg bg-[#f9edae]"></div>
		<div
			class="flex size-24 items-center justify-center rounded-lg bg-[#f9edae] font-heading text-4xl font-bold"
		>
			2
		</div>
		<div class="h-6 w-16 rounded-lg bg-white"></div>
		<div
			class="flex size-24 items-center justify-center rounded-lg bg-white font-heading text-4xl font-bold"
		>
			3
		</div>
	</div>
</div>
