import { BoundedFloatField, IBoundedFloatField } from '../base/custom/bounded-field/bounded-float-field';
import { Tag } from '../base/tag';

export interface ICommissionField extends IBoundedFloatField {}

export const MIN_COMMISSION_PRICE: number = -9.999;
export const MAX_COMMISSION_PRICE: number = 9999.999;

/**
 * Field ID (TAG): 12
 * Field Name: Commission
 * Format: float
 * Description: Commission
 *                  Valid values:
 *                      -9.999 - 9999.999
 */
export class CommissionField extends BoundedFloatField implements ICommissionField {

    constructor(raw: string) {
        super(Tag.Commission, raw, MIN_COMMISSION_PRICE, MAX_COMMISSION_PRICE);
    }

}
