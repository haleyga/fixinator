import { Tag } from '../tag';
import { FixCharField, IFixCharField } from './base/fix/fix-char-field';

export interface IAccountField extends IFixCharField {}

/**
 * Field ID (TAG): 1
 * Field Name: Account
 * Format: char
 * Description: Account mnemonic
 */
export class AccountField extends FixCharField implements IAccountField {

    constructor(raw: string) {
        super(Tag.Account, raw);
    }

}
