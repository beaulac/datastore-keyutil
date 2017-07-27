export class BadKeyError extends Error {
    constructor(msg: string, public data: any) {
        super(msg);
    }
}

export function throwBadKey(msg: string, data?: any): never {
    throw new BadKeyError(msg, data);
}
