import * as chai from 'chai';
import 'mocha';

import { FixTypeValidationError } from '../../../errors/FixTypeValidationError';
import { ASCII_UPPER_LIMIT } from '../../../util/util';
import { FixChar } from '../../data-types/fix-char';
import { AllocationTransactionTypeField, ALLOCATION_TRANSACTION_TYPE_VALUES } from './allocation-transaction-type';

describe('allocation-transaction-type.spec.ts', () => {

    describe('AllocationTransactionTypeField', () => {
        it('should construct a field with valid raw data', (done) => {
            for (const value of ALLOCATION_TRANSACTION_TYPE_VALUES) {
                const field = new AllocationTransactionTypeField(value);
                field.validate();

                chai.expect(field.data).to.deep.equal(new FixChar(value));
                chai.expect(field.formatted).to.equal(value);
            }

            done();
        });

        it('should fail to validate a field with invalid raw data', (done) => {

            for (let i = 0; i < ASCII_UPPER_LIMIT; i++) {
                const ascii = String.fromCharCode(i);
                if (ALLOCATION_TRANSACTION_TYPE_VALUES.findIndex((char) => char === ascii) === -1) continue;

                try {
                    const field = new AllocationTransactionTypeField(ascii);
                    field.validate();
                } catch (error) {
                    chai.expect(error).to.be.an.instanceof(FixTypeValidationError);
                }
            }

            done();
        });
    });
});
