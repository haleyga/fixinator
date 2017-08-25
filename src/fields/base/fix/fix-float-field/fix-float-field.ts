import { FixFloat, IFixFloat } from '../../../../data-types/fix-float';
import { BaseField, IBaseField } from '../../base-field';
import { Tag } from '../../tag';

export interface IFixFloatField extends IBaseField<number> {
    data: IFixFloat;
    formatted: number;
}

/**
 * Field ID (TAG): 12
 * Field Name: FixFloat
 * Format: float
 * Description: FixFloat
 *                  Valid values:
 *                      -9.999 - 9999.999
 */
export abstract class FixFloatField extends BaseField<number> implements IFixFloatField {

    protected _data: IFixFloat   = null;
    protected _formatted: number = null;

    constructor(tag: Tag, raw: string) {
        super(tag, raw);
    }

    public get data(): IFixFloat {

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
            this._data = new FixFloat(this._raw);

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
