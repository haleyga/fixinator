import { FixIntField, IFixIntField } from '../base/fix/fix-int-field';
import { Tag } from '../base/tag';

export interface IAllocationIdField extends IFixIntField {}

/**
 * Field ID (TAG): 70
 * Field Name: AllocID
 * Format: int
 * Description: Unique identifier for allocation record.
 */
export class AllocationIdField extends FixIntField implements IAllocationIdField {

    constructor(raw: string) {
        super(Tag.AllocID, raw);
    }

}
