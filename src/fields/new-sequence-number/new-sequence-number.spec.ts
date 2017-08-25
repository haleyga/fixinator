import * as chai from 'chai';
import 'mocha';

import { FixFloat } from '../../data-types/fix-float';
import { FixTypeValidationError } from '../../errors/FixTypeValidationError';
import { FixinatorParseError } from '../../errors/FixinatorParseError';
import { FixinatorValidationError } from '../../errors/FixinatorValidationError';
import { STANDARD_DELIMITER } from '../../util/util';
import { MAX_SEQUENCE_NUMBER, MIN_SEQUENCE_NUMBER, NewSequenceNumberField } from './new-sequence-number';

describe('new-sequence-number.spec.ts', () => {

    describe('ReferenceSequenceNumberField', () => {
        it('should construct a field with valid raw data', (done) => {
            const raw    = '210';
            const rawNum = 210;

            const field = new NewSequenceNumberField(raw);
            field.validate();

            chai.expect(field.data).to.deep.equal(new FixFloat(raw));
            chai.expect(field.formatted).to.equal(rawNum);

            done();
        });

        it('should fail to validate a field with invalid raw data', (done) => {
            try {
                const field = new NewSequenceNumberField(`${STANDARD_DELIMITER}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new NewSequenceNumberField(`asdf3`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new NewSequenceNumberField(``);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new NewSequenceNumberField(`1.3`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            done();
        });

        it('bounded field should respect bounds', (done) => {
            try {
                const field = new NewSequenceNumberField(`${MIN_SEQUENCE_NUMBER - 1}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
            }

            try {
                const field = new NewSequenceNumberField(`${MAX_SEQUENCE_NUMBER + 1}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
            }

            done();
        });
    });
});
