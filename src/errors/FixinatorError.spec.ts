import * as chai from 'chai';
import 'mocha';

import { FixinatorError } from './FixinatorError';

describe('FixinatorError.spec.ts', () => {

    describe('FixinatorError', () => {
        it('should throw a FixinatorError (i.e., not a standard Error)', (done) => {
            try {
                throw new FixinatorError(`test message`);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorError, `wrong error type`);
            }
            done();
        });
    });
});
