import * as chai from 'chai';
import 'mocha';

import { FixChar } from '../../data-types/fix-char';
import { FixTypeValidationError } from '../../errors/FixTypeValidationError';
import { ASCII_UPPER_LIMIT } from '../../util/util';
import { TimeInForceField, TIME_IN_FORCE } from './time-in-force';

describe('time-in-force.spec.ts', () => {

    describe('TimeInForceField', () => {
        it('should construct a field with valid raw data', (done) => {
            for (const value of TIME_IN_FORCE) {
                const field = new TimeInForceField(value);
                field.validate();

                chai.expect(field.data).to.deep.equal(new FixChar(value));
                chai.expect(field.formatted).to.equal(value);
            }

            done();
        });

        it('should fail to validate a field with invalid raw data', (done) => {

            for (let i = 0; i < ASCII_UPPER_LIMIT; i++) {
                const ascii = String.fromCharCode(i);
                if (TIME_IN_FORCE.findIndex((char) => char === ascii) === -1) continue;

                try {
                    const field = new TimeInForceField(ascii);
                    field.validate();
                } catch (error) {
                    chai.expect(error).to.be.an.instanceof(FixTypeValidationError);
                }
            }

            done();
        });
    });
});
