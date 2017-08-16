import { Tag } from '../tag';
import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';

export interface IAdvertisementTransactionTypeField extends IStringEnumField {}

/**
 * Field ID (TAG): 5
 * Field Name: AdvTransType
 * Format: char
 * Description: Identifies advertisement message transaction formatted
 *
 *              Valid values:
 *                  N = New
 *                  C = Cancel
 *                  R = Replace
 */
export class AdvertisementTransactionTypeField extends StringEnumField implements IAdvertisementTransactionTypeField {

    constructor(raw: string) {
        super(Tag.AdvTransType, raw, {
            C: ['C', 'cancel'],
            N: ['N', 'new'],
            R: ['R', 'replace'],
        });
    }

}
