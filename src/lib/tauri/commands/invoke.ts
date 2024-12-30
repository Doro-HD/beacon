import { invoke as tauriInvoke, type InvokeArgs, type InvokeOptions } from '@tauri-apps/api/core';
import { result, type Result } from '$lib/util';

export type RustResult<TOk, TErr> = RustOk<TOk> | RustErr<TErr>;

type RustOk<T> = {
    Ok: T
};

type RustErr<T> = {
    Err: T
};

/**
 * @description
 * A safe wrapper around Tauris invoke function
 * @param {string} command - The command to call from the Tauri backend
 * @param {InvokeArgs} args - The optional arguments to pass to the command
 * @param {InvokeOptions} options - The request options
 * @returns {Promise<Result<T, string>>} - A result object that contains either a Ok value with data or an Err object with a string message
 */
export async function invoke<T>(command: string, args?: InvokeArgs, options?: InvokeOptions): Promise<Result<T, string>> {
    try {
        const data = await tauriInvoke<T>(command, args, options);

        return result.ok(data);
    } catch (e) {
        return result.err('Invoke failed due to: ' + e);
    }
}

/**
 * @description
 * Flattens a nested rust result
 * @param {RustResult<RustResult<TOk, TErr>>} result - The result to flatten
 * @returns {RustResult<TOk, TErr>} - The the nested result object
 */
export function flatten<TOk, TErr>(result: RustResult<RustResult<TOk, TErr>, TErr>): RustResult<TOk, TErr> {
    if ('Ok' in result) {
        return result.Ok;
    } else {
        return result;
    }
}

/**
 * @description
 * Flattens a compound result and rust object into a the nested rust result object
 * @param {Result<RustResult<TOk, TErr>>} result - The result to flatten
 * @returns {RustResult<TOk, TErr>} - The the nested result object
 */
export function flattenCompound<TOk, TErr>(result: Result<RustResult<TOk, TErr>, TErr>): RustResult<TOk, TErr> {
    switch (result.status) {
        case 'success':
            return result.data;
        case 'error':
            return { Err: result.reason };
    }
}

/**
 * @description
 * Converts a rust result object to a discriminated union result object
 * @param {RustResult<TOk, TErr>} rustResult - The Rust like result that should be converted to a result object
 * @returns {Result<TOk, TErr>} - A new result object with the data from the rust result object
 */
export function toResult<TOk, TErr>(rustResult: RustResult<TOk, TErr>): Result<TOk, TErr> {
    if ('Ok' in rustResult) {
        return result.ok(rustResult.Ok);
    } else {
        return result.err(rustResult.Err);
    }
}
