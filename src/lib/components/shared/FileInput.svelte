<script lang="ts">
	import { cn } from '$lib/utils';
	import { X } from '@lucide/svelte';

	let {
		class: className,
		multiple = false,
		files: filesProp = $bindable([]),
		id = undefined
	}: {
		class?: string;
		multiple?: boolean;
		files?: File[];
		id?: string;
	} = $props();

	let isDragging = $state(false);

	const handleFiles = (fileList: FileList) => {
		const newFiles = Array.from(fileList);
		if (multiple) {
			filesProp = [...filesProp, ...newFiles];
		} else {
			filesProp = newFiles.slice(0, 1);
		}
	};

	const onDrop = (e: DragEvent) => {
		e.preventDefault();
		isDragging = false;
		if (e.dataTransfer?.files) {
			handleFiles(e.dataTransfer.files);
		}
	};

	const onFileChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		if (target.files) {
			handleFiles(target.files);
		}
	};

	const removeFile = (index: number) => {
		filesProp.splice(index, 1);
		filesProp = filesProp; // trigger reactivity
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			inputElement.click();
		}
	};

	let inputElement: HTMLInputElement;
</script>

<div class={cn('flex flex-col gap-4', className)}>
	<div
		role="button"
		tabindex="0"
		class={cn(
			'flex h-32 w-full cursor-pointer items-center justify-center rounded-none border-2 border-black bg-gray-50 text-center shadow-neo hover:bg-gray-100',
			{ 'border-primary': isDragging },
			className
		)}
		onclick={() => inputElement.click()}
		onkeydown={onKeyDown}
		ondragenter={() => (isDragging = true)}
		ondragover={(e) => {
			e.preventDefault();
			isDragging = true;
		}}
		ondragleave={() => (isDragging = false)}
		ondrop={onDrop}
	>
		<p class="text-sm text-gray-500 sm:text-base">
			Glissez-déposez des fichiers ici ou cliquez pour sélectionner
		</p>
		<input
			{id}
			type="file"
			bind:this={inputElement}
			{multiple}
			class="hidden"
			onchange={onFileChange}
			accept="image/*"
		/>
	</div>

	{#if filesProp.length > 0}
		<div class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
			{#each filesProp as file, index (file.name)}
				<div class="relative">
					<img
						src={URL.createObjectURL(file)}
						alt={file.name}
						class="h-24 w-full rounded-lg object-cover"
					/>
					<button
						onclick={() => removeFile(index)}
						class="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-1 text-white"
						title="Remove file"
					>
						<X size={16} />
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>
