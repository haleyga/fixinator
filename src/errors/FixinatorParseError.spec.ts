import * as chai from 'chai';
import 'mocha';

import { FixinatorParseError } from './FixinatorParseError';

describe('FixinatorParseError.spec.ts', () => {

    describe('FixinatorParseError', () => {
        it('should throw a FixinatorParseError (i.e., not a standard Error)', (done) => {
            try {
                throw new FixinatorParseError(`test message`);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError, `wrong error type`);
            }
            done();
        });
    });
});
