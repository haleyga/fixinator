import * as chai from 'chai';
import 'mocha';
import { FixinatorParseError } from '../../errors/FixinatorParseError';
import { MAX_HOUR, MAX_MINUTE, MAX_SECOND } from '../../util/datetime';
import { padLeft } from '../../util/util';
import { IOriginalTimeField, OriginalTimeField } from './original-time';

//tslint:disable:no-magic-numbers
//tslint:disable:no-unused-expression
/* tslint:disable:only-arrow-functions */

// Use regular callback functions instead of arrow functions since we need to access the Mocha context
// (this.timeout) rather than use the lexical binding provided by an arrow function.
describe('original-time.spec.ts', function () {

    this.timeout(10000);;

    describe('OriginalTimeField', () => {

        it(`should parse all valid FIX times (format => 'HH:MM:SS')`, (done) => {

            for (let hour = 0; hour <= MAX_HOUR; hour++) {
                for (let minute = 0; minute <= MAX_MINUTE; minute++) {
                    for (let second = 0; second <= MAX_SECOND; second++) {
                        const hourString   = padLeft(hour.toString(), '0', 2);
                        const minuteString = padLeft(minute.toString(), '0', 2);
                        const secondString = padLeft(second.toString(), '0', 2);
                        const timeField    = new OriginalTimeField(`${hourString}:${minuteString}:${secondString}`);
                        timeField.validate();

                        chai.expect(timeField.time.hour).to.equal(hour);
                        chai.expect(timeField.time.minute).to.equal(minute);
                        chai.expect(timeField.time.second).to.equal(second);
                        chai.expect(timeField.time.millisecond).to.equal(0);
                        chai.expect(timeField.time.stamp).not.to.be.null;
                    }
                }
            }

            done();
        });

        it(`should fail to parse invalid FIX times`, (done) => {

            let timeField: IOriginalTimeField = null;

            try {
                timeField = new OriginalTimeField(`24:00:00`);
                timeField.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                timeField = new OriginalTimeField(`00:350:01`);
                timeField.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                timeField = new OriginalTimeField(`00:00:62`);
                timeField.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                timeField = new OriginalTimeField(`a`);
                timeField.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                timeField = new OriginalTimeField(`4908`);
                timeField.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                timeField = new OriginalTimeField(``);
                timeField.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                timeField = new OriginalTimeField(` `);
                timeField.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            done();
        });
    });
});
