import * as Datastore from '@google-cloud/datastore';
import { DatastoreInt, DatastoreKey, ObjOrPayload } from '@google-cloud/datastore/entity';
import { KeyUtil } from './KeyUtil';

export interface KeyUtilAugmentedDatastore extends Datastore {
    keyUtil: KeyUtil
}

export type DatastoreKeyExtractable<T = any> = ObjOrPayload<T> | DatastoreKey;

export type DatastoreIdLike = string | number | DatastoreInt;

export type KeyErrorThrower = (msg: string, data?: any) => never;
