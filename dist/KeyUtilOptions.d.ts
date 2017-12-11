export interface KeyUtilOptions {
    embed: boolean;
    errorFn: (msg: string, data: any) => never;
}
export declare function defaultOptions(): KeyUtilOptions;
