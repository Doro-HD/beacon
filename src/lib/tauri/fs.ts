import {
	exists as tauriExists,
	mkdir as tauriMkdir,
	readTextFile as tauriReadTextFile,
	writeTextFile as tauriWriteTextFile,
	type ExistsOptions,
	type MkdirOptions,
	type ReadDirOptions,
	type WriteFileOptions
} from '@tauri-apps/plugin-fs';
import { result, type Result } from '$lib/util';

/**
 * @description
 * A safe wrapper around Tauri's exists function. Checks if a path exists
 * @param {string} path - The path that is checked for existance
 * @returns {Promise<Result<boolean, string>>} - The result that tells if the operation was a success
 */
export async function exists(
	path: string,
	options?: ExistsOptions
): Promise<Result<boolean, string>> {
	try {
		const pathExists = await tauriExists(path, options);

		return result.ok(pathExists);
	} catch (e) {
		return result.err(`Could not check if path exists due to: ${e}`);
	}
}

/**
 * @description
 * A safe wrapper around Tauri's mkdir function. Create a directory in the given path
 * @param {string | URL} path - The path where the dir should be created
 * @param {MkdirOptions} options - Options for creating the dir
 * @returns - A result that tells if the operation was a success
 */
export async function mkdir(path: string | URL, options?: MkdirOptions): Promise<Result<null, string>> {
	try {
		await tauriMkdir(path, options);

		return result.ok(null);
	} catch (e) {
		return result.err(`Could not create dir due to: ${e}`);
	}
}

/**
 * @description
 * A safe wrapper around Tauri's readTextFile function
 */
export async function readTextFile(
	path: string | URL,
	options?: ReadDirOptions
): Promise<Result<string, string>> {
	try {
		const fileContent = await tauriReadTextFile(path, options);

		return result.ok(fileContent);
	} catch (err) {
		return result.err(`Could not read from file due to: ${err}`);
	}
}

/**
 * @description
 * A safe wrapper around Tauri's writeTextFile function
 */
export async function writeTextFile(
	path: string | URL,
	data: string,
	options?: WriteFileOptions
): Promise<Result<null, string>> {
	try {
		await tauriWriteTextFile(path, data, options);

		return result.ok(null);
	} catch (e) {
		return result.err(`Could not write to file due to: ${e}`);
	}
}
