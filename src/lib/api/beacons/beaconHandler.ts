import { BaseDirectory } from '@tauri-apps/plugin-fs';
import { z } from 'zod';
import cuid2 from '@paralleldrive/cuid2';

import { fs } from '$lib/tauri';
import { beaconSchema, type Beacon } from './beaconModel';
import { result, type Result, safeJSON, type Option } from '$lib/util';

const FILE_NAME = 'data/beacons.json';
const BASE_DIR = BaseDirectory.AppData;

/**
 * @description
 * A function that exposes a way for the rest of the application to create a beacon from the local file system
 * @param {Beacon} beaconPrimitive - The beacon that should be added to the beacon file
 * @returns - A result that tells if the create operation was a success
 */
export async function handleCreateBeacon(
	beaconPrimitive: Omit<Beacon, 'id'>
): Promise<Result<Beacon, string>> {
	const beacon: Beacon = { ...beaconPrimitive, id: cuid2.createId() };
	const createFn = (data: Beacon[]) => result.ok([...data, beacon]);

	const overWriteResult = await overWriteBeaconFile(createFn);

	return result.map(overWriteResult, () => result.ok(beacon));
}

/**
 * @description
 * A function that exposes a way for the rest of the application to retrieve all beacons from the local file system
 * @returns - A result that tells if the create operation was a success
 */
export async function handleGetBeacons(): Promise<Result<Beacon[], string>> {
	const readResult = await readBeaconFile();

	return result.map(readResult, (data) => {
		const parseResult = safeJSON.parseWithSchema(data, z.array(beaconSchema));
		if (parseResult.status === 'error') {
			return result.err('Corrupted file');
		}

		return result.ok(parseResult.data);
	});
}

/**
 * @description
 * A function that exposes a way for the rest of the application to update a beacon from the local file system
 * @param {Beacon} updatedBeacon - A beacon that will be used to overwrite an existing one, its id is used to select the beacon to overwrite
 * @returns - A result that tells if the update operation was a success
 */
export async function handleUpdateBeacon(
	updatedBeacon: Beacon
): Promise<Result<Option<Beacon>, string>> {
	let foundBeacon = false;
	const updateFn = (beaconFileObj: Beacon[]) => {
		const updatedFileObj = beaconFileObj.map((beacon) => {
			if (beacon.id === updatedBeacon.id) {
				foundBeacon = true;

				return updatedBeacon;
			}

			return beacon;
		});

		return result.ok(updatedFileObj);
	};

	const overwriteResult = await overWriteBeaconFile(updateFn);

	return result.map(overwriteResult, () => {
		switch (foundBeacon) {
			case true:
				return result.ok(updatedBeacon);
			case false:
				return result.ok(undefined);
		}
	});
}

/**
 * @description
 * A function that exposes a way for the rest of the application to delete a beacon from the local file system
 * @param {string} beaconId - The id of a beacon, used to select the correct beacon for deletion
 * @returns - A result that tells if the delete operation was a success
 */
export async function handleDeleteBeacon(
	beaconId: string
): Promise<Result<Option<Beacon>, string>> {
	let beacon: Option<Beacon> = undefined;
	const deleteFn = (beaconFileObj: Beacon[]) => {
		const beaconIndex = beaconFileObj.findIndex((beacon) => beacon.id === beaconId);
		if (beaconIndex < 0) {
			return result.ok(beaconFileObj);
		}

		const deletedBeacons = beaconFileObj.slice(beaconIndex, beaconIndex + 1);
		beacon = deletedBeacons.at(0);

		return result.ok(beaconFileObj);
	};

	const overWriteResult = await overWriteBeaconFile(deleteFn);

	return result.map(overWriteResult, () => {
		return result.ok(beacon);
	});
}

/**
 * @description
 * A private function mean to make it easier to perform operations on the beacon file. Eg, create, read, update and delete
 * @param {(beacons: Beacon[]) => Result<Beacon[], string>} operation - A function representing an operatio to be carried over the contents of the beacon file
 * @returns - A result that tells if the read and write was successful
 */
async function overWriteBeaconFile(
	operation: (beacons: Beacon[]) => Result<Beacon[], string>
): Promise<Result<null, string>> {
	const readResult = await readBeaconFile();
	const writeResult = await result.mapAsync(readResult, async (data) => {
		const parseResult = safeJSON.parseWithSchema(data, z.array(beaconSchema));
		const operationResult = result.map(parseResult, operation);

		const strResult = result.map(operationResult, (data) => safeJSON.stringify(data));

		return result.mapAsync(strResult, (data) => writeBeaconFile(data));
	});

	switch (writeResult.status) {
		case 'success':
			return result.ok(null);
		case 'error':
			return result.err(writeResult.reason);
	}
}

/**
 * @description
 * An private function meant to make it easier to write to the correct file
 * @param {string} content - A string meant to be written to the file
 * @returns {Promise<Result<null, string>>} - A result that tells about the success of the write operation
 */
async function writeBeaconFile(content: string): Promise<Result<null, string>> {
	return fs.writeTextFile(FILE_NAME, content, { baseDir: BASE_DIR });
}

/**
 * @description
 * An private function meant to make it easier to read from the correct file
 * @returns {Promise<Result<null, string>>} - A result that tells about the success of the read operation
 */
async function readBeaconFile(): Promise<Result<string, string>> {
	return fs.readTextFile(FILE_NAME, { baseDir: BASE_DIR });
}
