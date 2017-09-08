import * as chai from 'chai';
import 'mocha';

import { FixTypeValidationError } from '../../../errors/FixTypeValidationError';
import { ASCII_UPPER_LIMIT } from '../../../util/util';
import { FixInt } from '../../data-types/fix-int';
import { AllocationStatusField, ALLOCATION_STATUS_VALUES } from './allocation-status';

describe('allocation-status.spec.ts', () => {

    describe('AllocationStatusField', () => {
        it('should construct a field with valid raw data', (done) => {
            for (const value of ALLOCATION_STATUS_VALUES) {
                const raw   = value.toString();
                const field = new AllocationStatusField(raw);
                field.validate();

                chai.expect(field.data).to.deep.equal(new FixInt(raw));
                chai.expect(field.formatted).to.equal(value);
            }

            done();
        });

        it('should fail to validate a field with invalid raw data', (done) => {

            for (let i = 0; i < ASCII_UPPER_LIMIT; i++) {
                const ascii = String.fromCharCode(i);
                if (ALLOCATION_STATUS_VALUES.findIndex((char) => char.toString() === ascii) === -1) continue;

                try {
                    const field = new AllocationStatusField(ascii);
                    field.validate();
                } catch (error) {
                    chai.expect(error).to.be.an.instanceof(FixTypeValidationError);
                }
            }

            done();
        });
    });
});
