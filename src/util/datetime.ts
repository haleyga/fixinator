import { FixinatorParseError } from '../errors/FixinatorParseError';
import { padLeft } from './util';

// Disable tslint settings on magic numbers.  Parsing and validating dates/times involves plenty of numerical values
// and too many linting errors would arise in these types.

/* tslint:disable:no-magic-numbers */

// This is somewhat arbitrary.  Since early FIX versions send dates as two digits ('YYMMDD'), the engine must be
// told how to parse a given year.  A cutoff of 2030 has been chosen.  Year values from 00-30 will be parsed as
// 2000-2030.  Year values from 31-99 will be parsed as the previous century: 1931-1999.  The FIX specification
// was started in the 90s, prior to the two-digit year problem.  I've chosen this value to allow for a few years
// of growth.  Also, I don't suspect that too much historical data is passed around, so 1930 trades are ignored (and
// hopefully not needed).
export const TWO_DIGIT_CUTOFF_YEAR: number = 30;

export const TWENTIETH_CENTURY: number    = 1900;
export const TWENTY_FIRST_CENTURY: number = 2000;

// Older versions of FIX work with two-digit years.  This limits it's dates to a 100-year period.  Without no
// specification, I've chosen to work in the work 1931-2030.  This eliminates the need to calculare whether or
// not a year is a leap year.
export const LEAP_YEARS_SINCE_1930: number[] = [1932, 1936, 1940, 1944, 1948, 1952, 1956, 1960, 1964, 1968,
                                                1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008,
                                                2012, 2016, 2020, 2024, 2028];

export const MIN_TWO_DIGIT_YEAR: number  = 0;
export const MAX_TWO_DIGIT_YEAR: number  = 99;
export const MIN_FOUR_DIGIT_YEAR: number = 1931;
export const MAX_FOUR_DIGIT_YEAR: number = 2030;
export const MIN_MONTH: number           = 1;
export const MAX_MONTH: number           = 12;
export const MIN_DAY: number             = 1;
export const MAX_DAY: number             = 31;
export const MIN_HOUR: number            = 0;
export const MAX_HOUR: number            = 23;
export const MIN_MINUTE: number          = 0;
export const MAX_MINUTE: number          = 59;
export const MIN_SECOND: number          = 0;
export const MAX_SECOND: number          = 59;
export const MIN_MILLISECOND: number     = 0;
export const MAX_MILLISECOND: number     = 999;

export const MILLISECONDS_PER_SECOND: number = 1000;
export const SECONDS_PER_MINUTE: number      = 60;
export const MINUTES_PER_HOUR: number        = 60;
export const HOURS_PER_DAY: number           = 24;
export const MILLISECONDS_PER_DAY: number    = HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE
                                               * MILLISECONDS_PER_SECOND;

export const MONTHS_PER_YEAR: number    = 12;
export const DAYS_PER_YEAR: number      = 365;
export const DAYS_PER_LEAP_YEAR: number = 366;

export const DAYS_IN_MONTH: number[]           = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const DAYS_IN_MONTH_LEAP_YEAR: number[] = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const YEARS_PER_CENTURY: number = 100;

export interface IFixinatorTime {
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    stamp: number;
}

export class FixinatorTime implements IFixinatorTime {

    protected readonly _hour: number        = null;
    protected readonly _minute: number      = null;
    protected readonly _second: number      = null;
    protected readonly _millisecond: number = null;
    protected readonly _stamp: number       = null;

    constructor(raw: string) {

        // Destructure the time
        const pieces = raw.split(':').map((piece) => parseInt(piece));
        const hour   = pieces[0];

        if (hour < MIN_HOUR || hour > MAX_HOUR) {
            const message = `${this.constructor.name}#constructor => cannot parse invalid hour in raw data [${raw}]`;
            throw new FixinatorParseError(message);
        }

        this._hour = hour;

        const minute = pieces[1];

        if (minute < MIN_MINUTE || minute > MAX_MINUTE) {
            const message = `${this.constructor.name}#constructor => cannot parse invalid hour in raw data [${raw}]`;
            throw new FixinatorParseError(message);
        }

        this._minute = minute;

        const second = pieces[2];

        if (second < MIN_SECOND || second > MAX_SECOND) {
            const message = `${this.constructor.name}#constructor => cannot parse invalid hour in raw data [${raw}]`;
            throw new FixinatorParseError(message);
        }

        this._second = second;

        const millisecond = 0;
        this._millisecond = millisecond;

        this._stamp = this._hour * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND
                      + this._minute * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND
                      + this._second * MILLISECONDS_PER_SECOND
                      + this._millisecond;

    }

    public get hour(): number { return this._hour; }

    public get minute(): number { return this._minute; }

    public get second(): number { return this._second; }

    public get millisecond(): number { return this._millisecond; }

    public get stamp(): number { return this._stamp; }
}

export interface IFixinatorDate {
    year: number;
    month: number;
    day: number;
    stamp: number;
    isLeapYear: boolean;

    toString(): string;
}

export class FixinatorDate implements IFixinatorDate {

    protected readonly _year: number  = null;
    protected readonly _month: number = null;
    protected readonly _day: number   = null;

    protected readonly _stamp: number       = null;
    protected readonly _stampString: string = null;
    protected readonly _isLeapYear: boolean = null;

    constructor(raw: string) {

        // Parse and validate the year

        const year = parseInt(raw.slice(0, 2));

        if (year < MIN_TWO_DIGIT_YEAR || year > MAX_TWO_DIGIT_YEAR) {
            const message = `${this.constructor.name}#constructor => cannot parse invalid year in raw data [${raw}]`;
            throw new FixinatorParseError(message);
        }

        this._year = (year <= TWO_DIGIT_CUTOFF_YEAR) ? year + TWENTY_FIRST_CENTURY : year + TWENTIETH_CENTURY;

        this._isLeapYear = LEAP_YEARS_SINCE_1930.findIndex((leapYear) => leapYear === this._year) > -1;

        // Parse and validate the month

        const month = parseInt(raw.slice(2, 4));

        if (month < MIN_MONTH || month > MAX_MONTH) {
            const message = `${this.constructor.name}#constructor => cannot parse invalid month in raw data [${raw}]`;
            throw new FixinatorParseError(message);
        }

        this._month = month;

        // Parse and validate the day

        const day = parseInt(raw.slice(4, 6));

        const minDayInMonth = MIN_DAY;
        const maxDayInMonth = this._isLeapYear
            ? DAYS_IN_MONTH_LEAP_YEAR[this._month - 1]
            : DAYS_IN_MONTH[this._month - 1];

        if (day < minDayInMonth || day > maxDayInMonth) {
            const message = `${this.constructor.name}#constructor => cannot parse invalid day in raw data [${raw}]`;
            throw new FixinatorParseError(message);
        }

        this._day = day;

        // Generate a numerical value for the date. This could use UNIX time, but since FIX is so self-contained
        // (and I've defined a specific, 100 year range for the data) this will just generate a stamp since the
        // beginning of 1931 (see description for TWO_DIGIT_CUTOFF_YEAR above) in the format YYYYMMDD.  This is a
        // comparable value that can be used to quickly determine which date among two is greater.

        // This might seem ugly, sorry...

//        const priorLapsedYears        = this._year - this.START_YEAR;
//        const priorLapsedLeapYears    = this.LEAP_YEARS_SINCE_1930.filter((leapYear) => leapYear < this._year).length;
//        const priorLapsedNonLeapYears = priorLapsedYears - priorLapsedLeapYears;
//        const priorLapsedMilliseconds = (priorLapsedLeapYears * DAYS_PER_LEAP_YEAR
//                                         + priorLapsedNonLeapYears * DAYS_PER_YEAR) * MILLISECONDS_PER_DAY;
//
//        const lapsedDaysPriorToMonth     = this._isLeapYear
//            ? DAYS_IN_MONTH_LEAP_YEAR.slice(0, this._month - 1).reduce((sum, value) => sum + value, 0)
//            : DAYS_IN_MONTH.slice(0, this._month - 1).reduce((sum, value) => sum + value, 0);
//        const lapsedDaysThisMonth        = this._day;
//        const lapsedDaysThisYear         = lapsedDaysPriorToMonth + lapsedDaysThisMonth;
//        const lapsedMillisecondsThisYear = lapsedDaysThisYear * MILLISECONDS_PER_DAY;
//
//        this._stamp = priorLapsedMilliseconds + lapsedMillisecondsThisYear;

        this._stampString = this._getStampString();
        this._stamp       = parseInt(this._stampString);

    }

    /**
     * This static utility accepts a number or a string and determines whether or not its numerical, four-digit year
     * equivalent is a leap year.  Since this engine only operates within the frame 1931 - 2030, any arguments are
     * parsed to a four-digit year in that range.  If the argument cannot be parsed into a valid, four-digit year
     * within the range, false is returned.
     *
     * @param {string | number} yearArg
     * @returns {boolean}
     */
    public static yearIsLeapYear(yearArg: string | number): boolean {

        const yearString: string = typeof yearArg === 'number' ? yearArg.toString() : yearArg;
        if (!yearString) return false;

        const year: number       = this.getFourDigitYear(yearString);

        return year ? LEAP_YEARS_SINCE_1930.findIndex((leapYear) => leapYear === year) !== -1 : false;
    }

    /**
     * This static utility accepts a number or a string and returns a four-digit year within the engine's time frame
     * (1931 - 2030).  If a full, four-digit year string is passed as an argument, but is outside the standard
     * range, null will be returned.  If the argument cannot be parsed into a valid number, null will be returned.
     *
     * @param {string | number} yearArg
     * @returns {number}
     */
    public static getFourDigitYear(yearArg: string | number): number {

        let yearString: string = typeof yearArg === 'number' ? yearArg.toString() : yearArg;
        if (!yearString) return null;

        if (yearString.length < 2) yearString = padLeft(yearString, '0', 2);

        // If the string is an irregular length (for a year), return null.
        if (yearString.length !== 2 && yearString.length !== 4) return null;

        let year: number = Number(yearString);
        if (yearString.length === 2) year += year > TWO_DIGIT_CUTOFF_YEAR ? 1900 : 2000;
        if (year >= MIN_FOUR_DIGIT_YEAR && year <= MAX_FOUR_DIGIT_YEAR) return year;

        return null;
    }

    /**
     * This static utility accepts a number or a string and returns a two-digit string compliant with the two-digit
     * format in early FIX versions.  If the year is invalid, null is returned.
     *
     * @param {string | number} yearArg
     * @returns {number}
     */
    public static getTwoDigitYearString(yearArg: string | number): string {

        const year: number = typeof yearArg === 'string' ? Number(yearArg) : yearArg;

        if (isNaN(year)) return null;

        let yearString: string = null;
        if (year >= MIN_FOUR_DIGIT_YEAR && year < TWENTY_FIRST_CENTURY) {
            yearString = (year - TWENTIETH_CENTURY).toString();
        } else if (year >= TWENTY_FIRST_CENTURY && year <= MAX_FOUR_DIGIT_YEAR) {
            yearString = (year - TWENTY_FIRST_CENTURY).toString();
        } else if (year >= 0 && year < YEARS_PER_CENTURY) {
            yearString = year.toString();
        }

        if (!yearString) return null;

        return padLeft(yearString, '0', 2);
    }

    public get year(): number { return this._year; }

    public get month(): number { return this._month; }

    public get day(): number { return this._day; }

    public get stamp(): number { return this._stamp; }

    public get isLeapYear(): boolean { return this._isLeapYear; }

    public toString(): string { return this._stampString; }

    private _getStampString(): string {
        const year  = this._year ? ('0000' + this._year).slice(-4) : null;
        const month = this._month ? ('00' + this._month).slice(-2) : null;
        const day   = this._day ? ('00' + this._day).slice(-2) : null;

        return (!year || !month || !day) ? null : year + month + day;
    }
}
