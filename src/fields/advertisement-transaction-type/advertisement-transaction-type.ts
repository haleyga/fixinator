import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IAdvertisementTransactionTypeField extends IConstrainedCharField {}
export const ADVERTISEMENT_TRANSACTION_TYPE_VALUES: string[] = ['N', 'C', 'R'];

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
export class AdvertisementTransactionTypeField extends ConstrainedCharField
    implements IAdvertisementTransactionTypeField {

    constructor(raw: string) {
        super(Tag.AdvTransType, raw, ADVERTISEMENT_TRANSACTION_TYPE_VALUES);
    }

}
