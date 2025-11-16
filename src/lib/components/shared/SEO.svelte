<script lang="ts">
	type SEOProps = {
		title: string;
	};

	let { title }: SEOProps = $props();
</script>

<svelte:head>
	<title>{title} • Ravinkazo</title>
</svelte:head>
