import * as chai from 'chai';
import 'mocha';

import { FixinatorParseError } from '../errors/FixinatorParseError';
import {
    DAYS_IN_MONTH,
    DAYS_IN_MONTH_LEAP_YEAR,
    FixinatorDate,
    FixinatorTime,
    IFixinatorDate,
    IFixinatorTime,
    LEAP_YEARS_SINCE_1930,
    MAX_FOUR_DIGIT_YEAR,
    MAX_HOUR,
    MAX_MINUTE,
    MAX_MONTH,
    MAX_SECOND,
    MAX_TWO_DIGIT_YEAR,
    MIN_FOUR_DIGIT_YEAR,
    TWENTIETH_CENTURY,
    TWENTY_FIRST_CENTURY,
    TWO_DIGIT_CUTOFF_YEAR,
} from './datetime';
import { padLeft } from './util';

/* tslint:disable:no-magic-numbers */
/* tslint:disable:no-unused-expression */
/* tslint:disable:only-arrow-functions */

// Use regular callback functions instead of arrow functions since we need to access the Mocha context
// (this.timeout) rather than use the lexical binding provided by an arrow function.
describe('datetime.spec.ts', function () {

    this.timeout(10000);;

    describe('FixinatorTime', () => {

        it(`should parse all valid FIX times (format => 'HH:MM:SS')`, (done) => {

            for (let hour = 0; hour <= MAX_HOUR; hour++) {
                for (let minute = 0; minute <= MAX_MINUTE; minute++) {
                    for (let second = 0; second <= MAX_SECOND; second++) {
                        const hourString   = padLeft(hour.toString(), '0', 2);
                        const minuteString = padLeft(minute.toString(), '0', 2);
                        const secondString = padLeft(second.toString(), '0', 2);
                        const time         = new FixinatorTime(`${hourString}:${minuteString}:${secondString}`);

                        chai.expect(time.hour).to.equal(hour);
                        chai.expect(time.minute).to.equal(minute);
                        chai.expect(time.second).to.equal(second);
                        chai.expect(time.millisecond).to.equal(0);
                        chai.expect(time.stamp).not.to.be.null;
                    }
                }
            }

            done();
        });

        it(`should fail to parse invalid FIX times`, (done) => {

            let time: IFixinatorTime = null;

            try {
                time = new FixinatorTime(`24:00:00`);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                time = new FixinatorTime(`00:350:01`);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                time = new FixinatorTime(`00:00:62`);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                time = new FixinatorTime(`a`);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                time = new FixinatorTime(`4908`);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                time = new FixinatorTime(``);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                time = new FixinatorTime(` `);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            done();
        });
    });

    // Early version of FIX used two-digit dates.  In Fixinator, these dates wrap from 1931 to 2030.  See FixinatorDate
    // documentation/comments for details.
    describe('FixinatorDate', () => {

        // test the full range of reasonable years (e.g. 1900 - 2050)
        // years outside the ranges 1931 - 2030 will be shaped to fit (e.g. 2050 => 1950, 1921 => 2021)
        it(`should parse a valid, numeric string into the correct two-digit year`, (done) => {
            for (let year = 1900; year < 2100; year++) {
                const fourDigitYearString = year.toString();
                const twoDigitYear        = FixinatorDate.getTwoDigitYearString(fourDigitYearString);

                if (year < MIN_FOUR_DIGIT_YEAR || year > MAX_FOUR_DIGIT_YEAR) {
                    chai.expect(twoDigitYear).to.be.null;
                } else {
                    chai.expect(twoDigitYear).to.equal(fourDigitYearString.slice(2));
                }
            }

            for (let year = 0; year < 100; year++) {
                const twoDigitYearString = year.toString();
                const twoDigitYear       = FixinatorDate.getTwoDigitYearString(twoDigitYearString);

                chai.expect(twoDigitYear).to.equal(padLeft(twoDigitYearString, '0', 2));
            }

            done();
        });

        it(`should fail to parse an invalid string into a two-digit year`, (done) => {
            done();
        });

        it(`should parse a valid, numeric string into the correct four-digit year`, (done) => {
            for (let year = 1900; year < 2051; year++) {
                const fourDigitYearString     = year.toString();
                const fourDigitYearFromString = FixinatorDate.getFourDigitYear(fourDigitYearString);
                const fourDigitYearFromNumber = FixinatorDate.getFourDigitYear(year);

                if (year < MIN_FOUR_DIGIT_YEAR || year > MAX_FOUR_DIGIT_YEAR) {
                    chai.expect(fourDigitYearFromString).to.be.null;
                    chai.expect(fourDigitYearFromNumber).to.be.null;
                } else {
                    chai.expect(fourDigitYearFromString).to.equal(year);
                    chai.expect(fourDigitYearFromNumber).to.equal(year);
                }
            }

            for (let year = 0; year < 100; year++) {
                const twoDigitYearString      = padLeft(year.toString(), '0', 2);
                const fourDigitYearFromString = FixinatorDate.getFourDigitYear(twoDigitYearString);
                const fourDigitYearFromNumber = FixinatorDate.getFourDigitYear(year);

                if (year <= TWO_DIGIT_CUTOFF_YEAR) {
                    chai.expect(fourDigitYearFromString).to.equal(year + TWENTY_FIRST_CENTURY);
                    chai.expect(fourDigitYearFromNumber).to.equal(year + TWENTY_FIRST_CENTURY);
                } else {
                    chai.expect(fourDigitYearFromString).to.equal(year + TWENTIETH_CENTURY);
                    chai.expect(fourDigitYearFromNumber).to.equal(year + TWENTIETH_CENTURY);
                }
            }

            done();
        });

        it(`should fail to parse an invalid string into a four-digit year`, (done) => {

            done();
        });

        it(`should correctly determine that a leap year is a leap year`, (done) => {
            for (const year of LEAP_YEARS_SINCE_1930) {
                const fourDigitYearString    = year.toString();
                const twoDigitYearString     = FixinatorDate.getTwoDigitYearString(year);
                const twoDigitYearFromString = Number(twoDigitYearString);

                chai.expect(FixinatorDate.yearIsLeapYear(year)).to.be.true;
                chai.expect(FixinatorDate.yearIsLeapYear(fourDigitYearString)).to.be.true;
                chai.expect(FixinatorDate.yearIsLeapYear(twoDigitYearString)).to.be.true;
                chai.expect(FixinatorDate.yearIsLeapYear(twoDigitYearFromString)).to.be.true;
            }

            done();
        });

        it(`should determine that a non-leap years (and invalid arguments) are not leap years`, (done) => {
            for (let year = 1900; year < 2051; year++) {

                // We know these are leap years, skip for the purposes of this test.
                if (LEAP_YEARS_SINCE_1930.findIndex((leapYear) => leapYear === year) !== -1) continue;

                const fourDigitYearString    = year.toString();
                const twoDigitYearString     = FixinatorDate.getTwoDigitYearString(year);
                const twoDigitYearFromString = Number(twoDigitYearString);

                chai.expect(FixinatorDate.yearIsLeapYear(year)).to.be.false;
                chai.expect(FixinatorDate.yearIsLeapYear(fourDigitYearString)).to.be.false;
                if (twoDigitYearString) {
                    chai.expect(FixinatorDate.yearIsLeapYear(twoDigitYearString)).to.be.false;
                    chai.expect(FixinatorDate.yearIsLeapYear(twoDigitYearFromString)).to.be.false;
                }
            }

            for (let year = 0; year < 100; year++) {

                // We know these are leap years, skip for the purposes of this test.
                const fourDigitYear = FixinatorDate.getFourDigitYear(year);
                if (LEAP_YEARS_SINCE_1930.findIndex((leapYear) => leapYear === fourDigitYear) !== -1) continue;

                const twoDigitYearString = year.toString();

                chai.expect(FixinatorDate.yearIsLeapYear(year)).to.be.false;
                chai.expect(FixinatorDate.yearIsLeapYear(twoDigitYearString)).to.be.false;
            }

            chai.expect(FixinatorDate.yearIsLeapYear('')).to.be.false;
            chai.expect(FixinatorDate.yearIsLeapYear('asd')).to.be.false;

            done();
        });

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
                        const date        = new FixinatorDate(`${yearString}${monthString}${dayString}`);

                        const compareYear = year <= TWO_DIGIT_CUTOFF_YEAR
                            ? year + TWENTY_FIRST_CENTURY
                            : year + TWENTIETH_CENTURY;

                        chai.expect(date.year).to.equal(compareYear);
                        chai.expect(date.month).to.equal(month);
                        chai.expect(date.day).to.equal(day);
                        chai.expect(date.stamp).not.to.be.null;
                    }
                }
            }

            done();
        });

        it(`should fail to parse invalid FIX dates`, (done) => {

            let date: IFixinatorDate = null;

            try {
                date = new FixinatorDate(`24:00:00`);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new FixinatorDate(`999999`);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new FixinatorDate(`-1`);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new FixinatorDate(`a`);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new FixinatorDate(`0000000`);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new FixinatorDate(``);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new FixinatorDate(`08/08/2017`);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new FixinatorDate(`08/08/17`);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new FixinatorDate(`08-08-2017`);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new FixinatorDate(`08-08-17`);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                date = new FixinatorDate(` `);
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            done();
        });
    });

});
