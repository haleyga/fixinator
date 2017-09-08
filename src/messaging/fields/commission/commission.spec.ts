import * as chai from 'chai';
import 'mocha';

import { FixinatorParseError } from '../../../errors/FixinatorParseError';
import { FixinatorValidationError } from '../../../errors/FixinatorValidationError';
import { STANDARD_DELIMITER } from '../../../util/util';
import { FixFloat } from '../../data-types/fix-float';
import { CommissionField, MAX_COMMISSION_PRICE, MIN_COMMISSION_PRICE } from './commission';

describe('commission.spec.ts', () => {

    describe('CommissionField', () => {
        it('should construct a field with valid raw data', (done) => {
            const raw    = '210';
            const rawNum = 210;

            const field = new CommissionField(raw);
            field.validate();

            chai.expect(field.data).to.deep.equal(new FixFloat(raw));
            chai.expect(field.formatted).to.equal(rawNum);

            done();
        });

        it('should fail to validate a field with invalid raw data', (done) => {
            try {
                const field = new CommissionField(`${STANDARD_DELIMITER}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new CommissionField(`asdf3`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new CommissionField(``);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            done();
        });

        it('bounded field should respect bounds', (done) => {
            try {
                const field = new CommissionField(`${MIN_COMMISSION_PRICE - 1}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
            }

            try {
                const field = new CommissionField(`${MAX_COMMISSION_PRICE + 1}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
            }

            done();
        });
    });
});
