import { FixInt, IFixInt } from '../../../data-types/fix-int';
import { Tag } from '../../../tag';
import { BaseField, IBaseField } from '../base-field';

export interface IFixIntField extends IBaseField {
    data: IFixInt;
    formatted: number;
}

/**
 * Field ID (TAG): 16
 * Field Name: BeginSeqNo
 * Format: int
 * Description: Message sequence number of last record in range to be resent. If request is for a single record
 *              BeginSeqNo = EndSeqNo. If request is for all messages subsequent to a particular message, EndSeqNo =
 *              "99999"
 */
export abstract class FixIntField extends BaseField implements IFixIntField {

    protected _data: IFixInt = null;
    protected _formatted: number = null;

    constructor(tag: Tag, raw: string) {
        super(tag, raw);
    }

    public get data(): IFixInt {

        // If the value is valid, just return it.
        if (this._isValid) return this._data;

        // Warn of this inappropriate attempt at accessing an non-validated value.  Always, validate first!
        this.logAccessOfInvalidField(this);

        return null;
    }

    public get formatted(): number {

        // If the value is valid, just return it.
        if (this._isValid) return this._formatted;

        // Warn of this inappropriate attempt at accessing an non-validated value.  Always, validate first!
        this.logAccessOfInvalidField(this);

        return null;
    }

    public validate(): boolean {

        try {

            // Attempt to parse the raw value.
            this._data = new FixInt(this._raw);

            this._formatted = this._data.value;

        } catch (error) {

            // Invalidate the field if the value doesn't pass muster.
            this.invalidate(this);

            // Now rethrow the error.
            throw error;
        }

        if (this._data && this._formatted) this._isValid = true;

        return this._isValid;
    }
}
