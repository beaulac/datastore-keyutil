export declare class BadKeyError extends Error {
    data: any;
    constructor(msg: string, data: any);
}
export declare function throwBadKey(msg: string, data?: any): never;
