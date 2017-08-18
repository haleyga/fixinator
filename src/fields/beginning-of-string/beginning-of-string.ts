import { IStringEnumField, StringEnumField } from '../base/custom/string-enum-field';
import { Tag } from '../base/tag';

export interface IBeginningOfStringField extends IStringEnumField {}

/**
 * Field ID (TAG): 8
 * Field Name: BeginString
 * Format: char
 * Description: Identifies beginning of new message and protocol version.
 *               ALWAYS FIRST FIELD IN MESSAGE. (Always unencrypted)
 *                  Valid value: FIX.2.0
 */
export class BeginningOfStringField extends StringEnumField implements IBeginningOfStringField {

    constructor(raw: string) {
        super(Tag.BeginString, raw, {
            FIX_2_7: ['FIX.2.7', 'FIX.2.7'],
        });
    }

    // TODO: add validation to ensure field is the first in a record (maybe it doesn't belong in this class though)
//    public validate(): boolean {}
}
