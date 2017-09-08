import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface ICommissionTypeField extends IConstrainedCharField {}
export const COMMISSION_TYPE_VALUES: string[] = ['1', '2', '3'];

/**
 * Field ID (TAG): 13
 * Field Name: CommType
 * Format: char
 * Description: Commission type
 *                  Valid values:
 *                      1 = per share
 *                      2 = percentage
 *                      3 = absolute
 */
export class CommissionTypeField extends ConstrainedCharField implements ICommissionTypeField {

    constructor(raw: string) {
        super(Tag.CommType, raw, COMMISSION_TYPE_VALUES);
    }

}
