import { FixCharField, IFixCharField } from './base/fix/fix-char-field';
import { Tag } from './base/tag';

export interface IOrderIdField extends IFixCharField {}

/**
 * Field ID (TAG): 37
 * Field Name: OrderID
 * Format: char
 * Description: Unique identifier for Order as assigned by broker
 */
export class OrderIdField extends FixCharField implements IOrderIdField {

    constructor(raw: string) {
        super(Tag.OrderID, raw);
    }

}
