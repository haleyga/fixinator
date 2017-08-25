import * as chai from 'chai';
import 'mocha';

import { FixFloat } from '../../data-types/fix-float';
import { FixTypeValidationError } from '../../errors/FixTypeValidationError';
import { FixinatorParseError } from '../../errors/FixinatorParseError';
import { FixinatorValidationError } from '../../errors/FixinatorValidationError';
import { STANDARD_DELIMITER } from '../../util/util';
import { MAX_SEQUENCE_NUMBER, MIN_SEQUENCE_NUMBER, ReferenceSequenceNumberField } from './reference-sequence-number';

describe('reference-sequence-number.spec.ts', () => {

    describe('ReferenceSequenceNumberField', () => {
        it('should construct a field with valid raw data', (done) => {
            const raw    = '210';
            const rawNum = 210;

            const field = new ReferenceSequenceNumberField(raw);
            field.validate();

            chai.expect(field.data).to.deep.equal(new FixFloat(raw));
            chai.expect(field.formatted).to.equal(rawNum);

            done();
        });

        it('should fail to validate a field with invalid raw data', (done) => {
            try {
                const field = new ReferenceSequenceNumberField(`${STANDARD_DELIMITER}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new ReferenceSequenceNumberField(`asdf3`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new ReferenceSequenceNumberField(``);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new ReferenceSequenceNumberField(`1.3`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            done();
        });

        it('bounded field should respect bounds', (done) => {
            try {
                const field = new ReferenceSequenceNumberField(`${MIN_SEQUENCE_NUMBER - 1}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
            }

            try {
                const field = new ReferenceSequenceNumberField(`${MAX_SEQUENCE_NUMBER + 1}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
            }

            done();
        });
    });
});
