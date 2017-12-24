import * as Datastore from '@google-cloud/datastore';
import { DatastoreInt, DatastoreKey, PathElement } from '@google-cloud/datastore/entity';

export const testDatastore = new Datastore({ projectId: 'key-util-test' });

export function randomKey(): DatastoreKey {
    return testDatastore.key(randomPath(1 + Math.floor(Math.random() * 10)));
}

export function randomString() {
    return Math.random().toString(36).slice(2);
}

export function randomInt() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

export function randomPath(length: number) {
    const path: PathElement[] = [];

    while (length--) {
        path.push(...randomSubPath_());
    }

    return path;
}

export function randomSubPath_(): [string, DatastoreInt] {
    return [randomString(), testDatastore.int(randomInt())];
}

export class FakeDatastore {
    static KEY = Symbol('KEY');
    KEY = FakeDatastore.KEY;

    int() {
        return {};
    }

    key() {
        return {};
    }
}
