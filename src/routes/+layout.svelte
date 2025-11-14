<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from 'svelte-sonner';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<style>
		html {
			scroll-behavior: smooth;
		}
	</style>
</svelte:head>

<Toaster
	toastOptions={{
		unstyled: true,
		classes: {
			toast:
				'text-sm rounded-none border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex gap-2',
			title: 'text-black',
			description: 'text-gray-700'
		}
	}}
/>
{@render children()}
