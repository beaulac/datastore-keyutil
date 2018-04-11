import Datastore = require('@google-cloud/datastore');
import { KeyUtil } from './KeyUtil';

export interface AugmentedDatastore extends Datastore {
    keyUtil?: KeyUtil;
}

declare module '@google-cloud/datastore' {
    export let keyUtil: KeyUtil | undefined;
}
