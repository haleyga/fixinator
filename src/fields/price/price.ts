import { BoundedFloatField, IBoundedFloatField } from '../base/custom/bounded-float';
import { Tag } from '../base/tag';

export interface IPriceField extends IBoundedFloatField {}

export const MIN_PRICE: number = 0;
export const MAX_PRICE: number = 9999.9999;

/**
 * Field ID (TAG): 44
 * Field Name: Price
 * Format: float
 * Description: Price per share
 *
 *              Valid values:
 *                  0 - 9999.9999
 */
export class PriceField extends BoundedFloatField implements IPriceField {

    constructor(raw: string) {
        super(Tag.StopPx, raw, MIN_PRICE, MAX_PRICE);
    }

}
