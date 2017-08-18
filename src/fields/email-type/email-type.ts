import { IStringEnumField, StringEnumField } from '../base/custom/string-enum-field';
import { Tag } from '../base/tag';

export interface IEmailTypeField extends IStringEnumField {}

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
export class EmailTypeField extends StringEnumField implements IEmailTypeField {

    constructor(raw: string) {
        super(Tag.EmailType, raw, {
            0: ['0', 'new'],
            1: ['1', 'reply'],
            2: ['2', 'admin_reply'],
        });
    }

}
