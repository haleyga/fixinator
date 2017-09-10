import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';
import { ConstrainedKeyToStringMap } from '../../../util/util';

export interface ISideField extends IConstrainedCharField {}

export const SIDE_VALUES: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];

export type Side =
    'buy'
    | 'sell'
    | 'buy_minus'
    | 'sell_plus'
    | 'sell_short'
    | 'sell_short_exempt'
    | 'traded'
    | 'crossed';

export const SIDE: ConstrainedKeyToStringMap<Side> = {
    buy              : '1',
    buy_minus        : '3',
    crossed          : '8',
    sell             : '2',
    sell_plus        : '4',
    sell_short       : '5',
    sell_short_exempt: '6',
    traded           : '7',
};

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
export class SideField extends ConstrainedCharField implements ISideField {

    constructor(raw: string) {
        super(Tag.Side, raw, SIDE_VALUES);
    }

}
