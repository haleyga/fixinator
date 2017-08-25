import * as chai from 'chai';
import 'mocha';
import { FixFloat } from '../../../../data-types/fix-float';
import { FixinatorParseError } from '../../../../errors/FixinatorParseError';
import { Tag } from '../../tag';
import { FixFloatField } from './fix-float-field';

/* tslint:disable:no-magic-numbers */
/* tslint:disable:no-unused-expression */

class FixFloatFieldSpec extends FixFloatField {}

describe('fix-float-field.spec.ts', () => {

    describe('FixFloatField', () => {
        it(`should parse a valid float`, (done) => {

            const baseFieldSpec = new FixFloatFieldSpec(Tag.DUMMY_TAG, '1234.092');
            chai.expect(baseFieldSpec.raw).to.equal('1234.092');
            chai.expect(baseFieldSpec.isValid).to.be.false;
            chai.expect(baseFieldSpec.tag).to.equal(Tag.DUMMY_TAG);

            try {
                baseFieldSpec.validate();
            } catch (error){
                chai.assert(error);
            }

            chai.expect(baseFieldSpec.isValid).to.be.true;
            chai.expect(baseFieldSpec.data).to.deep.equal(new FixFloat('1234.092'));
            chai.expect(baseFieldSpec.formatted).to.equal(1234.092);

            done();
        });

        it(`should parse a valid integer`, (done) => {

            const baseFieldSpec = new FixFloatFieldSpec(Tag.DUMMY_TAG, '1234');
            chai.expect(baseFieldSpec.raw).to.equal('1234');
            chai.expect(baseFieldSpec.isValid).to.be.false;
            chai.expect(baseFieldSpec.tag).to.equal(Tag.DUMMY_TAG);

            baseFieldSpec.validate();
            chai.expect(baseFieldSpec.isValid).to.be.true;
            chai.expect(baseFieldSpec.data).to.deep.equal(new FixFloat('1234'));
            chai.expect(baseFieldSpec.formatted).to.equal(1234);

            done();
        });

        it(`should fail to parse an invalid float`, (done) => {

            const baseFieldSpec = new FixFloatFieldSpec(Tag.DUMMY_TAG, '12s34.9');
            chai.expect(baseFieldSpec.raw).to.equal('12s34.9');
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
