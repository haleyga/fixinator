import { FixIntField, IFixIntField } from '../base/fix/fix-int-field/fix-int-field';
import { Tag } from '../base/tag';

export interface IIoiReferenceIdField extends IFixIntField {}

/**
 * Field ID (TAG): 26
 * Field Name: IOIRefID
 * Format: int
 * Description: Reference identifier used with CANCEL, REPLACE, PURGE and REMOVE transaction types.
 */
export class IoiReferenceIdField extends FixIntField implements IIoiReferenceIdField {

    constructor(raw: string) {
        super(Tag.IOIRefID, raw);
    }

}
