export interface IFixBaseType {
    raw: {};
    value: {};
}

export abstract class FixBaseType implements IFixBaseType {

    protected _raw: {}   = null;
    protected _value: {} = null;

    constructor(raw: {}) {
        this._raw   = raw;
        this._value = this._raw;
    }

    public get raw(): {} { return this._raw; }

    public get value(): {} { return this._value; }
}
