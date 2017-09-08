import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IBeginningOfStringField extends IConstrainedCharField {}
export const BEGINNING_OF_STRING_VALUES: string[] = ['FIX.2.0', 'FIX.2.7'];

/**
 * Field ID (TAG): 8
 * Field Name: BeginString
 * Format: char
 * Description: Identifies beginning of new message and protocol version.
 *               ALWAYS FIRST FIELD IN MESSAGE. (Always unencrypted)
 *                  Valid value: FIX.2.0
 */
export class BeginningOfStringField extends ConstrainedCharField implements IBeginningOfStringField {

    constructor(raw: string) {
        super(Tag.BeginString, raw, BEGINNING_OF_STRING_VALUES);
    }

    // TODO: add validation to ensure field is the first in a record (maybe it doesn't belong in this class though)
//    public validate(): boolean {}
}
