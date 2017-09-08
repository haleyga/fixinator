import { FixinatorValidationError } from '../../../../../errors/FixinatorValidationError';
import { IBounded } from '../../../../../util/bounded';
import { FixFloat } from '../../../../data-types/fix-float';
import { FixFloatField, IFixFloatField } from '../../fix/fix-float-field/fix-float-field';
import { Tag } from '../../tag';

export interface IBoundedFloatField extends IFixFloatField, IBounded<number> {}

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

            if (this._min > this._max) {
                const message = `${this.constructor.name}#validate => min isn't <= max`;
                throw new FixinatorValidationError(message);
            }

            // Attempt to parse the raw value.
            this._data = new FixFloat(this._raw);

            this._formatted = this._data.value;

            // Now some field-specific validation.
            if (this._formatted < this._min || this._formatted > this._max) {
                const message = `${this.constructor.name}#validate => unknown value ${this._raw}`;
                throw new FixinatorValidationError(message);
            }

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
