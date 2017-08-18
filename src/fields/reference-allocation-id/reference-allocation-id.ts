import { FixIntField, IFixIntField } from '../base/fix/fix-int-field';
import { Tag } from '../base/tag';

export interface IReferenceAllocationIdField extends IFixIntField {}

/**
 * Field ID (TAG): 72
 * Field Name: RefAllocID
 * Format: int
 * Description: Reference identifier to be used with Replace and Cancel AllocTransType records.
 */
export class ReferenceAllocationIdField extends FixIntField implements IReferenceAllocationIdField {

    constructor(raw: string) {
        super(Tag.RefAllocID, raw);
    }

    // TODO: validate against AllocTransType
//    public validate(): boolean {}
}
