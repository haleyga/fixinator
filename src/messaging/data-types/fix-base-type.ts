export interface IFixBaseType {
    raw: string;
    value: {};
}

export abstract class FixBaseType implements IFixBaseType {

    protected _raw: string = null;

    constructor(raw: string) {
        this._raw = raw;
    }

    public get raw(): string { return this._raw; }

    public abstract get value(): {};
}
