export type Option<T> = T | undefined;

export function isSome<T>(option: Option<T>): option is T {
    return option !== undefined;
}

export function isNone<T>(option: Option<T>): option is undefined {
    return option === undefined;
}

export function map<TOld, TNew>(option: Option<TOld>, fn: (value: TOld) => TNew): Option<TNew> {
    if (option === undefined) {
        return undefined;
    }

    return fn(option);
}
