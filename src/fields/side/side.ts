import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface ISideField extends IConstrainedCharField {}
export const SIDE_VALUES: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];

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
