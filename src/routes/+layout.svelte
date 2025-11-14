<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

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

{@render children()}
