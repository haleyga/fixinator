import { FixinatorParseError } from '../errors/FixinatorParseError';
import { FixBaseType, IFixBaseType } from './fix-base-type';
import { pathExistsSync } from 'fs-extra';

export interface IFixFloat extends IFixBaseType {
    value: number;
}

export class FixFloat extends FixBaseType implements IFixFloat {

    protected _value: number = null;

    constructor(raw: string) {
        super(raw);

        const trimmedRaw = this._raw.trim();
        const parsedValue: number = Number(trimmedRaw);

        if (isNaN(parsedValue)) throw new FixinatorParseError(`unable to parse [${this._raw}] as float`);

        this._value = parsedValue;
    }

    public get value(): number { return this._value as number; }
}
