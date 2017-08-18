import { FixIntField, IFixIntField } from '../base/fix/fix-int-field';
import { Tag } from '../base/tag';

export interface IAveragePricePrecisionField extends IFixIntField {}

/**
 * Field ID (TAG): 74
 * Field Name: AvgPrxPrecision
 * Format: int
 * Description: Indicates number of decimal places to be used for average pricing. Absense of this field indicates
 *              that default precision arranged by the broker/institution is to be used.
 */
export class AveragePricePrecisionField extends FixIntField implements IAveragePricePrecisionField {

    constructor(raw: string) {
        super(Tag.AvgPrxPrecision, raw);
    }

}
