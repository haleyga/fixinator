import * as chai from 'chai';
import 'mocha';

import { FixTypeValidationError } from '../errors/FixTypeValidationError';
import { FixinatorParseError } from '../errors/FixinatorParseError';
import { STANDARD_DELIMITER } from '../util/util';
import { FixFloat, IFixFloat } from './fix-float';

/* tslint:disable:no-magic-numbers */
/* tslint:disable:no-unused-expression */

describe('fix-float.spec.ts', () => {

    describe('FixFloat', () => {

        let rawString: string = null;
        let fixFloat: IFixFloat = null;

        beforeEach(`reset fixFloat to null`, (done) => {
            fixFloat = null;
            done();
        });

        it('should parse a typical, valid float string', (done) => {
            rawString = '19.30';

            try {
                fixFloat = new FixFloat(rawString);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            chai.expect(fixFloat).not.to.be.null;
            done();
        });

        it('should parse an atypical, valid float string', (done) => {
            rawString = `   190. `;
            try {
                fixFloat = new FixFloat(rawString);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            chai.expect(fixFloat).not.to.be.null;
            done();
        });

        it('should parse a large, valid float string', (done) => {
            rawString = `1000000003798711.01987`;
            try {
                fixFloat = new FixFloat(rawString);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            chai.expect(fixFloat).not.to.be.null;
            done();
        });

        it('should parse a valid int string', (done) => {
            rawString = `10`;
            try {
                fixFloat = new FixFloat(rawString);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            chai.expect(fixFloat).not.to.be.null;
            done();
        });

        it(`should fail to parse a non-numeric string (one containing the 'SOH' character)`, (done) => {
            rawString = `this is ${STANDARD_DELIMITER} NOT a valid string`;
            try {
                fixFloat = new FixFloat(rawString);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            chai.expect(fixFloat).to.be.null;
            done();
        });

        it(`should fail to parse an invalid float string`, (done) => {
            rawString = `123.98a0`;
            try {
                fixFloat = new FixFloat(rawString);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            chai.expect(fixFloat).to.be.null;
            done();
        });
    });
});
