import { result, type Result, type Option } from '$lib/util';
import { getRSSItems } from '$lib/tauri/commands/rss';
import type { SignalFire } from './signalFireModel';

/**
 * @description
 * A store for keeping track of Signal Fires for a collection of Beacons
 */
class SignalFireStore {
	/**
	 * @description
	 * A map over the fetched Signal Fires, the key being a beacon id
	 */
	signalFires: Map<string, SignalFire[]> = $state(new Map());

	getSignalFires(beaconId: string): Option<SignalFire[]> {
		return this.signalFires.get(beaconId);
	}

	async addSignalFires(beaconId: string, beaconUrl: string): Promise<Result<SignalFire[], string>> {
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

		this.signalFires.set(beaconId, rssItems);

		return result.ok(rssItems);
	}
}

export const signalFireStore = new SignalFireStore();
