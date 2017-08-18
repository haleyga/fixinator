import { INumberEnumField, NumberEnumField } from '../base/custom/number-enum-field';
import { Tag } from '../base/tag';

export interface IAllocationRejectionCodeField extends INumberEnumField {}

/**
 * Field ID (TAG): 88
 * Field Name: AllocRejCode
 * Format: int
 * Description: Identifies reason for rejection.
 *
 *              Valid values:
 *                  0 = unknown account(s)
 *                  1 = incorrect quantity
 *                  2 = incorrect average price
 *                  3 = unknown executing broker mnuemonic
 *                  4 = commission difference
 *                  5 = unknown OrderID
 *                  6 = unknown ListID
 *                  7 = other
 */
export class AllocationRejectionCodeField extends NumberEnumField implements IAllocationRejectionCodeField {

    //tslint:disable:no-magic-numbers
    constructor(raw: string) {
        super(Tag.AllocRejCode, raw, {
            0: [0, 'unknown_accounts'],
            1: [1, 'incorrect_quantity'],
            2: [2, 'incorrect_average_price'],
            3: [3, 'unknown_executing_broker_mnemonic'],
            4: [4, 'commission_difference'],
            5: [5, 'unknown_order_id'],
            6: [6, 'unknown_list_id'],
            7: [7, 'other'],
        });
    }

}
