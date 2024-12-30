import { result, option } from '$lib/util';
import type { Result, Option } from '$lib/util';
import {
	handleCreateBeacon,
	handleUpdateBeacon,
	handleGetBeacons,
	handleDeleteBeacon
} from '$lib/api/beacons/beaconHandler';
import type { Beacon } from './beaconModel';

class BeaconStore {
	beacons: Beacon[] = $state([]);

	constructor() {
		handleGetBeacons().then((getResult) => {
			switch (getResult.status) {
				case 'success':
					this.beacons = getResult.data;
			}
		});
	}

	async add(beacon: Omit<Beacon, 'id'>): Promise<Result<Beacon, string>> {
		const createResult = await handleCreateBeacon(beacon);

		switch (createResult.status) {
			case 'success':
				this.beacons = [...this.beacons, createResult.data];

				return result.ok(createResult.data);
			case 'error':
				return result.err(createResult.reason);
		}
	}

	find(beaconId: string): Option<Beacon> {
		return this.beacons.find((beacon) => beacon.id === beaconId);
	}

	async update(updatedBeacon: Beacon): Promise<Result<Option<Beacon>, string>> {
		const updateResult = await handleUpdateBeacon(updatedBeacon);

		switch (updateResult.status) {
			case 'success':
				if (option.isSome(updateResult.data)) {
					// typescript could not figure out that updateResult.data is not undefined in the map callback, but it works with a proxy variable
					const data = updateResult.data;
					this.beacons = this.beacons.map((beacon) => {
						if (beacon.id === data.id) {
							return data;
						}

						return beacon;
					});
				}

				return result.ok(updateResult.data);
			case 'error':
				return updateResult;
		}
	}

	async delete(beaconId: string): Promise<Result<Option<Beacon>, string>> {
		const deleteResult = await handleDeleteBeacon(beaconId);

		switch (deleteResult.status) {
			case 'success':
				if (option.isSome(deleteResult.data)) {
					// typescript could not figure out that deleteResult.data is not undefined in the map callback, but it works with a proxy variable
					const data = deleteResult.data;
					this.beacons = this.beacons.filter((beacon) => beacon.id !== data.id);
				}

				return result.ok(deleteResult.data);
			case 'error':
				return deleteResult;
		}
	}
}

export const beaconStore = new BeaconStore();
