export interface IFixVersion {
    versionNumeric: number;
    versionString: string;
}

export class FixVersion implements IFixVersion {

    protected _versionNumeric: number = null;
    protected _versionString: string  = null;

    // Accepts either a number or a string.  Conversion to the other type occurs during construction.
    constructor(version: number | string) {
        if (typeof version === 'string') {
            this._versionString  = version;

            // WARNING: This has the potential to fail.
            this._versionNumeric = parseFloat(version);
        } else if (typeof version === 'number') {
            this._versionNumeric = version;
            this._versionString  = version.toString();
        }
    }

    public get versionNumeric(): number { return this._versionNumeric; }

    public get versionString(): string { return this._versionString; }
}