import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IUrgencyField extends IConstrainedCharField {}
export const URGENCY_VALUES: string[] = ['0', '1', '2'];

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
export class UrgencyField extends ConstrainedCharField implements IUrgencyField {

    constructor(raw: string) {
        super(Tag.Urgency, raw, URGENCY_VALUES);
    }

}
