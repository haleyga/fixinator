import * as chai from 'chai';
import 'mocha';

import { FixTypeValidationError } from '../errors/FixTypeValidationError';
import { FixinatorParseError } from '../errors/FixinatorParseError';
import { STANDARD_DELIMITER } from '../util/util';
import { FixInt, IFixInt } from './fix-int';

/* tslint:disable:no-magic-numbers */
/* tslint:disable:no-unused-expression */

describe('fix-int.spec.ts', () => {

    describe('FixInt', () => {

        let rawString: string = null;
        let fixInt: IFixInt = null;

        beforeEach(`reset fixInt to null`, (done) => {
            fixInt = null;
            done();
        });

        it( 'should parse a typical, valid int string', (done) => {
            rawString = '19';

            try {
                fixInt = new FixInt(rawString);
            } catch (error) {
                chai.assert(false, `'new FixInt(rawString)' should've succeeded - shouldn't be here`);
            }

            chai.expect(fixInt).not.to.be.null;
            done();
        });

        it('should parse an atypical, valid int string', (done) => {
            rawString = `   190 `;
            try {
                fixInt = new FixInt(rawString);
            } catch (error) {
                chai.assert(false, `'new FixInt(rawString)' should've succeeded - shouldn't be here`);
            }

            chai.expect(fixInt).not.to.be.null;
            done();
        });

        it('should parse a large, valid integer string', (done) => {
            rawString = `100000000379871101987`;
            try {
                fixInt = new FixInt(rawString);
            } catch (error) {
                chai.assert(false, `'new FixInt(rawString)' should've succeeded - shouldn't be here`);
            }

            chai.expect(fixInt).not.to.be.null;
            done();
        });

        it(`should fail to parse a non-numeric string (one containing the 'SOH' character)`, (done) => {
            rawString = `this is ${STANDARD_DELIMITER} NOT a valid string`;
            try {
                fixInt = new FixInt(rawString);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            chai.expect(fixInt).to.be.null;
            done();
        });

        it(`should fail to parse an invalid integer string`, (done) => {
            rawString = `12398a0`;
            try {
                fixInt = new FixInt(rawString);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            chai.expect(fixInt).to.be.null;
            done();
        });

        it('should fail to parse a valid float string', (done) => {
            rawString = `1.0`;
            try {
                fixInt = new FixInt(rawString);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            chai.expect(fixInt).to.be.null;
            done();
        });
    });
});
