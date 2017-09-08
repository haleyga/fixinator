import * as chai from 'chai';
import 'mocha';
import { FixinatorParseError } from '../../../../../errors/FixinatorParseError';
import { FixinatorValidationError } from '../../../../../errors/FixinatorValidationError';
import { FixInt } from '../../../../data-types/fix-int';
import { Tag } from '../../tag';
import { BoundedIntField } from './bounded-int-field';

/* tslint:disable:no-magic-numbers */

/* tslint:disable:no-unused-expression */

class BoundedIntFieldSpec extends BoundedIntField {}

describe('bounded-int-field.spec.ts', () => {

    describe('BoundedIntField', () => {
        it(`should successfully parse a valid integer`, (done) => {

            const baseFieldSpec = new BoundedIntFieldSpec(Tag.DUMMY_TAG, '1234', 0, 2000);
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

            const baseFieldSpec = new BoundedIntFieldSpec(Tag.DUMMY_TAG, '1234ajkl2 3 ll', 0, 2000);
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

        it(`should fail to parse an valid float`, (done) => {

            const baseFieldSpec = new BoundedIntFieldSpec(Tag.DUMMY_TAG, '1234.9', 0, 2000);
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

        it(`should fail when the raw value is outside the given bounds`, (done) => {
            try {
                const baseFieldSpec = new BoundedIntFieldSpec(Tag.DUMMY_TAG, '3000', 0, 2000);
                baseFieldSpec.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
            }

            try {
                const baseFieldSpec = new BoundedIntFieldSpec(Tag.DUMMY_TAG, '-3000', 0, 2000);
                baseFieldSpec.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
            }

            try {
                const baseFieldSpec = new BoundedIntFieldSpec(Tag.DUMMY_TAG, '3000', -2, 1);
                baseFieldSpec.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
            }

            try {
                const baseFieldSpec = new BoundedIntFieldSpec(Tag.DUMMY_TAG, '-3000', -2000, -1000);
                baseFieldSpec.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorValidationError);
            }

            done();
        });
    });

});
