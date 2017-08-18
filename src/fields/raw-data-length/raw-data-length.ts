import { FixIntField, IFixIntField } from '../base/fix/fix-int-field';
import { Tag } from '../base/tag';

export interface IRawDataLengthField extends IFixIntField {}

/**
 * Field ID (TAG): 95
 * Field Name: RawDataLength
 * Format: int
 * Description: Number of bytes in raw data field.
 */
export class RawDataLengthField extends FixIntField implements IRawDataLengthField {

    constructor(raw: string) {
        super(Tag.RawDataLength, raw);
    }

}
