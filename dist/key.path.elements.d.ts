/// <reference types="google-cloud__datastore" />
import { PathElement } from '@google-cloud/datastore/entity';
export declare function isValidIdString(intstr: string): intstr is string;
export declare function isValidNumericId(id: number): id is number;
export declare function isValidNumericPathElement(e: string | number): boolean;
export declare function isValidStringPathElement(e: PathElement): e is string;
export declare function idToString(id?: PathElement): string;
