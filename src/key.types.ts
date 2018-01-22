import { DatastoreKey, ObjOrPayload } from '@google-cloud/datastore/entity';

export type DatastoreKeyExtractable<T = any> = ObjOrPayload<T> | DatastoreKey;

export type KeyErrorThrower = (msg: string, data?: any) => never;
