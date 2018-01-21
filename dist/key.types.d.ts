/// <reference types="google-cloud__datastore" />
import { DatastoreInt, DatastoreKey, ObjOrPayload } from '@google-cloud/datastore/entity';
export declare type DatastoreKeyExtractable<T = any> = ObjOrPayload<T> | DatastoreKey;
export declare type DatastoreIdLike = string | number | DatastoreInt;
export declare type KeyErrorThrower = (msg: string, data?: any) => never;
