import { ConstrainedIntField, IConstrainedIntField } from '../base/custom/constrained-field/constrained-int-field';
import { Tag } from '../base/tag';

export interface IOrderRejectionReasonField extends IConstrainedIntField {}

//tslint:disable:no-magic-numbers
export const ORDER_REJECTION_REASON_VALUES: number[] = [0, 1, 2, 3];
//tslint:enable:no-magic-numbers

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
export class OrderRejectionReasonField extends ConstrainedIntField implements IOrderRejectionReasonField {

    //tslint:disable:no-magic-numbers
    constructor(raw: string) {
        super(Tag.OrdRejReason, raw, ORDER_REJECTION_REASON_VALUES);
    }

}
