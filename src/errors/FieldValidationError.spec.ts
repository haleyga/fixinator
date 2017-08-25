import * as chai from 'chai';
import 'mocha';

import { FieldValidationError } from './FieldValidationError';

describe('FieldValidationError.spec.ts', () => {

    describe('FieldValidationError', () => {
        it('should throw a FieldValidationError (i.e., not a standard Error)', (done) => {
            try {
                throw new FieldValidationError(`test message`);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FieldValidationError, `wrong error type`);
            }
            done();
        });
    });
});
