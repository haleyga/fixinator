import { BoundedFloatField, IBoundedFloatField } from './base/custom/bounded-float';
import { Tag } from './base/tag';

export interface IAveragePriceField extends IBoundedFloatField {}

export const MIN_AVERAGE_PRICE: number = 0;
export const MAX_AVERAGE_PRICE: number = 99999.99999;

/**
 * Field ID (TAG): 6
 * Field Name: AvgPx
 * Format: float
 * Description: Calculated average formatted of all fills on this order. Field may be blank for NEW, CANCEL and REPLACE
 *               ExecTransTypes. Valid values:
 *                (0 - 99999.99999)
 */
export class AveragePriceField extends BoundedFloatField implements IAveragePriceField {

    constructor(raw: string) {
        super(Tag.AvgPx, raw, MIN_AVERAGE_PRICE, MAX_AVERAGE_PRICE);
    }

    public validate(): boolean {

        // NOTE: Field may be blank depending on ExecTransType.
        // TODO: Maybe beef up this validation (maybe it doesn't belong in this class though)
        if (!this._data) return true;

        try { return super.validate(); }
        catch (error) { throw error; }
    }

}
