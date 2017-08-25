import * as chai from 'chai';
import 'mocha';
import { FixInt } from '../../../../data-types/fix-int';
import { FixTypeValidationError } from '../../../../errors/FixTypeValidationError';
import { Tag } from '../../tag';
import { FixIntField } from './fix-int-field';
import { FixinatorParseError } from '../../../../errors/FixinatorParseError';

/* tslint:disable:no-magic-numbers */
/* tslint:disable:no-unused-expression */

class FixIntFieldSpec extends FixIntField {}

describe('fix-int-field.spec.ts', () => {

    describe('FixIntField', () => {
        it(`should successfully parse a valid integer`, (done) => {

            const baseFieldSpec = new FixIntFieldSpec(Tag.DUMMY_TAG, '1234');
            chai.expect(baseFieldSpec.raw).to.equal('1234');
            chai.expect(baseFieldSpec.isValid).to.be.false;
            chai.expect(baseFieldSpec.tag).to.equal(Tag.DUMMY_TAG);

            baseFieldSpec.validate();
            chai.expect(baseFieldSpec.isValid).to.be.true;
            chai.expect(baseFieldSpec.data).to.deep.equal(new FixInt('1234'));
            chai.expect(baseFieldSpec.formatted).to.equal(1234);

            done();
        });

        it(`should fail to parse an invalid integer`, (done) => {

            const baseFieldSpec = new FixIntFieldSpec(Tag.DUMMY_TAG, '1234ajkl2 3 ll');
            chai.expect(baseFieldSpec.raw).to.equal('1234ajkl2 3 ll');
            chai.expect(baseFieldSpec.isValid).to.false;
            chai.expect(baseFieldSpec.tag).to.equal(Tag.DUMMY_TAG);

            try {
                baseFieldSpec.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            chai.expect(baseFieldSpec.isValid).to.be.false;
            chai.expect(baseFieldSpec.data).to.be.null;
            chai.expect(baseFieldSpec.formatted).to.be.null;

            done();
        });

        it(`should fail to parse a valid float`, (done) => {

            const baseFieldSpec = new FixIntFieldSpec(Tag.DUMMY_TAG, '1234.9');
            chai.expect(baseFieldSpec.raw).to.equal('1234.9');
            chai.expect(baseFieldSpec.isValid).to.be.false;
            chai.expect(baseFieldSpec.tag).to.equal(Tag.DUMMY_TAG);

            try {
                baseFieldSpec.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }
            chai.expect(baseFieldSpec.isValid).to.be.false;
            chai.expect(baseFieldSpec.data).to.be.null;
            chai.expect(baseFieldSpec.formatted).to.be.null;

            done();
        });
    });

});
