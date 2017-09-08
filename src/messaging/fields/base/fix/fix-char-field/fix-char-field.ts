import { FixChar, IFixChar } from '../../../../data-types/fix-char';
import { BaseField, IBaseField } from '../../base-field';
import { Tag } from '../../tag';

export interface IFixCharField extends IBaseField<string> {
    data: IFixChar;
    formatted: string;
}

export abstract class FixCharField extends BaseField<string> implements IFixCharField {

    protected _data: IFixChar    = null;
    protected _formatted: string = null;

    constructor(tag: Tag, raw: string) {
        super(tag, raw);
    }

    /**
     * Any access to #data prior to validation will result in a null value being returned and a log entry about the
     * transgression.
     *
     * @returns {string}
     */
    public get data(): IFixChar {

        // If the value is valid, just return it.
        if (this._isValid) return this._data;

        // Warn of this inappropriate attempt at accessing an non-validated value.  Always, validate first!
        this.logAccessOfInvalidField(this);

        return null;
    }

    public get formatted(): string {

        // If the value is valid, just return it.
        if (this._isValid) return this._formatted;

        // Warn of this inappropriate attempt at accessing an non-validated value.  Always, validate first!
        this.logAccessOfInvalidField(this);

        return null;
    }

    public validate(): boolean {

        try {

            // Attempt to parse the raw value.
            this._data = new FixChar(this._raw);

            this._formatted = this._data.value;

        } catch (error) {

            // Invalidate the field if the value doesn't pass muster.
            this.invalidate(this);

            // Now rethrow the error.
            throw error;
        }

        if (this._data && this._formatted !== null) this._isValid = true;

        return this._isValid;
    }
}
