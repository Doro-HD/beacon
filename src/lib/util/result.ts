/**
 * @description
 * An object of type result contains a status field which is either equal to 'success' or 'error'
 * Depending on the status field you can ensure the type of the data field, making it an discriminated union
 */
export type Result<TOk, TErr> = Ok<TOk> | Err<TErr>;

/**
 * @description
 * The Ok value of the result type
 * @property {string} status - Is always equal to 'success', this field is the discriminated property in the Result type
 * @property {T} data - A property that holds a value of an generic type
 */
type Ok<T> = {
	status: 'success';
	data: T;
};

/**
 * @description
 * The Err value of the result type
 * @property {string} status - Is always equal to 'error', this field is the discriminated property in the Result type
 * @property {T} data - A property that holds a value of an generic type
 */
type Err<T> = {
	status: 'error';
	reason: T;
};

/**
 * @description
 * Returns an object of type Ok
 * @param {T} data - The value of the Ok object
 * @returns {Ok<T>}
 */
export function ok<T>(data: T): Ok<T> {
	return {
		status: 'success',
		data
	};
}

/**
 * @description
 * Returns an object of type Err
 * @param {T} data - The value of the Err object
 * @returns {Ok<T>}
 */
export function err<T>(data: T): Err<T> {
	return {
		status: 'error',
		reason: data
	};
}

/**
 * @description
 * Flattens a nested result into a single result object
 * @param {Result<Result<TOk, TErr>, TErr>} result -
 * @returns - the unested result object
 */
export function flatten<TOk, TErr>(result: Result<Result<TOk, TErr>, TErr>): Result<TOk, TErr> {
	switch (result.status) {
		case 'success':
			return result.data;
		case 'error':
			return result;
	}
}

/**
 * @description
 * Checks if a result is an ok value
 * @param {Result<TOk, TErr>} result - The result that is checked
 * @returns - A boolean value that determines if the result is an Ok value
 */
export function isOk<TOk, TErr>(result: Result<TOk, TErr>): boolean {
	return result.status === 'success';
}

/**
 * @description
 * Checks if a result is an Err value
 * @param {Result<TOk, TErr>} result - The result that is checked
 * @returns - A boolean value that determines if the result is an Err value
 */
export function isErr<TOk, TErr>(result: Result<TOk, TErr>): boolean {
	return result.status !== 'success';
}

/**
 *
 * @param result
 * @param fn
 * @returns
 */
export function map<TOk, TNewOk, TErr>(
	result: Result<TOk, TErr>,
	fn: (data: TOk) => Result<TNewOk, TErr>
): Result<TNewOk, TErr> {
	switch (result.status) {
		case 'success':
			return fn(result.data);
		case 'error':
			return result;
	}
}

export async function mapAsync<TOk, TNewOk, TErr>(
	result: Result<TOk, TErr>,
	fn: (data: TOk) => Promise<Result<TNewOk, TErr>>
): Promise<Result<TNewOk, TErr>> {
	switch (result.status) {
		case 'success':
			return fn(result.data);
		case 'error':
			return result;
	}
}

export function mapError<TOk, TErr, TNewErr>(
	result: Result<TOk, TErr>,
	fn: (e: TErr) => Result<TOk, TNewErr>
): Result<TOk, TNewErr> {
	switch (result.status) {
		case 'error':
			return fn(result.reason);
		case 'success':
			return result;
	}
}

export async function mapErrorAsync<TOk, TErr, TNewErr>(
	result: Result<TOk, TErr>,
	fn: (e: TErr) => Promise<Result<TOk, TNewErr>>
): Promise<Result<TOk, TNewErr>> {
	switch (result.status) {
		case 'error':
			return fn(result.reason);
		case 'success':
			return result;
	}
}

export function unwrapOr<TOk, TErr>(result: Result<TOk, TErr>, defaultValue: TOk): TOk {
	switch (result.status) {
		case 'success':
			return result.data;
		case 'error':
			return defaultValue;
	}
}

export function unwrapErrorOr<TOk, TErr>(result: Result<TOk, TErr>, defaultValue: TErr): TErr {
	switch (result.status) {
		case 'error':
			return result.reason;
		case 'success':
			return defaultValue;
	}
}
