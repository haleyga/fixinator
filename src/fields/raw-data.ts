import { Tag } from '../tag';
import { FixDataField, IFixDataField } from './base/fix/fix-data-field';

export interface IRawTypeTemplateField extends IFixDataField {}

/**
 * Field ID (TAG): 96
 * Field Name: RawData
 * Format: data
 * Description: Unformatted raw data, can include bitmaps, word processor documents, etc.
 */
export class RawTypeTemplateField extends FixDataField implements IRawTypeTemplateField {

    constructor(raw: string) {
        super(Tag.RawData, raw);
    }

}
