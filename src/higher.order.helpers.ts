import { DatastoreKey } from '@google-cloud/datastore/entity';
import { keyToUID } from './keyToUid';

export type KeyFunction<E = {}> = (entity: E) => DatastoreKey;
export type StringFunction<E = {}> = (entity: E) => string;

type Transform<E, U> = (e: E) => U;
type MapTransform<E, U> = (es: E[]) => U[];

export const pluralize = <E, U>(fn: Transform<E, U>,
                                ctx: any): MapTransform<E, U> => (es: E[] = [undefined as any as E]) => es.map(fn, ctx);

export const uidFromKey = <E>(keyFn: KeyFunction<E>): StringFunction<E> => (entity: E) => keyToUID(keyFn(entity));

export const base64ify = <E>(uidFn: StringFunction<E>): StringFunction<E> => (entity: E) => Buffer.from(uidFn(entity))
                                                                                                  .toString('base64');
