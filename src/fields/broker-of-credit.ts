import { FixCharField, IFixCharField } from './base/fix/fix-char-field';
import { Tag } from './base/tag';

export interface IBrokerOfCreditField extends IFixCharField {}

/**
 * Field ID (TAG): 92
 * Field Name: BrokerOfCredit
 * Format: char
 * Description: Broker to receive trade credit
 */
export class BrokerOfCreditField extends FixCharField implements IBrokerOfCreditField {

    constructor(raw: string) {
        super(Tag.BrokerOfCredit, raw);
    }

}
