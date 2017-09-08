import * as chai from 'chai';
import 'mocha';

import { FixTypeValidationError } from '../../../errors/FixTypeValidationError';
import { ASCII_UPPER_LIMIT } from '../../../util/util';
import { FixInt } from '../../data-types/fix-int';
import { EncryptionMethodField, ENCRYPTION_METHOD_VALUES } from './encryption-method';

describe('encryption-method.spec.ts', () => {

    describe('EncryptionMethodField', () => {
        it('should construct a field with valid raw data', (done) => {
            for (const value of ENCRYPTION_METHOD_VALUES) {
                const raw   = value.toString();
                const field = new EncryptionMethodField(raw);
                field.validate();

                chai.expect(field.data).to.deep.equal(new FixInt(raw));
                chai.expect(field.formatted).to.equal(value);
            }

            done();
        });

        it('should fail to validate a field with invalid raw data', (done) => {

            for (let i = 0; i < ASCII_UPPER_LIMIT; i++) {
                const ascii = String.fromCharCode(i);
                if (ENCRYPTION_METHOD_VALUES.findIndex((char) => char.toString() === ascii) === -1) continue;

                try {
                    const field = new EncryptionMethodField(ascii);
                    field.validate();
                } catch (error) {
                    chai.expect(error).to.be.an.instanceof(FixTypeValidationError);
                }
            }

            done();
        });
    });
});
