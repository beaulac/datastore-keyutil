import { DatastoreKey } from '@google-cloud/datastore/entity';
import * as ub64 from 'urlsafe-base64';
import { keyToUID } from './keyToUid';

export type Keyifier<E = object> = (entity: E) => DatastoreKey;
export type Stringifier<E = object> = (entity: E) => string;

type Transform<E, U> = (e: E) => U;
type MapTransform<E, U> = (es: E[]) => U[];

export const pluralize = <E, U>(fn: Transform<E, U>,
                                ctx: any): MapTransform<E, U> => (es: E[] = [undefined as any as E]) => es.map(fn, ctx);

export const uidFromKey = <E>(keyFn: Keyifier<E>): Stringifier<E> => (entity: E) => keyToUID(keyFn(entity));

export const base64ify = <E>(uidFn: Stringifier<E>): Stringifier<E> => (e: E) => ub64.encode(Buffer.from(uidFn(e)));
