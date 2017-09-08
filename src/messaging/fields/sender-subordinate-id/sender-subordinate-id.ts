import { FixCharField, IFixCharField } from '../base/fix/fix-char-field/fix-char-field';
import { Tag } from '../base/tag';

export interface ISenderSubordinateIdField extends IFixCharField {}

/**
 * Field ID (TAG): 50
 * Field Name: SenderSubID
 * Format: char
 * Description: Assigned value. (Always unencrypted)
 */
export class SenderSubordinateIdField extends FixCharField implements ISenderSubordinateIdField {

    constructor(raw: string) {
        super(Tag.SenderSubID, raw);
    }

}
