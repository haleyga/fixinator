import { INumberEnumField, NumberEnumField } from '../base/custom/number-enum-field';
import { Tag } from '../base/tag';

export interface IOrderRejectionReasonField extends INumberEnumField {}

/**
 * Field ID (TAG): 103
 * Field Name: OrdRejReason
 * Format: int
 * Description: Code to identify reason for order rejection.
 *
 *              Valid values:
 *                  0 = Broker option
 *                  1 = Unknown symbol
 *                  2 = Exchange closed
 *                  3 = Order exceeds limit
 */
export class OrderRejectionReasonField extends NumberEnumField implements IOrderRejectionReasonField {

    //tslint:disable:no-magic-numbers
    constructor(raw: string) {
        super(Tag.OrdRejReason, raw, {
            0: [0, 'broker_option'],
            1: [1, 'unknown_symbol'],
            2: [2, 'exchange_closed'],
            3: [3, 'order_exceeds_limit'],
        });
    }

}
