import { DatastoreKey, DatastoreKeyPath } from '@google-cloud/datastore/entity';
import { DatastoreKeylike, isKeylike } from './isKeylike';
import { DatastoreKeyExtractable } from './KeyUtil';
import Datastore = require('@google-cloud/datastore');

export class KeyExtractor {
    private KEY_SYMBOL: symbol;
    private isKey: (k: any) => k is DatastoreKey;

    constructor(datastore: Datastore,
                private errorFn: (msg: string, data?: any) => never) {
        ({KEY: this.KEY_SYMBOL} = datastore);

        const _DatastoreKey = datastore.key({path: []}).constructor;
        this.isKey = (k: any): k is DatastoreKey => k instanceof _DatastoreKey;
    }

    public coerceKeylikeToKey(keylike: DatastoreKeylike,
                              builder: (path: DatastoreKeyPath) => DatastoreKey): DatastoreKey {
        if (this.isKey(keylike)) {
            return keylike as DatastoreKey;
        }
        if (isKeylike(keylike)) {
            return builder(keylike.path);
        }
        return this.errorFn('key.notKeylike', keylike);
    }

    public extractKey(entity: DatastoreKeyExtractable): DatastoreKey {
        if (!entity) {
            return this.errorFn('key.nonExtractable', entity);
        }
        if (this.isKey(entity)) {
            return entity;
        }
        return entity[this.KEY_SYMBOL] || entity.key;
    }
}
