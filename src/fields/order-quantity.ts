import { BoundedIntField, IBoundedIntField } from './base/custom/bounded-int';
import { Tag } from './base/tag';

export interface IOrderQuantityField extends IBoundedIntField {}

export const MIN_QUANTITY: number = 0;
export const MAX_QUANTITY: number = 1000000000;

/**
 * Field ID (TAG): 38
 * Field Name: OrderQty
 * Format: int
 * Description: Number of shares ordered
 *
 *              Valid values:
 *                  (0 - 1000000000)
 */
export class OrderQuantityField extends BoundedIntField implements IOrderQuantityField {

    constructor(raw: string) {
        super(Tag.OrderQty, raw, MIN_QUANTITY, MAX_QUANTITY);
    }

}
