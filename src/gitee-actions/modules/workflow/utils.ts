import { isPlainObject, snakeCase } from 'lodash';

export function normalizeInjection(variables: Record<string, any>) {
    let result = Object.create(null);

    for (const key in variables) {
        const value = variables[key];

        const normalizedKey = snakeCase(key);
        /**
         * 如果是普通对象
         */
        if (isPlainObject(value)) {
            const copy = Object.create(null);

            for (const childKey in value) {
                const normalizedChildKey = snakeCase(childKey);

                copy[`${normalizedKey}_${normalizedChildKey}`] = value[childKey];
            }

            result = { ...result, ...normalizeInjection(copy) };
            continue;
        }

        result[normalizedKey] = value;
    }

    return result;
}
