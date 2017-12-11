import * as Datastore from '@google-cloud/datastore';
import { DatastoreKey, ObjOrPayload } from '@google-cloud/datastore/entity';
import { KeyUtil } from './KeyUtil';

export interface KeyUtilAugmentedDatastore extends Datastore {
    keyUtil: KeyUtil
}

export type DatastoreKeyExtractable<T = any> = ObjOrPayload<T> | DatastoreKey;

export type ErrorThrower = (msg: string, data?: any) => never;
