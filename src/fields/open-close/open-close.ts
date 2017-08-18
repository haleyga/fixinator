import { FixCharField, IFixCharField } from '../base/fix/fix-char-field';
import { Tag } from '../base/tag';

export interface IOpenCloseField extends IFixCharField {}

/**
 * Field ID (TAG): 77
 * Field Name: OpenClose
 * Format: char
 * Description: For options only.
 */
export class OpenCloseField extends FixCharField implements IOpenCloseField {

    constructor(raw: string) {
        super(Tag.OpenClose, raw);
    }

}
