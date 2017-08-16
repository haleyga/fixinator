import { Tag } from '../tag';
import { FixIntField, IFixIntField } from './base/fix/fix-int-field';

export interface IIoiIdField extends IFixIntField {}

/**
 * Field ID (TAG): 26
 * Field Name: IOIRefID
 * Format: int
 * Description: Reference identifier used with CANCEL, REPLACE, PURGE and REMOVE transaction types.
 */
export class IoiIdField extends FixIntField implements IIoiIdField {

    constructor(raw: string) {
        super(Tag.IOIRefID, raw);
    }

}
