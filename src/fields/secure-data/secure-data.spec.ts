import * as chai from 'chai';
import 'mocha';

import { FixData } from '../../data-types/fix-data';
import { STANDARD_DELIMITER } from '../../util/util';
import { SecureDataField } from './secure-data';

describe('secure-data.spec.ts', () => {

    describe('SecureDataField', () => {
        it('should construct a field with valid raw data', (done) => {
            const raw   = 'a standard raw char field';
            const field = new SecureDataField(raw);
            field.validate();

            chai.expect(field.data).to.deep.equal(new FixData(raw));
            chai.expect(field.formatted).to.equal(raw);

            done();
        });

        it('should validate the standard delimiter character (0x01)', (done) => {
            const raw   = STANDARD_DELIMITER;
            const field = new SecureDataField(`${STANDARD_DELIMITER}`);
            field.validate();

            chai.expect(field.data).to.deep.equal(new FixData(raw));
            chai.expect(field.formatted).to.equal(raw);

            done();
        });
    });
});
