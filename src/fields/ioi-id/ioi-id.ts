import { FixIntField, IFixIntField } from '../base/fix/fix-int-field';
import { Tag } from '../base/tag';

export interface IIoiIdField extends IFixIntField {}

/**
 * Field ID (TAG): 23
 * Field Name: IOIid
 * Format: int
 * Description: Unique identifier of IOI message.
 */
export class IoiIdField extends FixIntField implements IIoiIdField {

    constructor(raw: string) {
        super(Tag.AdvId, raw);
    }

}
