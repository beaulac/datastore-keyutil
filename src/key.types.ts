import { DatastoreInt, DatastoreKey, ObjOrPayload } from '@google-cloud/datastore/entity';

export type DatastoreKeyExtractable<T = any> = ObjOrPayload<T> | DatastoreKey;

export type DatastoreIdLike = string | number | DatastoreInt;

export type KeyErrorThrower = (msg: string, data?: any) => never;
