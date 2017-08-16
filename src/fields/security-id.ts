import { Tag } from '../tag';
import { FixCharField, IFixCharField } from './base/fix/fix-char-field';

export interface ISecurityIdField extends IFixCharField {}

/**
 * Field ID (TAG): 48
 * Field Name: SecurityID
 * Format: char
 * Description: CUSIP or other alternate security identifier
 */
export class SecurityIdField extends FixCharField implements ISecurityIdField {

    constructor(raw: string) {
        super(Tag.SecurityID, raw);
    }

}
