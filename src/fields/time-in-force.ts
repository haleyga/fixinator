import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';
import { Tag } from './base/tag';

export interface ITimeInForceField extends IStringEnumField {}

/**
 * Field ID (TAG): 59
 * Field Name: TimeInForce
 * Format: char
 * Description: Specifies how long the order remains in effect. Absence of this field is interpreted as DAY.
 *
 *              Valid values:
 *                  0 = Day
 *                  1 = Good Till Cancel (GTC)
 *                  2 = At the Opening (OPG)
 *                  3 = Immediate or Cancel (OC)
 *                  4 = Fill or Kill (FOK)
 *                  5 = Good Till Crossing (GTX)
 */
export class TimeInForceField extends StringEnumField implements ITimeInForceField {

    constructor(raw: string) {
        super(Tag.TimeInForce, raw, {
            0: ['0', 'day'],
            1: ['1', 'good_till_cancel'],
            2: ['2', 'at_the_opening'],
            3: ['3', 'immediate_or_cancel'],
            4: ['4', 'fill_or_kill'],
            5: ['5', 'good_till_crossing'],
        });
    }

}
