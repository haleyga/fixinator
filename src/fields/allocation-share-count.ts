import { FixIntField, IFixIntField } from './base/fix/fix-int-field';
import { Tag } from './base/tag';

export interface IAllocationShareCountField extends IFixIntField {}

/**
 * Field ID (TAG): 80
 * Field Name: AllocShares
 * Format: int
 * Description: Number of shares to be allocated to specific sub-account
 */
export class AllocationShareCountField extends FixIntField implements IAllocationShareCountField {

    constructor(raw: string) {
        super(Tag.AllocShares, raw);
    }

}
