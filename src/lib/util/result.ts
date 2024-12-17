export type Result<TOk, TErr> = Ok<TOk> | Err<TErr>;

type Ok<T> = {
	status: 'success';
	data: T;
};

type Err<T> = {
	status: 'error';
	data: T;
};

export function map<TOk, TNewOk, TErr>(result: Result<TOk, TErr>, fn: (data: TOk) => Result<TNewOk, TErr>): Result<TNewOk, TErr> {
	[].map
	switch (result.status) {
		case 'success':
			return fn(result.data);
		case 'error':
			return result as Result<TNewOk, TErr>;
	}
}

export function mapError<TOk, TErr, TNewErr>(result: Result<TOk, TErr>, fn: (err: TErr) => Result<TOk, TNewErr>): Result<TOk, TNewErr> {
	switch (result.status) {
		case 'error':
			return fn(result.data);
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
			return result.data;
		case 'success':
			return defaultValue;
	}
}
