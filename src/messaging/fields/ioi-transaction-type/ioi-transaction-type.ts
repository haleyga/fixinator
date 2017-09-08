import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IIoiTransactionTypeField extends IConstrainedCharField {}
export const IOI_TRANSACTION_TYPE_VALUES: string[] = ['N', 'C', 'R'];

/**
 * Field ID (TAG): 28
 * Field Name: IOITransType
 * Format: char
 * Description: Identifies advertisement message transaction type
 *                  Valid values:
 *                      N = New
 *                      C = Cancel
 *                      R = Replace
 */
export class IoiTransactionTypeField extends ConstrainedCharField implements IIoiTransactionTypeField {

    constructor(raw: string) {
        super(Tag.IOITransType, raw, IOI_TRANSACTION_TYPE_VALUES);
    }

}
