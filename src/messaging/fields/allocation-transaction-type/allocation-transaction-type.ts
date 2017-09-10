import { ConstrainedKeyToStringMap } from '../../../util/util';
import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IAllocationTransactionTypeField extends IConstrainedCharField {}

export const ALLOCATION_TRANSACTION_TYPE_VALUES: string[] = ['N', 'C', 'R'];

export type AllocationTransactionType = 'new' | 'cancel' | 'replace';
export const ALLOCATION_TRANSACTION_TYPE: ConstrainedKeyToStringMap<AllocationTransactionType> = {
    cancel : 'C',
    new    : 'N',
    replace: 'R',
};

/**
 * Field ID (TAG): 71
 * Field Name: AllocTransType
 * Format: char
 * Description: Identifies allocation transaction type
 *
 *              Valid values:
 *                  N = New
 *                  C = Cancel
 *                  R = Replace
 */
export class AllocationTransactionTypeField extends ConstrainedCharField implements IAllocationTransactionTypeField {

    constructor(raw: string) {
        super(Tag.AllocTransType, raw, ALLOCATION_TRANSACTION_TYPE_VALUES);
    }

}
