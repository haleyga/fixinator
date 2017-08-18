import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';
import { Tag } from './base/tag';

export interface ISideField extends IStringEnumField {}

/**
 * Field ID (TAG): 54
 * Field Name: Side
 * Format: char
 * Description: Side of order
 *
 *              Valid values:
 *                  1 = Buy
 *                  2 = Sell
 *                  3 = Buy minus
 *                  4 = Sell plus
 *                  5 = Sell short
 *                  6 = Sell short exempt
 *                  7 = Traded
 *                  8 = Crossed
 */
export class SideField extends StringEnumField implements ISideField {

    constructor(raw: string) {
        super(Tag.Side, raw, {
            1: ['1', 'buy'],
            2: ['2', 'sell'],
            3: ['3', 'buy_minus'],
            4: ['4', 'sell_plus'],
            5: ['5', 'sell_short'],
            6: ['6', 'sell_short_exempt'],
            7: ['7', 'traded'],
            8: ['8', 'crossed'],
        });
    }

}
