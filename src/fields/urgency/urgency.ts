import { IStringEnumField, StringEnumField } from '../base/custom/string-enum-field';
import { Tag } from '../base/tag';

export interface IUrgencyField extends IStringEnumField {}

/**
 * Field ID (TAG): 61
 * Field Name: Urgency
 * Format: char
 * Description: Urgency flag
 *
 *              Valid values:
 *                  0 = Normal
 *                  1 = Flash
 *                  2 = Background
 */
export class UrgencyField extends StringEnumField implements IUrgencyField {

    constructor(raw: string) {
        super(Tag.Urgency, raw, {
            0: ['0', 'normal'],
            1: ['1', 'flash'],
            2: ['2', 'background'],
        });
    }

}
