import { FixinatorParseError } from '../errors/FixinatorParseError';

// Disable tslint settings on magic numbers.  Parsing and validating dates/times involves plenty of numerical values
// and too many linting errors would arise in these types.

/* tslint:disable:no-magic-numbers */

export const MIN_YEAR: number        = 0;
export const MAX_YEAR: number        = 99;
export const MIN_MONTH: number       = 1;
export const MAX_MONTH: number       = 12;
export const MIN_DAY: number         = 1;
export const MAX_DAY: number         = 31;
export const MIN_HOUR: number        = 0;
export const MAX_HOUR: number        = 23;
export const MIN_MINUTE: number      = 0;
export const MAX_MINUTE: number      = 59;
export const MIN_SECOND: number      = 0;
export const MAX_SECOND: number      = 59;
export const MIN_MILLISECOND: number = 0;
export const MAX_MILLISECOND: number = 999;

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
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
    stamp: number;
}

export class FixinatorTime implements IFixinatorTime {

    protected readonly _hours: number        = null;
    protected readonly _minutes: number      = null;
    protected readonly _seconds: number      = null;
    protected readonly _milliseconds: number = null;
    protected readonly _stamp: number        = null;

    constructor(raw: string) {

        // Destructure the time
        const pieces       = raw.split(':').map((piece) => parseInt(piece));
        this._hours        = pieces[0];
        this._minutes      = pieces[1];
        this._seconds      = pieces[2];
        this._milliseconds = 0;

        this._stamp = this._hours * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND
                      + this._minutes * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND
                      + this._seconds * MILLISECONDS_PER_SECOND
                      + this._milliseconds;

    }

    public get hours(): number { return this._hours; }

    public get minutes(): number { return this._minutes; }

    public get seconds(): number { return this._seconds; }

    public get milliseconds(): number { return this._milliseconds; }

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

    // This is somewhat arbitrary.  Since early FIX versions send dates as two digits ('YYMMDD'), the engine must be
    // told how to parse a given year.  A cutoff of 2030 has been chosen.  Year values from 00-30 will be parsed as
    // 2000-2030.  Year values from 31-99 will be parsed as the previous century: 1931-1999.  The FIX specification
    // was started in the 90s, prior to the two-digit year problem.  I've chosen this value to allow for a few years
    // of growth.  Also, I don't suspect that too much historical data is passed around, so 1930 trades are ignored (and
    // hopefully not needed).
    private readonly CUTOFF_YEAR: number = 30;
    private readonly START_YEAR: number  = 1931;
    private readonly END_YEAR: number    = 2030;

    private readonly TWENTIETH_CENTURY: number    = 1900;
    private readonly TWENTY_FIRST_CENTURY: number = 2000;

    // Older versions of FIX work with two-digit years.  This limits it's dates to a 100-year period.  Without no
    // specification, I've chosen to work in the work 1931-2030.  This eliminates the need to calculare whether or
    // not a year is a leap year.
    private readonly LEAP_YEARS_SINCE_1930: number[] = [1932, 1936, 1940, 1944, 1948, 1952, 1956, 1960, 1964, 1968,
                                                        1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008,
                                                        2012, 2016, 2020, 2024, 2028];

    constructor(raw: string) {

        // Parse and validate the year

        const year = parseInt(raw.slice(0, 2));

        if (year < MIN_YEAR || year > MAX_YEAR) {
            const message = `${this.constructor.name}#constructor => cannot parse invalid year in raw data [${raw}]`;
            throw new FixinatorParseError(message);
        }

        this._year = (year <= this.CUTOFF_YEAR) ? year + this.TWENTIETH_CENTURY : year + this.TWENTY_FIRST_CENTURY;

        this._isLeapYear = this.LEAP_YEARS_SINCE_1930.findIndex((leapYear) => leapYear === this._year) > -1;

        // Parse and validate the month

        const month = parseInt(raw.slice(2, 2));

        if (month < MIN_MONTH || month > MAX_MONTH) {
            const message = `${this.constructor.name}#constructor => cannot parse invalid month in raw data [${raw}]`;
            throw new FixinatorParseError(message);
        }

        this._month = month;

        // Parse and validate the day

        const day = parseInt(raw.slice(4, 2));

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
        // beginning of 1931 (see description for CUTOFF_YEAR above) in the format YYYYMMDD.  This is a comparable
        // value that can be used to quickly determine which date among two is greater.

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

        return (!year || !month || !day) ? year + month + day : null;
    }
}
