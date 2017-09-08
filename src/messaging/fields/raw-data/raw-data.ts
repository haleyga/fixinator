import { FixDataField, IFixDataField } from '../base/fix/fix-data-field/fix-data-field';
import { Tag } from '../base/tag';

export interface IRawDataField extends IFixDataField {}

/**
 * Field ID (TAG): 96
 * Field Name: RawData
 * Format: data
 * Description: Unformatted raw data, can include bitmaps, word processor documents, etc.
 */
export class RawDataField extends FixDataField implements IRawDataField {

    constructor(raw: string) {
        super(Tag.RawData, raw);
    }

}
