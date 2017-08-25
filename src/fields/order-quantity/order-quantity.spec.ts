import * as chai from 'chai';
import 'mocha';

import { FixFloat } from '../../data-types/fix-float';
import { FixTypeValidationError } from '../../errors/FixTypeValidationError';
import { FixinatorParseError } from '../../errors/FixinatorParseError';
import { FixinatorValidationError } from '../../errors/FixinatorValidationError';
import { STANDARD_DELIMITER } from '../../util/util';
import { MAX_QUANTITY, MIN_QUANTITY, OrderQuantityField } from './order-quantity';

describe('order-quantity.spec.ts', () => {

    describe('OrderQuantityField', () => {
        it('should construct a field with valid raw data', (done) => {
            const raw    = '210';
            const rawNum = 210;

            const field = new OrderQuantityField(raw);
            field.validate();

            chai.expect(field.data).to.deep.equal(new FixFloat(raw));
            chai.expect(field.formatted).to.equal(rawNum);

            done();
        });

        it('should fail to validate a field with invalid raw data', (done) => {
            try {
                const field = new OrderQuantityField(`${STANDARD_DELIMITER}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new OrderQuantityField(`asdf3`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new OrderQuantityField(``);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new OrderQuantityField(`1.3`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            done();
        });

        it('bounded field should respect bounds', (done) => {
            try {
                const field = new OrderQuantityField(`${MIN_QUANTITY - 1}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
            }

            try {
                const field = new OrderQuantityField(`${MAX_QUANTITY + 1}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
            }

            done();
        });
    });
});
