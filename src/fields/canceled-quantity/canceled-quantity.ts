import { FixIntField, IFixIntField } from '../base/fix/fix-int-field/fix-int-field';
import { Tag } from '../base/tag';

export interface ICanceledQuantityField extends IFixIntField {}

/**
 * Field ID (TAG): 83
 * Field Name: CxlQty
 * Format: int
 * Description: Total number of shares cancelled for this order.
 */
export class CanceledQuantityField extends FixIntField implements ICanceledQuantityField {

    constructor(raw: string) {
        super(Tag.CxlQty, raw);
    }

}
