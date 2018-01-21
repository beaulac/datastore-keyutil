import * as Datastore from '@google-cloud/datastore';
import { KeyUtil } from '../src';
import { FakeDatastore } from './test.support';

describe('Key Utility Embedding', () => {

    it('embeds on the prototype', () => {
        const fakeDS = new FakeDatastore();
        const keyUtil = new KeyUtil(fakeDS as any as Datastore, { embed: true });

        (fakeDS as any).keyUtil.should.deep.equal(keyUtil);
    });

    it('embeds on the namespace', () => {
        const fakeDS = new FakeDatastore();
        const keyUtil = new KeyUtil(fakeDS as any as Datastore, { embed: true });

        (FakeDatastore as any).keyUtil.should.deep.equal(keyUtil);
    });
});
