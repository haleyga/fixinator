import { FixCharField, IFixCharField } from '../base/fix/fix-char-field/fix-char-field';
import { Tag } from '../base/tag';

export interface IAllocationAccountField extends IFixCharField {}

/**
 * Field ID (TAG): 79
 * Field Name: AllocAccount
 * Format: char
 * Description: Sub-account mneumonic
 */
export class AllocationAccountField extends FixCharField implements IAllocationAccountField {

    constructor(raw: string) {
        super(Tag.AllocAccount, raw);
    }

}
