import * as chai from 'chai';
import 'mocha';
import { FixinatorValidationError } from '../../../../../errors/FixinatorValidationError';
import { FixInt } from '../../../../data-types/fix-int';
import { Tag } from '../../tag';
import { ConstrainedIntField } from './constrained-int-field';

/* tslint:disable:no-magic-numbers */

/* tslint:disable:no-unused-expression */

class ConstrainedIntFieldSpec extends ConstrainedIntField {}

describe('constrained-int-field.spec.ts', () => {

    describe('ConstrainedIntField', () => {
        it(`should construct a valid field for each allowed value`, (done) => {

            const allowedValues = [0, 1, 2, 3];
            for (const value of allowedValues) {

                const valueString         = value.toString();
                const constrainedIntField = new ConstrainedIntFieldSpec(Tag.RawData, valueString, allowedValues);
                chai.expect(constrainedIntField.raw).to.equal(valueString);
                chai.expect(constrainedIntField.isValid).to.be.false;
                chai.expect(constrainedIntField.tag).to.equal(Tag.RawData);

                constrainedIntField.validate();
                chai.expect(constrainedIntField.data).to.deep.equal(new FixInt(valueString));
                chai.expect(constrainedIntField.formatted).to.equal(value);
                chai.expect(constrainedIntField.isValid).to.be.true;
            }

            done();
        });

        it(`should should not pass validation for values outside the allowed set`, (done) => {

            const allowedValues = [0, 1, 2, 3];
            for (const value of [-2, -1, 4, 5, 6]) {

                try {
                    const valueString         = value.toString();
                    const constrainedIntField = new ConstrainedIntFieldSpec(Tag.RawData, valueString, allowedValues);
                    chai.expect(constrainedIntField.raw).to.equal(valueString);
                    chai.expect(constrainedIntField.isValid).to.be.false;
                    chai.expect(constrainedIntField.tag).to.equal(Tag.RawData);

                    constrainedIntField.validate();
                } catch (error) {
                    chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
                }

            }

            done();
        });
    });

});
