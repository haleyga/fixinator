import { FixTypeValidationError } from '../errors/FixTypeValidationError';
import { FixinatorParseError } from '../errors/FixinatorParseError';
import { FixBaseType, IFixBaseType } from './fix-base-type';

export interface IFixInt extends IFixBaseType {
    value: number;
}

export class FixInt extends FixBaseType implements IFixInt {

    protected _value: number = null;

    constructor(raw: string) {
        super(raw);

        const trimmedRaw = this._raw.trim();
        if (trimmedRaw.match(/^-?\d+$/) == null) {
            throw new FixinatorParseError(`unable to parse [${this._raw}] as FIX integer`);
        }

        // Parse the string using built-in functions.
        const parsedValue: number = parseInt(trimmedRaw);

        if (isNaN(parsedValue)) throw new FixinatorParseError(`unable to parse [${this._raw}] as FixInt`);

        // If the value is parsed, validate it according to the FIX standard.
        if (Number(trimmedRaw) === parsedValue && parsedValue % 1 === 0) this._value = parsedValue;
        else throw new FixTypeValidationError(`unable to validate integer ${this._raw} against FIX standards`);
    }

    public get value(): number { return this._value as number; }
}
