import * as chai from 'chai';
import 'mocha';
import { FixinatorParseError } from '../../errors/FixinatorParseError';
import {
    DAYS_IN_MONTH,
    DAYS_IN_MONTH_LEAP_YEAR,
    FixinatorDate,
    MAX_MONTH,
    MAX_TWO_DIGIT_YEAR,
    TWENTIETH_CENTURY,
    TWENTY_FIRST_CENTURY,
    TWO_DIGIT_CUTOFF_YEAR,
} from '../../util/datetime';
import { padLeft } from '../../util/util';
import { ITradeDateField, TradeDateField } from './trade-date';

//tslint:disable:no-magic-numbers
//tslint:disable:no-unused-expression

describe('trade-date.spec.ts', () => {

    describe('TradeDateField', () => {

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
                        const dateField   = new TradeDateField(`${yearString}${monthString}${dayString}`);

                        dateField.validate();

                        const compareYear = year <= TWO_DIGIT_CUTOFF_YEAR
                            ? year + TWENTY_FIRST_CENTURY
                            : year + TWENTIETH_CENTURY;

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

            let dateField: ITradeDateField = null;

            try {
                dateField = new TradeDateField(`24:00:00`);
                dateField.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                dateField = new TradeDateField(`999999`);
                dateField.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                dateField = new TradeDateField(`-1`);
                dateField.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                dateField = new TradeDateField(`a`);
                dateField.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                dateField = new TradeDateField(`0000000`);
                dateField.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                dateField = new TradeDateField(``);
                dateField.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                dateField = new TradeDateField(`08/08/2017`);
                dateField.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                dateField = new TradeDateField(`08/08/17`);
                dateField.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                dateField = new TradeDateField(`08-08-2017`);
                dateField.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                dateField = new TradeDateField(`08-08-17`);
                dateField.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            try {
                dateField = new TradeDateField(` `);
                dateField.validate();
            } catch (error) {
                chai.expect(error).to.be.an.instanceof(FixinatorParseError);
            }

            done();
        });
    });
});
