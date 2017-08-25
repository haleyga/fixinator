import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IHandlingInstructionsField extends IConstrainedCharField {}
export const HANDLING_INSTRUCTIONS_VALUES: string[] = ['1', '2', '3'];

/**
 * Field ID (TAG): 21
 * Field Name: HandlInst
 * Format: char
 * Description: Instructions for order handling on Broker trading floor
 *              Valid values:
 *                  1 = DOT order, private, no Broker intervention
 *                  2 = DOT order, public, Broker intervention OK
 *                  3 = Manual order, best execution
 */
export class HandlingInstructionsField extends ConstrainedCharField implements IHandlingInstructionsField {

    constructor(raw: string) {
        super(Tag.HandlInst, raw, HANDLING_INSTRUCTIONS_VALUES);
    }

}
