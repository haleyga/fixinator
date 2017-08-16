import { Tag } from '../tag';
import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';

export interface IAllocationTransactionTypeField extends IStringEnumField {}

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
export class AllocationTransactionTypeField extends StringEnumField implements IAllocationTransactionTypeField {

    //tslint:disable:no-magic-numbers
    constructor(raw: string) {
        super(Tag.AllocTransType, raw, {
            C: ['C', 'cancel'],
            N: ['N', 'new'],
            R: ['R', 'replace'],
        });
    }

}
