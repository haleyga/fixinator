import * as chai from 'chai';
import 'mocha';

import { FixChar } from '../../data-types/fix-char';
import { FixTypeValidationError } from '../../errors/FixTypeValidationError';
import { STANDARD_DELIMITER } from '../../util/util';
import { ListExecutionInstructionsField } from './list-execution-instructions';

describe('list-execution-instructions.spec.ts', () => {

    describe('ListExecutionInstructionsField', () => {
        it('should construct a field with valid raw data', (done) => {
            const raw = 'a standard raw char field';
            const field         = new ListExecutionInstructionsField(raw);
            field.validate();

            chai.expect(field.data).to.deep.equal(new FixChar(raw));
            chai.expect(field.formatted).to.equal(raw);

            done();
        });

        it('should fail to validate a field with invalid raw data', (done) => {
            try {
                const field = new ListExecutionInstructionsField(`${STANDARD_DELIMITER}`);
                field.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixTypeValidationError);
            }

            done();
        });
    });
});
