import { z } from 'zod';
import { BaseDirectory } from '@tauri-apps/plugin-fs';

import { map, type Result } from '$lib/util/result';
import { beaconSchema, type Beacon } from '$lib/types/beacon'
import { fs } from '$lib/tauri';

class BeaconStore {
	#beacons: Beacon[] = $state([]);

	constructor(beacons: Beacon[]) {
	}

	addBeacon(beacon: Beacon): Result<Beacon, string> {
		this.#beacons.push(beacon);

		return {
			status: 'success',
			data: beacon
		};
	}

	getAllBeacons() {
		return this.#beacons;
	}

	findBeacon(beaconId: string): Beacon | undefined {
		return this.#beacons.find(beacon => beacon.id === beaconId);
	}

	updateBeacon(updatedBeacon: Beacon): Result<boolean, string> {
		let wasBeaconUpdated = false;
		this.#beacons = this.#beacons.map(beacon => {
			if (updatedBeacon.id === beacon.id) {
				return updatedBeacon;
			}

			return beacon;
		});

		return {
			status: 'success',
			data: wasBeaconUpdated
		};
	}

	deleteBeacon(beaconId: string): Result<boolean, string> {
		this.#beacons = this.#beacons.filter(beacon => beacon.id === beaconId);

		return {
			status: 'success',
			data: true
		}
	}


}

async function getBeacons(): Promise<Beacon[]> {
	const beaconFile = await fs.readTextFile('beacons.json', { baseDir: BaseDirectory.AppData });
	const foo = map(beaconFile, (data) => {
		const beaconResult = z.array(beaconSchema).safeParse(data);
		if (!beaconResult.success) {
			return {
				status: 'error' as const,
				data: ''
			};
		}

		return {
			status: 'success' as const,
			data: beaconResult.data
		};
	})

	return [];
}

const beacons = await getBeacons();

export const beaconStore = new BeaconStore(beacons);
