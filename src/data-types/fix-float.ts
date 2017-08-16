import { FixBaseType, IFixBaseType } from './fix-base-type';
import { FixinatorParseError } from '../errors/FixinatorParseError';
import { FixTypeValidationError } from '../errors/FixTypeValidationError';

export interface IFixFloat extends IFixBaseType {
    value: number;
}

export class FixFloat extends FixBaseType implements IFixFloat {

    protected _value: number = null;

    constructor(raw: string) {
        super(raw);

        // Parse the string using built-in functions.
        const parsedValue: number = parseFloat(raw);

        if (isNaN(parsedValue)) throw new FixinatorParseError(`unable to parse [${raw}] as FixFloat`);

        // If the value is parsed, validate it according to the FIX standard.
        if (Number(parsedValue) === parsedValue && parsedValue % 1 !== 0) this._value = parsedValue;
        else throw new FixTypeValidationError(`unable to validate float ${raw} against FIX standards`);
    }

    public get value(): number { return this._value as number; }
}