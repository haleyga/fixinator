import { ConstrainedIntField, IConstrainedIntField } from '../base/custom/constrained-field/constrained-int-field';
import { Tag } from '../base/tag';

export interface ICancelRejectionReasonField extends IConstrainedIntField {}

//tslint:disable:no-magic-numbers
export const CANCEL_REJECTION_REASON_VALUES: number[] = [0, 1];
//tslint:enable:no-magic-numbers


/**
 * Field ID (TAG): 102
 * Field Name: CxlRejReason
 * Format: int
 * Description: Code to identify reason for cancel rejection.
 *
 *              Valid values:
 *                  0 = Too late to cancel
 *                  1 = Unknown order
 */
export class CancelRejectionReasonField extends ConstrainedIntField implements ICancelRejectionReasonField {

    constructor(raw: string) {
        super(Tag.CxlRejReason, raw, CANCEL_REJECTION_REASON_VALUES);
    }

}
