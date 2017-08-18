import { FixIntField, IFixIntField } from './base/fix/fix-int-field';
import { Tag } from './base/tag';

export interface ILastSharesField extends IFixIntField {}

/**
 * Field ID (TAG): 32
 * Field Name: LastShares
 * Format: int
 * Description: Quantity of shares bought/sold on this fill. Field will be absent for NEW, CANCEL and REPLACE
 *              ExecTransTypes and may be absent when order is NEW, CXLD, DONE or RPLD status.
 */
export class LastSharesField extends FixIntField implements ILastSharesField {

    constructor(raw: string) {
        super(Tag.LastShares, raw);
    }

    public validate(): boolean {

        // NOTE: Field may be blank depending on ExecTransType.
        // TODO: Maybe beef up this validation (maybe it doesn't belong in this class though)
        if (!this._data) return true;

        try { return super.validate(); }
        catch (error) { throw error; }
    }

}
