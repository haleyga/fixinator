import { FixIntField, IFixIntField } from '../base/fix/fix-int-field/fix-int-field';
import { Tag } from '../base/tag';

export interface ISecureDataLengthField extends IFixIntField {}

/**
 * Field ID (TAG): 90
 * Field Name: SecureDataLen
 * Format: int
 * Description: Length of encrypted message
 */
export class SecureDataLengthField extends FixIntField implements ISecureDataLengthField {

    constructor(raw: string) {
        super(Tag.SecureDataLen, raw);
    }

}
