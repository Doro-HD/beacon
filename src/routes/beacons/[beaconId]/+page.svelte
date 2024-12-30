<script lang="ts">
	import { page } from '$app/state';
	import { SquareArrowOutUpRight } from 'lucide-svelte';

	import { beaconStore } from '$lib/api/beacons';
	import { getRSSItems } from '$lib/tauri/commands/rss';
	import Button from '$lib/ui/components/button/Button.svelte';
	import { CardDisplay, type CardProps } from '$lib/ui/components/card';
	import { result } from '$lib/util';

	let rssItemsPromise = $derived.by(async () => {
		const beaconId = page.params.beaconId;
		const beacon = beaconStore.find(beaconId);
		if (!beacon) {
			throw Error('Could not find beacon with id: ' + beaconId);
		}

		const rssItemResults = await getRSSItems(beacon.url);
		if (rssItemResults.status === 'error') {
			throw Error(rssItemResults.reason);
		}

		return rssItemResults.data.map((rssItemResult) =>
			result.unwrapOr(rssItemResult, {
				title: 'Error: Could not get all the information for this item',
				description:
					'Some of the information for this item, like the title and description, was not available',
				url: ''
			})
		);
	});
</script>

<div class="px-5">
	{#await rssItemsPromise}
		<p>Loading...</p>
	{:then rssItems}
		{@const cards = rssItems.map((rssItem) => ({
			card: { title: rssItem.title, description: rssItem.description },
			meta: { rssUrl: rssItem.url }
		}))}

		<CardDisplay dataCards={cards}>
			{#snippet dataActions(meta)}
				<Button options={{ href: meta.rssUrl, target: '_blank' }} variant={{ filled: 'warning' }}>
					Source
					<SquareArrowOutUpRight></SquareArrowOutUpRight>
				</Button>
			{/snippet}
		</CardDisplay>
	{:catch err}
		<p>Error: {err}</p>
	{/await}
</div>
