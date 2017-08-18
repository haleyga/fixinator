import { ITimeField, TimeField } from './base/custom/time-field';
import { Tag } from './base/tag';

export interface IOriginalTimeField extends ITimeField {}

/**
 * Field ID (TAG): 42
 * Field Name: OrigTime
 * Format: char
 * Description: Time of message origination in HH:MM:SS format
 *
 *              Valid values:
 *                  HH: 00 - 23
 *                  MM: 00 - 59
 *                  SS: 00 - 59
 */
export class OriginalTimeField extends TimeField implements IOriginalTimeField {

    constructor(raw: string) {
        super(Tag.OrigTime, raw);
    }

}
