import { FixIntField, IFixIntField } from '../base/fix/fix-int-field';
import { Tag } from '../base/tag';

export interface INumberOfDeliveryInstructionsField extends IFixIntField {}

/**
 * Field ID (TAG): 84
 * Field Name: NoDlvyInst
 * Format: int
 * Description: Number of delivery instruction fields to follow
 */
export class NumberOfDeliveryInstructionsField extends FixIntField implements INumberOfDeliveryInstructionsField {

    constructor(raw: string) {
        super(Tag.NoDlvyInst, raw);
    }

}
