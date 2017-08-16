import { Tag } from '../tag';
import { FixDataField, IFixDataField } from './base/fix/fix-data-field';

export interface ISecureDataField extends IFixDataField {}

/**
 * Field ID (TAG): 91
 * Field Name: SecureData
 * Format: data
 * Description: Actual encrypted data stream
 */
export class SecureDataField extends FixDataField implements ISecureDataField {

    constructor(raw: string) {
        super(Tag.SecureData, raw);
    }

}
