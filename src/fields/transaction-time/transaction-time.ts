import { ITimeField, TimeField } from '../base/custom/time-field';
import { Tag } from '../base/tag';

export interface ITransactionTimeField extends ITimeField {}

/**
 * Field ID (TAG): 60
 * Field Name: TransactTime
 * Format: char
 * Description: Time of execution/order creation in HH:MM:SS format
 *
 *              Valid values:
 *                  HH: 00 - 23
 *                  MM: 00 - 59
 *                  SS: 00 - 59
 */
export class TransactionTimeField extends TimeField implements ITransactionTimeField {

    constructor(raw: string) {
        super(Tag.TransactTime, raw);
    }

}
