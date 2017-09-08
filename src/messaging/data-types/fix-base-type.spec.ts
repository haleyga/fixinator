import * as chai from 'chai';
import 'mocha';

import { FixBaseType } from './fix-base-type';

/* tslint:disable:no-magic-numbers */

class FixBaseTypeSpec extends FixBaseType {
    public value: {};
}

describe('fix-base-type.spec.ts', () => {

    describe('FixBaseType', () => {
        it('should return the correct raw value (abstract members are not tested here)', (done) => {
            const baseTypeSpec1 = new FixBaseTypeSpec('my raw value');
            chai.expect(baseTypeSpec1.raw).to.equal('my raw value');

            done();
        });
    });
});
