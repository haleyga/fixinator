import { FixBaseType, IFixBaseType } from './fix-base-type';

export interface IFixData extends IFixBaseType {
    value: string;
}

export class FixData extends FixBaseType implements IFixData {

    protected _value: string = null;

    constructor(raw: string) {
        super(raw);

        this._value = this._raw as string;
    }

    public get value(): string { return this._value as string; }
}
