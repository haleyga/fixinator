import { Tag } from '../tag';
import { FixCharField, IFixCharField } from './base/fix/fix-char-field';

export interface ISenderCompanyIdField extends IFixCharField {}

/**
 * Field ID (TAG): 49
 * Field Name: SenderCompID
 * Format: char
 * Description: Assigned value. (Always unencrypted)
 */
export class SenderCompanyIdField extends FixCharField implements ISenderCompanyIdField {

    constructor(raw: string) {
        super(Tag.SenderCompID, raw);
    }

}
