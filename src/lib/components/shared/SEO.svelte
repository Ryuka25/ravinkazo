<script lang="ts">
	type SEOProps = {
		title: string;
	};

	let { title }: SEOProps = $props();
	let image = 'https://ravinkazo.vercel.app/opengraph-image.png';
	let description =
		"En plantant aujourd'hui, tu offres à demain une chance de fleurir. Une graine mise en terre, un rêve éveillé : tout commence par un geste simple.";
</script>

<svelte:head>
	<title>{title} • Ravinkazo</title>
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:image" content={image} />
</svelte:head>
