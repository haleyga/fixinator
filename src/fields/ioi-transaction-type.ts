import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';
import { Tag } from './base/tag';

export interface IIoiTransactionTypeField extends IStringEnumField {}

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
export class IoiTransactionTypeField extends StringEnumField implements IIoiTransactionTypeField {

    constructor(raw: string) {
        super(Tag.IOITransType, raw, {
            C: ['C', 'cancel'],
            N: ['N', 'new'],
            R: ['R', 'replace'],
        });
    }

}
