import { FixIntField, IFixIntField } from '../base/fix/fix-int-field';
import { Tag } from '../base/tag';

export interface INumberOfAllocationsField extends IFixIntField {}

/**
 * Field ID (TAG): 78
 * Field Name: NoAllocs
 * Format: int
 * Description: Number of AllocAccount/AllocShares/ProcessCode instances included in allocation record.
 */
export class NumberOfAllocationsField extends FixIntField implements INumberOfAllocationsField {

    constructor(raw: string) {
        super(Tag.NoAllocs, raw);
    }

}
