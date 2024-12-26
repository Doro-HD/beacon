import type { ClientInit } from '@sveltejs/kit';
import { BaseDirectory } from '@tauri-apps/plugin-fs';

import { fs } from '$lib/tauri';
import { result } from '$lib/util';

export const init: ClientInit = async () => {
	// checks if the data dir is in AppData, else creates it
	const dataDirExistsResult = await fs.exists('data', { baseDir: BaseDirectory.AppData });
	await result.mapAsync(dataDirExistsResult, async (dirExists) => {
		if (!dirExists) {
			const mkdirResult = await fs.mkdir('data', { baseDir: BaseDirectory.AppData });

			return mkdirResult;
		}

		return result.ok(null);
	});

	// checks if the beacon.json file exist
	const beaconFileExistsResult = await fs.exists('data/beacons.json', {
		baseDir: BaseDirectory.AppData
	});
	await result.mapAsync(beaconFileExistsResult, async (fileExists) => {
		if (!fileExists) {
			// initializes the file as an empty array
			const mkdirResult = await fs.writeTextFile('data/beacons.json', '[]', {
				baseDir: BaseDirectory.AppData
			});

			return mkdirResult;
		}

		return result.ok(null);
	});
};
