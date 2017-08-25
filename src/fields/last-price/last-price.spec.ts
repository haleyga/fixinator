import * as chai from 'chai';
import 'mocha';

import { FixFloat } from '../../data-types/fix-float';
import { FixinatorParseError } from '../../errors/FixinatorParseError';
import { FixinatorValidationError } from '../../errors/FixinatorValidationError';
import { STANDARD_DELIMITER } from '../../util/util';
import { LastPriceField, MAX_LAST_PRICE, MIN_LAST_PRICE } from './last-price';

describe('last-price.spec.ts', () => {

    describe('LastPriceField', () => {
        it('should construct a field with valid raw data', (done) => {
            const raw    = '210.0';
            const rawNum = 210;

            const field = new LastPriceField(raw);
            field.validate();

            chai.expect(field.data).to.deep.equal(new FixFloat(raw));
            chai.expect(field.formatted).to.equal(rawNum);

            done();
        });

        it('should fail to validate a field with invalid raw data', (done) => {
            try {
                const field = new LastPriceField(`${STANDARD_DELIMITER}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new LastPriceField(`asdf3`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new LastPriceField(``);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            done();
        });

        it('bounded field should respect bounds', (done) => {
            try {
                const field = new LastPriceField(`${MIN_LAST_PRICE - 1}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
            }

            try {
                const field = new LastPriceField(`${MAX_LAST_PRICE + 1}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
            }

            done();
        });
    });
});
