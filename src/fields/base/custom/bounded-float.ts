import { FixFloat } from '../../../data-types/fix-float';
import { FixinatorValidationError } from '../../../errors/FixinatorValidationError';
import { Tag } from '../../../tag';
import { FixFloatField, IFixFloatField } from '../fix/fix-float-field';

export interface IBoundedFloatField extends IFixFloatField {
    min: number;
    max: number;
}

/**
 * Field ID (TAG): 12
 * Field Name: BoundedFloat
 * Format: float
 * Description: BoundedFloat
 *                  Valid values:
 *                      -9.999 - 9999.999
 */
export abstract class BoundedFloatField extends FixFloatField implements IBoundedFloatField {

    protected _min: number = null;
    protected _max: number = null;

    constructor(tag: Tag, raw: string, min: number, max: number) {
        super(tag, raw);

        this._min = min;
        this._max = max;
    }

    public get min(): number { return this._min; }

    public get max(): number { return this._max; }

    public validate(): boolean {

        try {

            // Attempt to parse the raw value.
            this._data = new FixFloat(this._raw);

            this._formatted = this._data.value;

            // Now some field-specific validation.
            if (this._formatted >= this._min && this._formatted <= this._max) {
                this._isValid = true;
            } else {
                const message = `${this.constructor.name}#validate => unknown value ${this._raw}`;
                throw new FixinatorValidationError(message);
            }

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
