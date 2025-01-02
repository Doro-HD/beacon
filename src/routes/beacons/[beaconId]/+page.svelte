<script lang="ts">
	import { page } from '$app/state';
	import { Avatar } from '@skeletonlabs/skeleton-svelte';
	import { SquareArrowOutUpRight } from 'lucide-svelte';

	import { option } from '$lib/util';
	import { beaconStore } from '$lib/api/beacons';
	import { signalFireStore } from '$lib/api/signalFire';
	import { Button } from '$lib/ui/components/button';
	import { CardDisplay } from '$lib/ui/components/card';
</script>

<div class="space-y-2">
	{#await signalFireStore.signalFires}
		<p>Loading...</p>
	{:then signalFireResult}
		{#if signalFireResult.status === 'success'}
			{@const signalFires = signalFireResult.data}
			<header
				class="sticky left-0 top-0 z-50 flex h-28 w-full items-center gap-x-2 ps-2 preset-filled-surface-100-900"
			>
				<Avatar src="/alt_avatar.png" name="beacon-avatar"></Avatar>

				<!--
				<a href={signalFires.beacon.url} target="_blank" class="h2 underline"
					>{signalFires.beacon.name}</a
				>-->
			</header>

			{@const cards = signalFires.map((rssItem) => ({
				card: {
					title: rssItem.title,
					description: rssItem.description,
					thumbnail: rssItem.thumbnail
				},
				meta: { rssUrl: rssItem.url }
			}))}

			<article class="p-4">
				<CardDisplay dataCards={cards} class="motion-preset-fade-lg">
					{#snippet dataActions(meta)}
						<Button
							options={{ href: meta.rssUrl, target: '_blank' }}
							variant={{ filled: 'warning' }}
						>
							Source
							<SquareArrowOutUpRight></SquareArrowOutUpRight>
						</Button>
					{/snippet}
				</CardDisplay>
			</article>
		{/if}
	{:catch err}
		<p>Error: {err}</p>
	{/await}
</div>
