import { Tag } from '../../../tag';
import { StringKeyObjectValue } from '../../../util/util';
import { BaseEnumField, IBaseEnumField } from './base-enum-field';

export interface IStringEnumField extends IBaseEnumField {
    formatted: StringEnumFieldReturnType;
}

export type StringEnumFieldReturnType = [string, string];

export abstract class StringEnumField extends BaseEnumField implements IStringEnumField {

    protected _formatted: StringEnumFieldReturnType = null;

    protected _valueMap: StringKeyObjectValue<StringEnumFieldReturnType> = null;

    constructor(tag: Tag, raw: string, valueMap: StringKeyObjectValue<StringEnumFieldReturnType>) {
        super(tag, raw, valueMap);

        this._valueMap = valueMap;
    }

    public get formatted(): StringEnumFieldReturnType {

        // If the value is valid, just return it.
        if (this._isValid) return this._formatted;

        // Warn of this inappropriate attempt at accessing an non-validated value.  Always, validate first!
        this.logAccessOfInvalidField(this);

        return null;
    }
}
