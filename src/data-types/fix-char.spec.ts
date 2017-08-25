import * as chai from 'chai';
import 'mocha';

import { FixTypeValidationError } from '../errors/FixTypeValidationError';
import { STANDARD_DELIMITER } from '../util/util';
import { FixChar, IFixChar } from './fix-char';

/* tslint:disable:no-magic-numbers */
/* tslint:disable:no-unused-expression */

describe('fix-char.spec.ts', () => {

    describe('FixChar', () => {

        let rawString: string = null;
        let fixChar: IFixChar = null;

        beforeEach(`reset fixChar to null`, (done) => {
            fixChar = null;
            done();
        });

        it('should parse a typical, valid character string', (done) => {
            rawString = 'aValidCharString';

            try {
                fixChar = new FixChar(rawString);
            } catch (error) {
                // shouldn't get here
                chai.expect(error).to.be.an.instanceof(FixTypeValidationError);
            }

            chai.expect(fixChar).not.to.be.null;
            done();
        });

        it('should parse an atypical, valid character string', (done) => {
            rawString = `a Valid\t Char 0x23 ${String.fromCharCode(0x02)} \nString`;
            try {
                fixChar = new FixChar(rawString);
            } catch (error) {
                // shouldn't get here
                chai.expect(error).to.be.an.instanceof(FixTypeValidationError);
            }

            chai.expect(fixChar).not.to.be.null;
            done();
        });

        it(`should fail to parse an invalid character string (one containing the 'SOH' character)`, (done) => {
            rawString = `this is ${STANDARD_DELIMITER} NOT a valid string`;
            try {
                fixChar = new FixChar(rawString);
            } catch (error) {
                // we wanted the construction of the object to fail, so this is good for this test
                chai.expect(error).to.be.an.instanceof(FixTypeValidationError);
            }

            chai.expect(fixChar).to.be.null;
            done();
        });

        it (`should parse any valid ASCII character except the SOH character`, (done) => {
            for (let i = 0; i < 128; i++) {
                const char: string = String.fromCharCode(i);
                if (i === 1) {
                    try {
                        fixChar = new FixChar(char);
                    } catch (error) {
                        chai.expect(error).to.be.an.instanceof(FixTypeValidationError);
                    }

                    continue;
                }

                fixChar = new FixChar(char);
                chai.expect(fixChar).not.to.be.null;
            }

            done();
        });
    });
});
