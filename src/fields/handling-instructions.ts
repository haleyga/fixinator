import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';
import { Tag } from './base/tag';

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
            1: ['1', 'dot_order_private_no_broker_intervention'],
            2: ['2', 'dot_order_public_broker_intervention_ok'],
            3: ['3', 'manual_order_best_execution'],
        });
    }

}
