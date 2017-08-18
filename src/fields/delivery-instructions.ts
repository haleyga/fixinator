import { FixCharField, IFixCharField } from './base/fix/fix-char-field';
import { Tag } from './base/tag';

export interface IDeliveryInstructionsField extends IFixCharField {}

/**
 * Field ID (TAG): 86
 * Field Name: DlvyInst
 * Format: char
 * Description: Free format text field to indicate delivery instructions
 */
export class DeliveryInstructionsField extends FixCharField implements IDeliveryInstructionsField {

    constructor(raw: string) {
        super(Tag.DlvyInst, raw);
    }

}
