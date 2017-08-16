import { Tag } from '../../../tag';
import { StringKeyObjectValue } from '../../../util/util';
import { BaseEnumField, IBaseEnumField } from './base-enum-field';

export interface INumberEnumField extends IBaseEnumField {
    formatted: NumberEnumFieldReturnType;
}

export type NumberEnumFieldReturnType = [number, string];

export abstract class NumberEnumField extends BaseEnumField implements INumberEnumField {

    protected _formatted: NumberEnumFieldReturnType = null;

    protected _valueMap: StringKeyObjectValue<NumberEnumFieldReturnType> = null;

    constructor(tag: Tag, raw: string, valueMap: StringKeyObjectValue<NumberEnumFieldReturnType>) {
        super(tag, raw, valueMap);

        this._valueMap = valueMap;
    }

    public get formatted(): NumberEnumFieldReturnType {

        // If the value is valid, just return it.
        if (this._isValid) return this._formatted;

        // Warn of this inappropriate attempt at accessing an non-validated value.  Always, validate first!
        this.logAccessOfInvalidField(this);

        return null;
    }
}
