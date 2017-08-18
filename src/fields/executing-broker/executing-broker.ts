import { FixCharField, IFixCharField } from '../base/fix/fix-char-field';
import { Tag } from '../base/tag';

export interface IExecutingBrokerField extends IFixCharField {}

/**
 * Field ID (TAG): 76
 * Field Name: ExecBroker
 * Format: char
 * Description: Identifies executing / give-up broker. Standard NASD market-maker mneumonic is preferred.
 */
export class ExecutingBrokerField extends FixCharField implements IExecutingBrokerField {

    constructor(raw: string) {
        super(Tag.ExecBroker, raw);
    }

}
