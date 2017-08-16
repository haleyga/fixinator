import { Tag } from '../tag';
import { FixCharField, IFixCharField } from './base/fix/fix-char-field';

export interface IClientOrderIdField extends IFixCharField {}

/**
 * Field ID (TAG): 11
 * Field Name: ClOrdID
 * Format: char
 * Description: Order identifier assigned by institution application
 */
export class ClientOrderIdField extends FixCharField implements IClientOrderIdField {

    constructor(raw: string) {
        super(Tag.ClOrdID, raw);
    }

}
