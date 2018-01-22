import * as Datastore from '@google-cloud/datastore';
import { DatastoreInt, DatastoreKey, DatastoreKeyPath, PathElement } from '@google-cloud/datastore/entity';
import { _DEBUG } from './key.debugging';
import { isValidNumericPathElement, isValidStringPathElement } from './key.path.elements';
import { KeyErrorThrower } from './key.types';

export class KeyBuilder {

    constructor(private datastore: Datastore,
                private errorFn: KeyErrorThrower) {
    }

    public buildMixedKey(keyPath: DatastoreKeyPath): DatastoreKey {
        this._validateIsNonEmptyMappable(keyPath);

        return this.datastore.key(keyPath.map((e, i) => this._parseMixedPathElement(e, i)));
    }

    public buildNamedKey(keyPath: DatastoreKeyPath): DatastoreKey {
        this._validateIsNonEmptyMappable(keyPath);
        if (keyPath.every((e) => isValidStringPathElement(e))) {
            return this.datastore.key(keyPath);
        } else {
            return this.errorFn('key.invalidName');
        }
    }

    public buildNumericKey(keyPath: DatastoreKeyPath): DatastoreKey {
        this._validateIsNonEmptyMappable(keyPath);

        return this.datastore.key(keyPath.map((e, i) => this._parseNumericPathElement(e, i)));
    }

    private _parseNumericPathElement(pathElement: PathElement, idx: number): PathElement {
        if (idx % 2 === 0) {
            return pathElement;
        } else {
            return this._parseId(pathElement) || this.errorFn('key.invalidId', pathElement);
        }
    }

    private _parseMixedPathElement(pathElement: PathElement, idx: number): PathElement {
        return (idx % 2)
            ? this._parseIdentifier(pathElement)
            : this._parseKind(pathElement);
    }

    private _validateIsNonEmptyMappable(keyPath: DatastoreKeyPath): void {
        if (!(keyPath && keyPath.length)) {
            _DEBUG(`Received an empty path: ${JSON.stringify(keyPath)}`);
            return this.errorFn('key.noPath');
        }
        if (typeof keyPath.map !== 'function') {
            _DEBUG(`Received an invalid path: ${JSON.stringify(keyPath)}`);
            return this.errorFn('key.invalidPath', keyPath);
        }
    }

    private _parseKind(pathElement: PathElement): string {
        if (isValidStringPathElement(pathElement)) {
            return pathElement;
        }
        _DEBUG(`Received an invalid kind: ${JSON.stringify(pathElement)}`);
        return this.errorFn('key.invalidKind', pathElement);
    }

    private _parseIdentifier(pathElement: PathElement): PathElement {
        return this._parseId(pathElement) || this._parseName(pathElement);
    }

    private _parseId(pathElement: PathElement): number | DatastoreInt | undefined {
        if (this.datastore.isInt(pathElement)) { // Guard clause, don't double-convert.
            _DEBUG('Was passed a pre-converted datastore int: ', pathElement);
            return pathElement;
        }
        if (isValidNumericPathElement(pathElement)) {
            return this.datastore.int(pathElement);
        }
    }

    private _parseName(pathElement: PathElement): string {
        if (isValidStringPathElement(pathElement)) {
            return pathElement;
        }
        _DEBUG(`Received an invalid Identifier: ${pathElement}`);
        return this.errorFn('key.invalidIdentifier', pathElement);
    }
}
