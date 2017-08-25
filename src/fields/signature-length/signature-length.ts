import { FixIntField, IFixIntField } from '../base/fix/fix-int-field/fix-int-field';
import { Tag } from '../base/tag';

export interface ISignatureLengthField extends IFixIntField {}

/**
 * Field ID (TAG): 93
 * Field Name: SignatureLength
 * Format: int
 * Description: Number of bytes in signature field.
 */
export class SignatureLengthField extends FixIntField implements ISignatureLengthField {

    constructor(raw: string) {
        super(Tag.SignatureLength, raw);
    }

}
