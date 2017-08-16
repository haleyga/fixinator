import { FixChar, IFixChar } from '../../../data-types/fix-char';
import { FixinatorValidationError } from '../../../errors/FixinatorValidationError';
import { Tag } from '../../../tag';
import { StringKeyObjectValue } from '../../../util/util';
import { BaseField, IBaseField } from '../base-field';

export interface IBaseEnumField extends IBaseField {
    data: IFixChar;
    formatted: EnumFieldReturnType;
}

export type EnumFieldReturnType = [{}, string];

export abstract class BaseEnumField extends BaseField implements IBaseEnumField {

    protected _data: IFixChar              = null;
    protected _formatted: EnumFieldReturnType = null;

    protected _valueMap: StringKeyObjectValue<EnumFieldReturnType> = null;

    constructor(tag: Tag, raw: string, valueMap: StringKeyObjectValue<EnumFieldReturnType>) {
        super(tag, raw);

        this._valueMap = valueMap;
    }

    public get data(): IFixChar {

        // If the value is valid, just return it.
        if (this._isValid) return this._data;

        // Warn of this inappropriate attempt at accessing an non-validated value.  Always, validate first!
        this.logAccessOfInvalidField(this);

        return null;
    }

    public get formatted(): EnumFieldReturnType {

        // If the value is valid, just return it.
        if (this._isValid) return this._formatted;

        // Warn of this inappropriate attempt at accessing an non-validated value.  Always, validate first!
        this.logAccessOfInvalidField(this);

        return null;
    }

    public validate(): boolean {

        try {

            // Ensure the user actually defined some allowed values.
            let count = 0;
            for (const key in this._valueMap) {
                if (this._valueMap.hasOwnProperty(key)) count++;
            }

            if (count === 0) {
                const message = `${this.constructor.name}#validate => type has no allowed values defined`;
                throw new FixinatorValidationError(message);
            }

            // Attempt to parse the raw value.
            this._data = new FixChar(this._raw);

            const dataString = this._data.toString();

            // Now ensure it conforms to the permitted values.
            if (!this._valueMap.hasOwnProperty(dataString)) {
                const message = `${this.constructor.name}#validate => unknown value ${this._raw}`;
                throw new FixinatorValidationError(message);
            }

            // It's valid.
            const value = this._valueMap[dataString];
            this._formatted = [value[0], value[1]];

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
