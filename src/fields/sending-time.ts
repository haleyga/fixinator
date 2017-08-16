import { Tag } from '../tag';
import { ITimeField, TimeField } from './base/custom/time-field';

export interface ISendingTimeField extends ITimeField {}

/**
 * Field ID (TAG): 52
 * Field Name: SendingTime
 * Format: char
 * Description: Time of message origination in HH:MM:SS format
 *
 *              Valid values:
 *                  HH: 00 - 23
 *                  MM: 00 - 59
 *                  SS: 00 - 59
 */
export class SendingTimeField extends TimeField implements ISendingTimeField {

    constructor(raw: string) {
        super(Tag.SendingTime, raw);
    }

}
