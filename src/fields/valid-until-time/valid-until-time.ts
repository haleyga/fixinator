import { ITimeField, TimeField } from '../base/custom/time-field/time-field';
import { Tag } from '../base/tag';

export interface IValidUntilTimeField extends ITimeField {}

/**
 * Field ID (TAG): 62
 * Field Name: ValidUntilTime
 * Format: char
 * Description: Indicates expiration time of indication message in HH:MM:SS format
 *
 *              Valid values:
 *                  HH: 00 - 23
 *                  MM: 00 - 59
 *                  SS: 00 - 59
 */
export class ValidUntilTimeField extends TimeField implements IValidUntilTimeField {

    constructor(raw: string) {
        super(Tag.ValidUntilTime, raw);
    }

}
