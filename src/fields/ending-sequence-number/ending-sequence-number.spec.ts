import * as chai from 'chai';
import 'mocha';

import { FixInt } from '../../data-types/fix-int';
import { FixTypeValidationError } from '../../errors/FixTypeValidationError';
import { FixinatorParseError } from '../../errors/FixinatorParseError';
import { STANDARD_DELIMITER } from '../../util/util';
import { EndingSequenceNumberField } from './ending-sequence-number';

describe('ending-sequence-number.spec.ts', () => {

    describe('EndingSequenceNumberField', () => {
        it('should construct a field with valid raw data', (done) => {
            const id       = 210;
            const idString = '210';

            const field = new EndingSequenceNumberField(idString);
            field.validate();

            chai.expect(field.data).to.deep.equal(new FixInt(idString));
            chai.expect(field.formatted).to.equal(id);

            done();
        });

        it('should fail to validate a field with invalid raw data', (done) => {
            try {
                const field = new EndingSequenceNumberField(`${STANDARD_DELIMITER}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new EndingSequenceNumberField(`asdf3`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new EndingSequenceNumberField(``);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new EndingSequenceNumberField(`1.3`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            done();
        });
    });
});
