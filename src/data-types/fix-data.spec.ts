import * as chai from 'chai';
import 'mocha';

import { FixTypeValidationError } from '../errors/FixTypeValidationError';
import { STANDARD_DELIMITER } from '../util/util';
import { FixData, IFixData } from './fix-data';

/* tslint:disable:no-magic-numbers */

describe('fix-data.spec.ts', () => {

    describe('FixData', () => {

        let rawString: string = null;
        let fixData: IFixData = null;

        beforeEach(`reset fixData to null`, (done) => {
            fixData = null;
            done();
        });

        it('should parse a typical, valid character string', (done) => {
            rawString = 'aValidDataString';

            try {
                fixData = new FixData(rawString);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixTypeValidationError);
            }

            chai.assert(fixData);
            done();
        });

        it('should parse an atypical, valid character string', (done) => {
            rawString = `a Valid\t Data 0x23 \nString`;
            try {
                fixData = new FixData(rawString);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixTypeValidationError);
            }

            chai.assert(fixData);
            done();
        });

        it(`should parse a string containing the standard delimiter character (the 'SOH' character)`, (done) => {
            rawString = `this is ${STANDARD_DELIMITER} STILL a valid data string`;
            try {
                fixData = new FixData(rawString);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixTypeValidationError);
            }

            chai.assert(fixData);
            done();
        });
    });
});
