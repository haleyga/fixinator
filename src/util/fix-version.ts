export interface IFixVersion {
    versionString: string;
}

export class FixVersion implements IFixVersion {

    protected _versionString: string  = null;

    // Accepts either a number or a string.  Conversion to the other type occurs during construction.
    constructor(version: number | string) {
        if (typeof version === 'string') {
            this._versionString  = version;

        } else if (typeof version === 'number') {
            this._versionString  = version.toString();
        }
    }

    public get versionString(): string { return this._versionString; }
}
