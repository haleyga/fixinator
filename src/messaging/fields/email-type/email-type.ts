import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IEmailTypeField extends IConstrainedCharField {}
export const EMAIL_TYPE_VALUES: string[] = ['1', '2', '3'];

/**
 * Field ID (TAG): 94
 * Field Name: EmailType
 * Format: char
 * Description: Email message type.
 *
 *              Valid values:
 *                  0 = New
 *                  1 = Reply
 *                  2 = Admin Reply
 */
export class EmailTypeField extends ConstrainedCharField implements IEmailTypeField {

    constructor(raw: string) {
        super(Tag.EmailType, raw, EMAIL_TYPE_VALUES);
    }

}
