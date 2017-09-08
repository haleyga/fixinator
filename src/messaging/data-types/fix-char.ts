import { FixTypeValidationError } from '../../errors/FixTypeValidationError';
import { STANDARD_DELIMITER } from '../../util/util';
import { FixBaseType, IFixBaseType } from './fix-base-type';

export interface IFixChar extends IFixBaseType {
    value: string;
}

export class FixChar extends FixBaseType implements IFixChar {

    protected _value: string = null;

    constructor(raw: string) {
        super(raw);

        this._value = this._raw as string;

        // Ensure no SOH characters exist in the raw input.
        if (this._value.indexOf(STANDARD_DELIMITER) === -1) return;

        // If we get here, validation failed, so throw an error.
        throw new FixTypeValidationError(`unable to validate char ${this._value} against FIX standards`);
    }

    public get value(): string { return this._value as string; }
}
