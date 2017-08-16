import { Tag } from '../tag';
import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';

export interface IHandlingInstructionsField extends IStringEnumField {}

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
export class HandlingInstructionsField extends StringEnumField implements IHandlingInstructionsField {

    constructor(raw: string) {
        super(Tag.HandlInst, raw, {
            1: ['1', 'dot_private'],
            2: ['2', 'dot_public'],
            3: ['3', 'manual'],
        });
    }

}
