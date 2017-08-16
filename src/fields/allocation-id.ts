import { Tag } from '../tag';
import { FixIntField, IFixIntField } from './base/fix/fix-int-field';

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