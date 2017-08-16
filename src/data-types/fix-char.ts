import { FixTypeValidationError } from '../errors/FixTypeValidationError';
import { FixBaseType, IFixBaseType } from './fix-base-type';

export interface IFixChar extends IFixBaseType {
    value: string;
}

export class FixChar extends FixBaseType implements IFixChar {

    protected _value: string = null;

    private _matcher: RegExp = /\d+=\w+\x01/;

    constructor(raw: string) {
        super(raw);

        // Ensure no SOH characters exist in the raw input.
        if (this._value.match(this._matcher) === null) return;

        // If we get here, validation failed, so throw an error.
        throw new FixTypeValidationError(`unable to validate char ${this._value} against FIX standards`);
    }

    public get value(): string { return this._value as string; }
}
