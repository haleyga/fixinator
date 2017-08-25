import * as chai from 'chai';
import 'mocha';

import { FixinatorValidationError } from './FixinatorValidationError';

describe('FixinatorValidationError.spec.ts', () => {

    describe('FixinatorValidationError', () => {
        it('should throw a FixinatorValidationError (i.e., not a standard Error)', (done) => {
            try {
                throw new FixinatorValidationError(`test message`);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorValidationError, `wrong error type`);
            }
            done();
        });
    });
});
