import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface ILastMarketField extends IConstrainedCharField {}
export const LAST_MARKET_VALUES: string[] = ['A', 'B', 'D', 'M', 'N', 'O', 'P', 'W'];

/**
 * Field ID (TAG): 30
 * Field Name: LastMkt
 * Format: char
 * Description: Market of execution for last fill
 *
 *              Valid values:
 *                  A = AMEX
 *                  B = Boston
 *                  D = Cincinnati
 *                  M = Midwest
 *                  N = NYSE
 *                  O = OTC
 *                  P = PCSE
 *                  W = PBW
 */
export class LastMarketField extends ConstrainedCharField implements ILastMarketField {

    constructor(raw: string) {
        super(Tag.LastMkt, raw, LAST_MARKET_VALUES);
    }

}
