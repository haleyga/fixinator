import * as chai from 'chai';
import 'mocha';

import { FixTypeValidationError } from '../../../errors/FixTypeValidationError';
import { ASCII_UPPER_LIMIT } from '../../../util/util';
import { FixChar } from '../../data-types/fix-char';
import { SettlementTypeField, SETTLEMENT_TYPE_VALUES } from './settlement-type';

describe('settlement-type.spec.ts', () => {

    describe('SettlementTypeField', () => {
        it('should construct a field with valid raw data', (done) => {
            for (const value of SETTLEMENT_TYPE_VALUES) {
                const field = new SettlementTypeField(value);
                field.validate();

                chai.expect(field.data).to.deep.equal(new FixChar(value));
                chai.expect(field.formatted).to.equal(value);
            }

            done();
        });

        it('should fail to validate a field with invalid raw data', (done) => {

            for (let i = 0; i < ASCII_UPPER_LIMIT; i++) {
                const ascii = String.fromCharCode(i);
                if (SETTLEMENT_TYPE_VALUES.findIndex((char) => char === ascii) === -1) continue;

                try {
                    const field = new SettlementTypeField(ascii);
                    field.validate();
                } catch (error) {
                    chai.expect(error).to.be.an.instanceof(FixTypeValidationError);
                }
            }

            done();
        });
    });
});
