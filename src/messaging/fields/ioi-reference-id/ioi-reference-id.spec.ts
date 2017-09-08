import * as chai from 'chai';
import 'mocha';

import { FixinatorParseError } from '../../../errors/FixinatorParseError';
import { STANDARD_DELIMITER } from '../../../util/util';
import { FixInt } from '../../data-types/fix-int';
import { IoiReferenceIdField } from './ioi-reference-id';

describe('ioi-reference-id.spec.ts', () => {

    describe('IoiReferenceIdField', () => {
        it('should construct a field with valid raw data', (done) => {
            const id       = 210;
            const idString = '210';

            const field = new IoiReferenceIdField(idString);
            field.validate();

            chai.expect(field.data).to.deep.equal(new FixInt(idString));
            chai.expect(field.formatted).to.equal(id);

            done();
        });

        it('should fail to validate a field with invalid raw data', (done) => {
            try {
                const field = new IoiReferenceIdField(`${STANDARD_DELIMITER}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new IoiReferenceIdField(`asdf3`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new IoiReferenceIdField(``);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                const field = new IoiReferenceIdField(`1.3`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            done();
        });
    });
});
