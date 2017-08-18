import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';
import { Tag } from './base/tag';

export interface IEnumTypeTemplateField extends IStringEnumField {}

/**
 * Field ID (TAG): 81
 * Field Name: ProcessCode
 * Format: char
 * Description: Processing code for sub-account. Absence of this field in AllocAccount / AllocShares / ProcessCode
 *              instance indicates regular trade.
 *
 *              Valid values:
 *                  0 = regular
 *                  1 = soft dollar
 *                  2 = step-in
 *                  3 = step-out
 *                  4 = soft-dollar step-in
 *                  5 = soft-dollar step-out
 */
export class EnumTypeTemplateField extends StringEnumField implements IEnumTypeTemplateField {

    constructor(raw: string) {
        super(Tag.ProcessCode, raw, {
            0: ['0', 'regular'],
            1: ['1', 'soft_dollar'],
            2: ['2', 'step_in'],
            3: ['3', 'step_out'],
            4: ['4', 'soft_dollar_step_in'],
            5: ['5', 'soft_dollar_step_out'],
        });
    }

    // TODO: validate use with other fields like AllocAccount, AllocShares
//    public validate(): boolean {}
}
