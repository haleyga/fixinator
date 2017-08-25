import { FixChar } from '../../../../data-types/fix-char';
import { FixinatorValidationError } from '../../../../errors/FixinatorValidationError';
import { IConstrained } from '../../../../util/constrained';
import { FixCharField, IFixCharField } from '../../fix/fix-char-field/fix-char-field';
import { Tag } from '../../tag';

export interface IConstrainedCharField extends IFixCharField, IConstrained<string> {}

export abstract class ConstrainedCharField extends FixCharField implements IConstrainedCharField {

    protected _allowedValues: string[] = null;

    constructor(tag: Tag, raw: string, allowedValues: string[]) {
        super(tag, raw);

        this._allowedValues = allowedValues;
    }

    public get allowedValues(): string[] { return this._allowedValues; }

    public validate(): boolean {

        try {

            // Ensure the user actually defined some allowed values.
            if (this._allowedValues.length === 0) {
                const message = `${this.constructor.name}#validate => type has no allowed values defined`;
                throw new FixinatorValidationError(message);
            }

            // Attempt to parse the raw value.
            this._data = new FixChar(this._raw);

            // Ensure it conforms to the permitted values.
            if (this._allowedValues.find((allowedValue) => allowedValue === this._data.value) === null) {
                const message = `${this.constructor.name}#validate => raw value [${this._raw}] is not an allowed value`;
                throw new FixinatorValidationError(message);
            }

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
