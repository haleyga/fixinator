import * as chai from 'chai';
import 'mocha';
import { FixinatorParseError } from '../../../../errors/FixinatorParseError';
import {
    DAYS_IN_MONTH,
    DAYS_IN_MONTH_LEAP_YEAR,
    FixinatorDate,
    IFixinatorDate,
    MAX_MONTH,
    MAX_TWO_DIGIT_YEAR,
    TWENTIETH_CENTURY,
    TWENTY_FIRST_CENTURY,
    TWO_DIGIT_CUTOFF_YEAR,
} from '../../../../util/datetime';
import { padLeft } from '../../../../util/util';
import { Tag } from '../../tag';
import { DateField } from './date-field';

/* tslint:disable:no-magic-numbers */
/* tslint:disable:no-unused-expression */

/* tslint:disable:only-arrow-functions */

class DateFieldSpec extends DateField {}

// Use regular callback functions instead of arrow functions since we need to access the Mocha context
// (this.timeout) rather than use the lexical binding provided by an arrow function.
describe('date-field.spec.ts', () => {

    // Early version of FIX used two-digit dates.  In Fixinator, these dates wrap from 1931 to 2030.  See FixinatorDate
    // documentation/comments for details.
    describe('DateField', function () {

        it(`should parse all valid FIX dates (format => YYMMDD)`, (done) => {

            for (let year = 0; year <= MAX_TWO_DIGIT_YEAR; year++) {
                for (let month = 1; month <= MAX_MONTH; month++) {
                    const maxDayInMonth = FixinatorDate.yearIsLeapYear(year)
                        ? DAYS_IN_MONTH_LEAP_YEAR[month - 1]
                        : DAYS_IN_MONTH[month - 1];
                    for (let day = 1; day <= maxDayInMonth; day++) {
                        const yearString  = padLeft(year.toString(), '0', 2);
                        const monthString = padLeft(month.toString(), '0', 2);
                        const dayString   = padLeft(day.toString(), '0', 2);
                        const dateField   = new DateFieldSpec(Tag.DUMMY_TAG, `${yearString}${monthString}${dayString}`);

                        const compareYear = year <= TWO_DIGIT_CUTOFF_YEAR
                            ? year + TWENTY_FIRST_CENTURY
                            : year + TWENTIETH_CENTURY;

                        dateField.validate();
                        chai.expect(dateField.date.year).to.equal(compareYear);
                        chai.expect(dateField.date.month).to.equal(month);
                        chai.expect(dateField.date.day).to.equal(day);
                        chai.expect(dateField.date.stamp).not.to.be.null;
                    }
                }
            }

            done();
        });

        it(`should fail to parse invalid FIX dates`, (done) => {

            let date: DateFieldSpec = null;

            try {
                date = new DateFieldSpec(Tag.DUMMY_TAG, `24:00:00`);
                date.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new DateFieldSpec(Tag.DUMMY_TAG, `999999`);
                date.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new DateFieldSpec(Tag.DUMMY_TAG, `-1`);
                date.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new DateFieldSpec(Tag.DUMMY_TAG, `a`);
                date.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new DateFieldSpec(Tag.DUMMY_TAG, `0000000`);
                date.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new DateFieldSpec(Tag.DUMMY_TAG, ``);
                date.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new DateFieldSpec(Tag.DUMMY_TAG, `08/08/2017`);
                date.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new DateFieldSpec(Tag.DUMMY_TAG, `08/08/17`);
                date.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new DateFieldSpec(Tag.DUMMY_TAG, `08-08-2017`);
                date.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new DateFieldSpec(Tag.DUMMY_TAG, `08-08-17`);
                date.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new DateFieldSpec(Tag.DUMMY_TAG, ` `);
                date.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            done();
        });
    });

});
