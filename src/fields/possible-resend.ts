import { FixCharField, IFixCharField } from './base/fix/fix-char-field';
import { Tag } from './base/tag';

export interface IPossibleResendField extends IFixCharField {}

/**
 * Field ID (TAG): 97
 * Field Name: PossResend
 * Format: char
 * Description: Indicates that message may contain information that has been sent under another sequence number.
 */
export class PossibleResendField extends FixCharField implements IPossibleResendField {

    constructor(raw: string) {
        super(Tag.PossResend, raw);
    }

}
