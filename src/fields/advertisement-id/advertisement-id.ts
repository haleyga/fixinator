import { FixIntField, IFixIntField } from '../base/fix/fix-int-field';
import { Tag } from '../base/tag';

export interface IAdvertisementIdField extends IFixIntField {}

/**
 * Field ID (TAG): 2
 * Field Name: AdvId
 * Format: int
 * Description: Unique identifier of advertisement message
 */
export class AdvertisementIdField extends FixIntField implements IAdvertisementIdField {

    constructor(raw: string) {
        super(Tag.AdvId, raw);
    }

}
