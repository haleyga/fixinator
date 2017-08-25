import * as chai from 'chai';
import 'mocha';

import { FixInt } from '../../data-types/fix-int';
import { FixTypeValidationError } from '../../errors/FixTypeValidationError';
import { FixinatorParseError } from '../../errors/FixinatorParseError';
import { STANDARD_DELIMITER } from '../../util/util';
import { NumberOfAllocationsField } from './number-of-allocations';

describe('number-of-allocations.spec.ts', () => {

    describe('NumberOfAllocationsField', () => {
        it('should construct a field with valid raw data', (done) => {
            const id       = 210;
            const idString = '210';

            const field = new NumberOfAllocationsField(idString);
            field.validate();

            chai.expect(field.data).to.deep.equal(new FixInt(idString));
            chai.expect(field.formatted).to.equal(id);

            done();
        });

        it('should fail to validate a field with invalid raw data', (done) => {
            try {
                const field = new NumberOfAllocationsField(`${STANDARD_DELIMITER}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new NumberOfAllocationsField(`asdf3`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new NumberOfAllocationsField(``);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new NumberOfAllocationsField(`1.3`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            done();
        });
    });
});
