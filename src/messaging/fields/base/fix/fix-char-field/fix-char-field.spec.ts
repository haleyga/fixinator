import * as chai from 'chai';
import 'mocha';
import { FixTypeValidationError } from '../../../../../errors/FixTypeValidationError';
import { FixChar } from '../../../../data-types/fix-char';
import { Tag } from '../../tag';
import { FixCharField } from './fix-char-field';

/* tslint:disable:no-magic-numbers */

/* tslint:disable:no-unused-expression */

class FixCharFieldSpec extends FixCharField {}

describe('fix-char-field.spec.ts', () => {

    describe('FixCharField', () => {
        it(`should return the correct base values (abstract members aren't tested here)`, (done) => {

            const baseFieldSpec = new FixCharFieldSpec(Tag.DUMMY_TAG, '1234');
            chai.expect(baseFieldSpec.raw).to.equal('1234');
            chai.expect(baseFieldSpec.isValid).to.be.false;
            chai.expect(baseFieldSpec.tag).to.equal(Tag.DUMMY_TAG);

            baseFieldSpec.validate();
            chai.expect(baseFieldSpec.isValid).to.be.true;
            chai.expect(baseFieldSpec.data).to.deep.equal(new FixChar('1234'));
            chai.expect(baseFieldSpec.formatted).to.equal('1234');

            done();
        });

        it(`should allow any ASCII characters except the SOH character`, (done) => {

            for (let i = 0; i < 128; i++) {

                const char = String.fromCharCode(i);

                const baseFieldSpec = new FixCharFieldSpec(Tag.DUMMY_TAG, char);
                chai.expect(baseFieldSpec.raw).to.equal(char);
                chai.expect(baseFieldSpec.isValid).to.be.false;
                chai.expect(baseFieldSpec.tag).to.equal(Tag.DUMMY_TAG);

                if (i === 1) {
                    try {
                        baseFieldSpec.validate();
                    } catch (error) {
                        chai.expect(error).to.be.an.instanceof(FixTypeValidationError);
                    }

                    chai.expect(baseFieldSpec.isValid).to.be.false;
                    chai.expect(baseFieldSpec.data).to.be.null;
                    chai.expect(baseFieldSpec.formatted).to.null;

                    continue;
                }

                baseFieldSpec.validate();
                chai.expect(baseFieldSpec.isValid).to.be.true;
                chai.expect(baseFieldSpec.data).to.deep.equal(new FixChar(char));
                chai.expect(baseFieldSpec.formatted).to.equal(char);
            }

            done();
        });
    });

});
