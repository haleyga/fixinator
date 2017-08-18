import { BoundedIntField, IBoundedIntField } from './base/custom/bounded-int';
import { Tag } from './base/tag';

export interface ICumulativeQuantityField extends IBoundedIntField {}

export const MIN_QUANTITY: number = 0;
export const MAX_QUANTITY: number = 1000000000;

/**
 * Field ID (TAG): 14
 * Field Name: CumQty
 * Format: int
 * Description: Total number of shares filled. Field may be blank for NEW, CANCEL and REPLACE ExecTransTypes.
 *
 *              Valid values:
 *                  (0 - 1000000000)
 */
export class CumulativeQuantityField extends BoundedIntField implements ICumulativeQuantityField {

    constructor(raw: string) {
        super(Tag.CumQty, raw, MIN_QUANTITY, MAX_QUANTITY);
    }

    public validate(): boolean {

        // NOTE: Field may be blank depending on ExecTransType.
        // TODO: Maybe beef up this validation (maybe it doesn't belong in this class though)
        if (!this._data) return true;

        try { return super.validate(); }
        catch (error) { throw error; }
    }
}
