import { BoundedFloatField, IBoundedFloatField } from '../base/custom/bounded-field/bounded-float-field';
import { Tag } from '../base/tag';

export interface ILastPriceField extends IBoundedFloatField {}

export const MIN_LAST_PRICE: number = 0;
export const MAX_LAST_PRICE: number = 9999.999;

/**
 * Field ID (TAG): 31
 * Field Name: LastPX
 * Format: float
 * Description: Price of last fill. Field will be blank for NEW, CANCEL and REPLACE ExecTransTypes and may be blank
 *              when order is NEW, CXLD, DONE or RPLD status
 *
 *              Valid value:
 *                  (0 - 9999.999)
 */
export class LastPriceField extends BoundedFloatField implements ILastPriceField {

    constructor(raw: string) {
        super(Tag.LastPX, raw, MIN_LAST_PRICE, MAX_LAST_PRICE);
    }

}
