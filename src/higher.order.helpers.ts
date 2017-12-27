import { DatastoreKey } from '@google-cloud/datastore/entity';
import * as ub64 from 'urlsafe-base64';
import { keyToUID } from './keyToUid';

export type Keyifier<E = object> = (entity: E) => DatastoreKey;
export type Stringifier<E = object> = (entity: E) => string;

export const pluralize = <E, U>(fn: (e: E) => U): (es: E[]) => U[] => (es: E[] = [void 0 as any as E]) => es.map(fn);

export const uidify = <E>(keyFn: Keyifier<E>): Stringifier<E> => (entity: E) => keyToUID(keyFn(entity));

export const base64ify = <E>(uidFn: Stringifier<E>): Stringifier<E> => (e: E) => ub64.encode(Buffer.from(uidFn(e)));
