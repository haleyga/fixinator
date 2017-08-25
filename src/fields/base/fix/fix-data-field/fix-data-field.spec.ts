import * as chai from 'chai';
import 'mocha';
import { FixData } from '../../../../data-types/fix-data';
import { Tag } from '../../tag';
import { FixDataField } from './fix-data-field';

/* tslint:disable:no-magic-numbers */
/* tslint:disable:no-unused-expression */

class FixDataFieldSpec extends FixDataField {}

describe('fix-data-field.spec.ts', () => {

    describe('FixDataField', () => {
        it(`should return the correct base values (abstract members aren't tested here)`, (done) => {

            const baseFieldSpec = new FixDataFieldSpec(Tag.DUMMY_TAG, '1234');
            chai.expect(baseFieldSpec.raw).to.equal('1234');
            chai.expect(baseFieldSpec.isValid).to.be.false;
            chai.expect(baseFieldSpec.tag).to.equal(Tag.DUMMY_TAG);

            baseFieldSpec.validate();
            chai.expect(baseFieldSpec.isValid).to.be.true;
            chai.expect(baseFieldSpec.data).to.deep.equal(new FixData('1234'));
            chai.expect(baseFieldSpec.formatted).to.equal('1234');

            done();
        });

        it(`should allow any ASCII characters including the SOH character`, (done) => {

            for (let i = 0; i < 128; i++) {

                const char = String.fromCharCode(i);

                const baseFieldSpec = new FixDataFieldSpec(Tag.DUMMY_TAG, char);
                chai.expect(baseFieldSpec.raw).to.equal(char);
                chai.expect(baseFieldSpec.isValid).to.false;
                chai.expect(baseFieldSpec.tag).to.equal(Tag.DUMMY_TAG);

                baseFieldSpec.validate();

                chai.expect(baseFieldSpec.isValid).to.be.true;
                chai.expect(baseFieldSpec.data).to.deep.equal(new FixData(char));
                chai.expect(baseFieldSpec.formatted).to.equal(char);
            }

            done();
        });
    });

});
