import * as chai from 'chai';
import 'mocha';
import { FixChar } from '../../../../data-types/fix-char';
import { FixinatorValidationError } from '../../../../errors/FixinatorValidationError';
import { Tag } from '../../tag';
import { ConstrainedCharField } from './constrained-char-field';

/* tslint:disable:no-magic-numbers */

/* tslint:disable:no-unused-expression */

class ConstrainedCharFieldSpec extends ConstrainedCharField {}

describe('constrained-char-field.spec.ts', () => {

    describe('ConstrainedCharField', () => {
        it(`should construct a valid field for each allowed value`, (done) => {

            const allowedValues = ['0', '1', '2', '3', 'A'];
            for (const valueString of allowedValues) {

                const constrainedCharField = new ConstrainedCharFieldSpec(Tag.RawData, valueString, allowedValues);
                chai.expect(constrainedCharField.raw).to.equal(valueString);
                chai.expect(constrainedCharField.isValid).to.be.false;
                chai.expect(constrainedCharField.tag).to.equal(Tag.RawData);

                constrainedCharField.validate();
                chai.expect(constrainedCharField.data).to.deep.equal(new FixChar(valueString));
                chai.expect(constrainedCharField.formatted).to.equal(valueString);
                chai.expect(constrainedCharField.isValid).to.be.true;
            }

            done();
        });

        it(`should should not pass validation for values outside the allowed set`, (done) => {

            const allowedValues = ['0', '1', '2', '3'];
            for (const value of ['-2', '-1', '4', '5', '6', 'A']) {

                try {
                    const valueString   = value.toString();
                    const constrainedCharField = new ConstrainedCharFieldSpec(Tag.RawData, valueString, allowedValues);
                    chai.expect(constrainedCharField.raw).to.deep.equal(valueString);
                    chai.expect(constrainedCharField.isValid).to.be.false;
                    chai.expect(constrainedCharField.tag).to.equal(Tag.RawData);

                    constrainedCharField.validate();
                } catch (error) {
                    chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
                }

            }

            done();
        });
    });

});
