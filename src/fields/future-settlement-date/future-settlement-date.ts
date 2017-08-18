import { DateField, IDateField } from '../base/custom/date-field';
import { Tag } from '../base/tag';

export interface IFutureSettlementDateField extends IDateField {}

/**
 * Field ID (TAG): 64
 * Field Name: FutSettDate
 * Format: char
 * Description: Specific date of trade settlement in YYMMDD format. Required when SettlmntTyp = 6 (Future) or
 *              SettlmntTyp = 8 (Sellers Option).
 *
 *              Valid values:
 *                  YY = 00-99
 *                  MM = 01-12
 *                  DD = 01-31
 */
export class FutureSettlementDateField extends DateField implements IFutureSettlementDateField {

    constructor(raw: string) {
        super(Tag.FutSettDate, raw);
    }

}
