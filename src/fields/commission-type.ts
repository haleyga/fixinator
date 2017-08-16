import { Tag } from '../tag';
import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';

export interface ICommissionTypeField extends IStringEnumField {}

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
export class CommissionTypeField extends StringEnumField implements ICommissionTypeField {

    constructor(raw: string) {
        super(Tag.CommType, raw, {
            1: ['1', 'per_share'],
            2: ['2', 'percentage'],
            3: ['3', 'absolute'],
        });
    }

}
