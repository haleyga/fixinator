import { IFixBaseType } from '../../data-types/fix-base-type';
import { Tag } from '../../tag';
import { IFixVersion } from '../../util/fix-version';

export interface IBaseField {
    tag: Tag;
    raw: string;
    data: IFixBaseType;
    formatted: {};
    isValid: boolean;
    minimumSupportedVersion: IFixVersion;
    maximumSupportedVersion: IFixVersion;
    supportedVersions: IFixVersion[];

    validate(): boolean;
}

export abstract class BaseField implements IBaseField {
    protected _tag: Tag                             = null;
    protected _raw: string                          = null;
    protected _data: IFixBaseType                   = null;
    protected _formatted: {}                        = null;
    protected _isValid: boolean                     = null;
    protected _minimumSupportedVersion: IFixVersion = null;
    protected _maximumSupportedVersion: IFixVersion = null;
    protected _supportedVersions: IFixVersion[]     = null;

    constructor(tag: Tag, raw: string) {
        this._tag = tag;
        this._raw = raw;

        // TODO: Fix this - implement it in all fields (ug...)
        this._supportedVersions = [];
        this._supportedVersions.sort((version) => version.versionNumeric);
        this._minimumSupportedVersion = this._supportedVersions[0];
        this._maximumSupportedVersion = this._supportedVersions[this._supportedVersions.length - 1];

        // #_data is assigned in the derived type
        // #_formatted is assigned in the derived type

        // Any access to these fields prior to a call to #validate will result in a logged event and null data being
        // returned.  All fields/values are invalid until explicitly validated (i.e. calling #validate).
        this._isValid = false;
    }

    public get tag(): Tag { return this._tag; }

    /**
     * The raw value is stored separately from the #data property since parsing the raw string into an IFixBaseType
     * may not always be successful.
     *
     * @returns {string}
     */
    public get raw(): string { return this._raw; }

    /**
     * Gets the packed data for the field.
     *
     * @returns {IFixBaseType}
     */
    public abstract get data(): IFixBaseType;

    /**
     * Gets the unpacked and formatted data value of the field.  This is often simply equivalent to #data.value, but
     * since each Field has control over how this is implemented, this is not always the case.  That is the
     * justification for both properties.
     *
     * The type returned by this property is not always a primitive type, so its use cannot always be genericized.
     *
     * @returns {{}}
     */
    public abstract get formatted(): {};

    public get isValid(): boolean { return this._isValid; }

    public get minimumSupportedVersion(): IFixVersion { return this._minimumSupportedVersion; }

    public get maximumSupportedVersion(): IFixVersion { return this._maximumSupportedVersion; }

    public get supportedVersions(): IFixVersion[] { return this._supportedVersions; }

    /**
     * Each concrete field must implement this method individually.
     *
     * @returns {boolean}
     */
    public abstract validate(): boolean;

    /**
     * Invalidates the field and throws an error.  This is typically called, and caught, within the #validate logic
     * of a concrete field implementation.
     *
     * @param {BaseField} caller
     */
    protected invalidate(caller: BaseField): void {

        this._isValid = false;

        const message = `${caller.constructor.name} [tag ${this._tag}] has been invalidated => raw: ${this._raw}`;

        console.warn(message);
    }

    /**
     * Warn the user that an inappropriate attempt at accessing a non-validated value occurred.
     *
     * @param {BaseField} caller
     * @returns {any}
     */
    protected logAccessOfInvalidField(caller: BaseField): void {
        const message = `attempt to access invalid data [${this._raw}] in field ${caller.constructor.name}`;

        console.warn(message);
    }
}
