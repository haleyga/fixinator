import * as chai from 'chai';
import 'mocha';

import { FixInt } from '../../data-types/fix-int';
import { FixTypeValidationError } from '../../errors/FixTypeValidationError';
import { ASCII_UPPER_LIMIT } from '../../util/util';
import { ExecutionDestinationField, EXECUTION_DESTINATION_VALUES } from './execution-destination';

describe('execution-destination.spec.ts', () => {

    describe('ExecutionDestinationField', () => {
        it('should construct a field with valid raw data', (done) => {
            for (const value of EXECUTION_DESTINATION_VALUES) {
                const raw   = value.toString();
                const field = new ExecutionDestinationField(raw);
                field.validate();

                chai.expect(field.data).to.deep.equal(new FixInt(raw));
                chai.expect(field.formatted).to.equal(value);
            }

            done();
        });

        it('should fail to validate a field with invalid raw data', (done) => {

            for (let i = 0; i < ASCII_UPPER_LIMIT; i++) {
                const ascii = String.fromCharCode(i);
                if (EXECUTION_DESTINATION_VALUES.findIndex((char) => char.toString() === ascii) === -1) continue;

                try {
                    const field = new ExecutionDestinationField(ascii);
                    field.validate();
                } catch (error) {
                    chai.expect(error).to.be.an.instanceof(FixTypeValidationError);
                }
            }

            done();
        });
    });
});
