<script lang="ts">
	import { page } from '$app/state';
	import { Avatar } from '@skeletonlabs/skeleton-svelte';
	import { SquareArrowOutUpRight } from 'lucide-svelte';

	import { option } from '$lib/util';
	import { beaconStore } from '$lib/api/beacons';
	import { signalFireStore } from '$lib/api/signalFire';
	import { Button } from '$lib/ui/components/button';
	import { CardDisplay } from '$lib/ui/components/card';
	import { ScrollableArea } from '$lib/ui/components/scrollableArea';

	let rssItemsPromise = $derived.by(async () => {
		const beaconId = page.params.beaconId;
		const beacon = beaconStore.find(beaconId);
		if (!beacon) {
			throw Error('Could not find beacon with id: ' + beaconId);
		}

		const signalFires = signalFireStore.getSignalFires(beacon.id);
		if (option.isSome(signalFires)) {
			return {
				beacon,
				signalFires
			};
		}

		const addResult = await signalFireStore.addSignalFires(beacon.id, beacon.url);
		if (addResult.status === 'error') {
			throw Error(addResult.reason);
		}

		return {
			beacon,
			signalFires: addResult.data
		};
	});
</script>

<div class="space-y-2">
	{#await rssItemsPromise}
		<p>Loading...</p>
	{:then data}
		<header
			class="sticky left-0 top-0 z-50 flex h-28 w-full items-center gap-x-2 ps-2 preset-filled-surface-100-900"
		>
			<Avatar src="/alt_avatar.png" name="beacon-avatar"></Avatar>

			<a href={data.beacon.url} target="_blank" class="h2 underline">{data.beacon.name}</a>
		</header>

		{@const cards = data.signalFires.map((rssItem) => ({
			card: {
				title: rssItem.title,
				description: rssItem.description,
				thumbnail: rssItem.thumbnail
			},
			meta: { rssUrl: rssItem.url }
		}))}

		<article>
			<ScrollableArea class="py-5">
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
			</ScrollableArea>
		</article>
	{:catch err}
		<p>Error: {err}</p>
	{/await}
</div>
