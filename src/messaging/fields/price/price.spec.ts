import * as chai from 'chai';
import 'mocha';

import { FixinatorParseError } from '../../../errors/FixinatorParseError';
import { FixinatorValidationError } from '../../../errors/FixinatorValidationError';
import { STANDARD_DELIMITER } from '../../../util/util';
import { FixFloat } from '../../data-types/fix-float';
import { MAX_PRICE, MIN_PRICE, PriceField } from './price';

describe('price.spec.ts', () => {

    describe('PriceField', () => {
        it('should construct a field with valid raw data', (done) => {
            const raw    = '210';
            const rawNum = 210;

            const field = new PriceField(raw);
            field.validate();

            chai.expect(field.data).to.deep.equal(new FixFloat(raw));
            chai.expect(field.formatted).to.equal(rawNum);

            done();
        });

        it('should fail to validate a field with invalid raw data', (done) => {
            try {
                const field = new PriceField(`${STANDARD_DELIMITER}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new PriceField(`asdf3`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new PriceField(``);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            done();
        });

        it('bounded field should respect bounds', (done) => {
            try {
                const field = new PriceField(`${MIN_PRICE - 1}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
            }

            try {
                const field = new PriceField(`${MAX_PRICE + 1}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
            }

            done();
        });
    });
});
