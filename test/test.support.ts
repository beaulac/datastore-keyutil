import * as Datastore from '@google-cloud/datastore';
import { DatastoreInt, DatastoreKey } from '@google-cloud/datastore/entity';

export const testDatastore = new Datastore({projectId: 'KeyUtilTest'});

export function randomKey(): DatastoreKey {
    return testDatastore.key(randomPath(Math.floor(Math.random() * 10)));
}

export function randomString() {
    return Math.random().toString(36).slice(2);
}

export function randomInt() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

export function randomPath(length) {
    const path = [];

    while (length--) {
        path.push(...randomSubPath_());
    }

    return path;
}

export function randomSubPath_(): [string, DatastoreInt] {
    return [randomString(), testDatastore.int(randomInt())];
}