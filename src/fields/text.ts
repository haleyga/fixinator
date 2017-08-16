import { Tag } from '../tag';
import { FixCharField, IFixCharField } from './base/fix/fix-char-field';

export interface ITextField extends IFixCharField {}

/**
 * Field ID (TAG): 58
 * Field Name: Text
 * Format: char
 * Description: Free format formatted string
 */
export class TextField extends FixCharField implements ITextField {

    constructor(raw: string) {
        super(Tag.Text, raw);
    }

}
