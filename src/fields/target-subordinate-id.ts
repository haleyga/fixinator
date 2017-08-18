import { FixCharField, IFixCharField } from './base/fix/fix-char-field';
import { Tag } from './base/tag';

export interface ITargetSubordinateIdField extends IFixCharField {}

/**
 * Field ID (TAG): 57
 * Field Name: TargetSubID
 * Format: char
 * Description: Assigned value. (Always unencrypted)
 */
export class TargetSubordinateIdField extends FixCharField implements ITargetSubordinateIdField {

    constructor(raw: string) {
        super(Tag.TargetSubID, raw);
    }

}
