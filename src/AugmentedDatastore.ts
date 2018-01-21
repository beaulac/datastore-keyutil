import { KeyUtil } from './KeyUtil';

declare module '@google-cloud/datastore' {
    interface Datastore {
        keyUtil: KeyUtil;
    }

    namespace Datastore {
        const keyUtil: KeyUtil;
    }
}
