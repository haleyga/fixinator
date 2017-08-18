import { INumberEnumField, NumberEnumField } from './base/custom/number-enum-field';
import { Tag } from './base/tag';

export interface ICancelRejectionReasonField extends INumberEnumField {}

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
export class CancelRejectionReasonField extends NumberEnumField implements ICancelRejectionReasonField {

    //tslint:disable:no-magic-numbers
    constructor(raw: string) {
        super(Tag.CxlRejReason, raw, {
            0: [0, 'too_late_to_cancel'],
            1: [1, 'unknown_order'],
        });
    }

}
