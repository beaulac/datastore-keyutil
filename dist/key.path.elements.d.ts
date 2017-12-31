import { DatastoreIdLike } from './key.types';
export declare function isValidIdString(intstr: DatastoreIdLike): intstr is string;
export declare function isValidNumericId(id: number): boolean;
export declare function isValidStringPathElement(e: DatastoreIdLike): e is string;
export declare function idToString(id: DatastoreIdLike): string;
