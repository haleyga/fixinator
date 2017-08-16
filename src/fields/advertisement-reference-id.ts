import { Tag } from '../tag';
import { FixIntField, IFixIntField } from './base/fix/fix-int-field';

export interface IAdvertisementReferenceIdField extends IFixIntField {}

/**
 * Field ID (TAG): 3
 * Field Name: AdvRefID
 * Format: int
 * Description: Reference identifier used with CANCEL and REPLACE transaction types.
 */
export class AdvertisementReferenceIdField extends FixIntField implements IAdvertisementReferenceIdField {

    constructor(raw: string) {
        super(Tag.AdvRefID, raw);
    }

}
