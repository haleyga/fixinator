import * as chai from 'chai';
import 'mocha';

import { FixChar } from '../../data-types/fix-char';
import { FixTypeValidationError } from '../../errors/FixTypeValidationError';
import { ASCII_UPPER_LIMIT } from '../../util/util';
import { UrgencyField, URGENCY_VALUES } from './urgency';

describe('urgency.spec.ts', () => {

    describe('UrgencyField', () => {
        it('should construct a field with valid raw data', (done) => {
            for (const value of URGENCY_VALUES) {
                const field = new UrgencyField(value);
                field.validate();

                chai.expect(field.data).to.deep.equal(new FixChar(value));
                chai.expect(field.formatted).to.equal(value);
            }

            done();
        });

        it('should fail to validate a field with invalid raw data', (done) => {

            for (let i = 0; i < ASCII_UPPER_LIMIT; i++) {
                const ascii = String.fromCharCode(i);
                if (URGENCY_VALUES.findIndex((char) => char === ascii) === -1) continue;

                try {
                    const field = new UrgencyField(ascii);
                    field.validate();
                } catch (error) {
                    chai.expect(error).to.be.an.instanceof(FixTypeValidationError);
                }
            }

            done();
        });
    });
});
