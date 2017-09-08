import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IOrderStatusField extends IConstrainedCharField {}
export const ORDER_STATUS_VALUES: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

/**
 * Field ID (TAG): 39
 * Field Name: OrdStatus
 * Format: char
 * Description: Identifies current status of order.
 *
 *              Valid values:
 *                  0 = New
 *                  1 = Partially filled
 *                  2 = Filled
 *                  3 = Done for day
 *                  4 = Canceled
 *                  5 = Replaced
 *                  6 = Pending Cancel/Replace
 *                  7 = Stopped
 *                  8 = Rejected
 */
export class OrderStatusField extends ConstrainedCharField implements IOrderStatusField {

    constructor(raw: string) {
        super(Tag.OrdStatus, raw, ORDER_STATUS_VALUES);
    }

}
