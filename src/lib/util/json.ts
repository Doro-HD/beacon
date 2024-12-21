import type { z, ZodTypeAny } from "zod";
import { err, map, ok, type Result } from "$lib/util/result";

export function stringify<T>(content: T): Result<string, string> {
    try {
        const str = JSON.stringify(content);

        return ok(str);
    } catch (e) {
        return err('Could not convert string due to: ' + e);
    }
}

export function parse(content: string): Result<any, string> {
    try {
        const parsedString = JSON.parse(content);

        return ok(parsedString);
    } catch (e) {
        return err('Could not parse due to: ' + e);
    }
}

export function parseWithSchema<S extends ZodTypeAny>(content: string, schema: S): Result<z.infer<S>, string> {
    const parseResult = parse(content);
    const schemaResult = map(parseResult, content => {
        const parsedContent = schema.safeParse(content);
        if (!parsedContent.success) {
            return err('Data did not match schema');
        }

        return ok(parsedContent.data);
    });

    return schemaResult;
}