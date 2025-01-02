import { option, result, type Result } from '$lib/util';
import { getRSSItems } from '$lib/tauri/commands/rss';
import type { SignalFire } from './signalFireModel';
import { page } from '$app/state';
import { beaconStore } from '../beacons';
import { SvelteMap } from 'svelte/reactivity';

/**
 * @description
 * A store for keeping track of Signal Fires for a collection of Beacons
 */
class SignalFireStore {

	cache: Map<string, { signalFires: SignalFire[], intervalId: number }> = $state(new SvelteMap());
	signalFires: Promise<Result<SignalFire[], string>> = $derived.by(async () => {
		const beaconId = page.params.beaconId;
		const foo = this.cache.get(beaconId);
		if (foo) {
			return result.ok(foo.signalFires);
		}

		const baz = beaconStore.find(beaconId);
		if (option.isNone(baz)) {
			return result.err('Could not find Beacon');
		}

		return this.addSignalFires(baz.id, baz.url);
	});

	async addSignalFires(beaconId: string, beaconUrl: string): Promise<Result<SignalFire[], string>> {
		const rssItemsResult = await this.fetchSignalFires(beaconUrl);

		if (rssItemsResult.status === 'error') {
			return rssItemsResult;
		}

		const intervalId = setInterval(async () => {
			const rssItemsResult = await this.fetchSignalFires(beaconUrl);
			if (rssItemsResult.status === 'success') {
				this.cache.set(beaconId, { signalFires: [{ title: 'Foo', description: 'Foo', url: '' }, ...rssItemsResult.data], intervalId });
			}
		}, 3000);

		this.cache.set(beaconId, { signalFires: rssItemsResult.data, intervalId });

		return result.ok(rssItemsResult.data);
	}

	async fetchSignalFires(beaconUrl: string): Promise<Result<SignalFire[], string>> {
		const rssItemResults = await getRSSItems(beaconUrl);
		if (rssItemResults.status === 'error') {
			return rssItemResults;
		}

		const rssItems = rssItemResults.data.map((rssItemResult) =>
			result.unwrapOr(rssItemResult, {
				title: 'Error: Could not get all the information for this item',
				description:
					'Some of the information for this item, like the title and description, was not available',
				url: ''
			})
		);

		return result.ok(rssItems);
	}
}

export const signalFireStore = new SignalFireStore();
