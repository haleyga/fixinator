import { ConstrainedIntField, IConstrainedIntField } from '../base/custom/constrained-field/constrained-int-field';
import { Tag } from '../base/tag';

export interface IAllocationRejectionCodeField extends IConstrainedIntField {}

//tslint:disable:no-magic-numbers
export const ALLOCATION_REJECTION_CODE_VALUES: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
//tslint:enable:no-magic-numbers

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
export class AllocationRejectionCodeField extends ConstrainedIntField implements IAllocationRejectionCodeField {

    constructor(raw: string) {
        super(Tag.AllocRejCode, raw, ALLOCATION_REJECTION_CODE_VALUES);
    }

}
