import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';
import { Tag } from './base/tag';

export interface IOrderStatusField extends IStringEnumField {}

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
export class OrderStatusField extends StringEnumField implements IOrderStatusField {

    constructor(raw: string) {
        super(Tag.OrdStatus, raw, {
            0: ['0', 'new'],
            1: ['1', 'partially_filled'],
            2: ['2', 'filled'],
            3: ['3', 'done_for_day'],
            4: ['4', 'canceled'],
            5: ['5', 'replaced'],
            6: ['6', 'pending_cancel_replace'],
            7: ['7', 'stopped'],
            8: ['8', 'rejected'],
        });
    }

}
