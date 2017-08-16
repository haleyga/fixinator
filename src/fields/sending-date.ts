import { Tag } from '../tag';
import { DateField, IDateField } from './base/custom/date-field';

export interface ISendingDateField extends IDateField {}

/**
 * Field ID (TAG): 51
 * Field Name: SendingDate
 * Format: char
 * Description: Date of message transmission in YYMMDD format
 *
 *              Valid values:
 *                  YY = 00-99
 *                  MM = 01-12
 *                  DD = 01-31
 */
export class SendingDateField extends DateField implements ISendingDateField {

    constructor(raw: string) {
        super(Tag.SendingDate, raw);
    }

}
