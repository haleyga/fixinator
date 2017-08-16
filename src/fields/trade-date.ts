import { Tag } from '../tag';
import { DateField, IDateField } from './base/custom/date-field';

export interface ITradeDateField extends IDateField {}

/**
 * Field ID (TAG): 75
 * Field Name: TradeDate
 * Format: char
 * Description: Date of message transmission in YYMMDD format
 *
 *              Valid values:
 *                  YY = 00-99
 *                  MM = 01-12
 *                  DD = 01-31
 */
export class TradeDateField extends DateField implements ITradeDateField {

    constructor(raw: string) {
        super(Tag.TradeDate, raw);
    }

}
