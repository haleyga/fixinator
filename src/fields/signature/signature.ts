import { FixDataField, IFixDataField } from '../base/fix/fix-data-field';
import { Tag } from '../base/tag';

export interface ISignatureField extends IFixDataField {}

/**
 * Field ID (TAG): 89
 * Field Name: Signature
 * Format: data
 * Description: Electronic signature
 */
export class SignatureField extends FixDataField implements ISignatureField {

    constructor(raw: string) {
        super(Tag.Signature, raw);
    }

}
