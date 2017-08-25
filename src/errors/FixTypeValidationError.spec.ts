import * as chai from 'chai';
import 'mocha';

import { FixTypeValidationError } from './FixTypeValidationError';

describe('FixTypeValidationError.spec.ts', () => {

    describe('FixTypeValidationError', () => {
        it('should throw a FixTypeValidationError (i.e., not a standard Error)', (done) => {
            try {
                throw new FixTypeValidationError(`test message`);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixTypeValidationError, `wrong error type`);
            }
            done();
        });
    });
});
