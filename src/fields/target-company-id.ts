import { Tag } from '../tag';
import { FixCharField, IFixCharField } from './base/fix/fix-char-field';

export interface ITargetCompanyIdField extends IFixCharField {}

/**
 * Field ID (TAG): 56
 * Field Name: TargetCompID
 * Format: char
 * Description: Assigned value. (Always unencrypted)
 */
export class TargetCompanyIdField extends FixCharField implements ITargetCompanyIdField {

    constructor(raw: string) {
        super(Tag.TargetCompID, raw);
    }

}
