import { FixCharField, IFixCharField } from '../base/fix/fix-char-field/fix-char-field';
import { Tag } from '../base/tag';

export interface IChecksumField extends IFixCharField {}

/**
 * Field ID (TAG): 10
 * Field Name: CheckSum
 * Format: char
 * Description: Three byte, simple checksum (see Appendix B for description). ALWAYS LAST FIELD IN RECORD, also
 *              serves as end of record delimiter. Always defined as three characters. Checksum is calculated on
 *              encrypted data stream as transmitted between parties. (Always unencrypted)
 */
export class ChecksumField extends FixCharField implements IChecksumField {

    constructor(raw: string) {
        super(Tag.CheckSum, raw);
    }

    // TODO: add validation to ensure field is the last in a record (maybe it doesn't belong in this class though)
//    public validate(): boolean {}
}
