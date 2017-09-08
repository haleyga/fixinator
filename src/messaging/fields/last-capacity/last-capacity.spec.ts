import * as chai from 'chai';
import 'mocha';

import { FixTypeValidationError } from '../../../errors/FixTypeValidationError';
import { ASCII_UPPER_LIMIT } from '../../../util/util';
import { FixChar } from '../../data-types/fix-char';
import { LastCapacityField, LAST_CAPACITY_VALUES } from './last-capacity';

describe('last-capacity.spec.ts', () => {

    describe('LastCapacityField', () => {
        it('should construct a field with valid raw data', (done) => {
            for (const value of LAST_CAPACITY_VALUES) {
                const field = new LastCapacityField(value);
                field.validate();

                chai.expect(field.data).to.deep.equal(new FixChar(value));
                chai.expect(field.formatted).to.equal(value);
            }

            done();
        });

        it('should fail to validate a field with invalid raw data', (done) => {

            for (let i = 0; i < ASCII_UPPER_LIMIT; i++) {
                const ascii = String.fromCharCode(i);
                if (LAST_CAPACITY_VALUES.findIndex((char) => char === ascii) === -1) continue;

                try {
                    const field = new LastCapacityField(ascii);
                    field.validate();
                } catch (error) {
                    chai.expect(error).to.be.an.instanceof(FixTypeValidationError);
                }
            }

            done();
        });
    });
});
