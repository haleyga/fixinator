import { BoundedFloatField, IBoundedFloatField } from './base/custom/bounded-float';
import { Tag } from './base/tag';

export interface IStopPriceField extends IBoundedFloatField {}

export const MIN_STOP_PRICE: number = 0;
export const MAX_STOP_PRICE: number = 9999.9999;

/**
 * Field ID (TAG): 99
 * Field Name: StopPx
 * Format: float
 * Description: Price per share
 *
 *              Valid values:
 *                  0 - 9999.9999
 */
export class StopPriceField extends BoundedFloatField implements IStopPriceField {

    constructor(raw: string) {
        super(Tag.StopPx, raw, MIN_STOP_PRICE, MAX_STOP_PRICE);
    }

}
