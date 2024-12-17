import { readTextFile as tauriReadTextFile, type ReadDirOptions, writeTextFile as tauriWriteTextFile, type WriteFileOptions } from "@tauri-apps/plugin-fs";
import type { Result } from "$lib/util/result";

/**
* @description
* A safe wrapper around Tauri's readTextFile function
*/
export async function readTextFile(path: string | URL, options?: ReadDirOptions): Promise<Result<string, string>> {
	try {
		const fileContent = await tauriReadTextFile(path, options);

		return {
			status: 'success',
			data: fileContent
		}

	} catch (err) {
		return {
			status: 'error',
			data: `Could not read from file due to: ${err}`
		}
	}
}

/**
* @description
* A safe wrapper around Tauri's writeTextFile function
*/
export async function writeTextFile(path: string | URL, data: string, options?: WriteFileOptions): Promise<Result<string, string>> {
	try {
		await tauriWriteTextFile(path, data, options);

		return {
			status: 'success',
			data: data
		}

	} catch (err) {
		return {
			status: 'error',
			data: `Could not write to file due to: ${err}`
		}
	}
}

