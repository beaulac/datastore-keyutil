import { throwBadKey } from './BadKeyError';

export interface KeyUtilOptions {
    embed: boolean;
    errorFn: (msg: string, data: any) => never;
}

export function defaultOptions(): KeyUtilOptions {
    return {
        embed: false,
        errorFn: throwBadKey
    };
}
