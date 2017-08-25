import * as chai from 'chai';
import 'mocha';

import { FixInt } from '../../data-types/fix-int';
import { FixinatorParseError } from '../../errors/FixinatorParseError';
import { STANDARD_DELIMITER } from '../../util/util';
import { BodyLengthField, MAX_BODY_LENGTH, MIN_BODY_LENGTH } from './body-length';
import { FixinatorValidationError } from '../../errors/FixinatorValidationError';

describe('body-length.spec.ts', () => {

    describe('BodyLengthField', () => {
        it('should construct a field with valid raw data', (done) => {
            const raw    = '210';
            const rawNum = 210;

            const field = new BodyLengthField(raw);
            field.validate();

            chai.expect(field.data).to.deep.equal(new FixInt(raw));
            chai.expect(field.formatted).to.equal(rawNum);

            done();
        });

        it('should fail to validate a field with invalid raw data', (done) => {
            try {
                const field = new BodyLengthField(`${STANDARD_DELIMITER}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new BodyLengthField(`asdf3`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new BodyLengthField(``);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            done();
        });

        it('bounded field should respect bounds', (done) => {
            try {
                const field = new BodyLengthField(`${MIN_BODY_LENGTH - 1}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
            }

            try {
                const field = new BodyLengthField(`${MAX_BODY_LENGTH + 1}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
            }

            done();
        });
    });
});
