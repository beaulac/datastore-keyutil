/// <reference types="google-cloud__datastore" />
import * as Datastore from '@google-cloud/datastore';
import { DatastoreInt, DatastoreKey, ObjOrPayload } from '@google-cloud/datastore/entity';
import { KeyUtil } from './KeyUtil';
export interface KeyUtilAugmentedDatastore extends Datastore {
    keyUtil: KeyUtil;
}
export declare type DatastoreKeyExtractable<T = any> = ObjOrPayload<T> | DatastoreKey;
export declare type DatastoreIdLike = string | number | DatastoreInt;
export declare type KeyErrorThrower = (msg: string, data?: any) => never;
