import { Tag } from '../tag';
import { FixCharField, IFixCharField } from './base/fix/fix-char-field';

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
