import { DatastoreKey, KeyedByProperty, KeyedBySymbol } from '@google-cloud/datastore/entity';

export type KeyedEntity = KeyedBySymbol | KeyedByProperty;

export type DatastoreKeyExtractable = KeyedBySymbol | KeyedByProperty | DatastoreKey;

export type KeyErrorThrower = (msg: string, data?: any) => never;
