import validate from 'uuid-validate';

export function isValidUUID(uuidOrArray: string | string[]): boolean {
    if (Array.isArray(uuidOrArray)) {
        return uuidOrArray.every(uuid => validate(uuid));
    }
    return validate(uuidOrArray);
}
