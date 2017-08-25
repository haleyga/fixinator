import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface ITimeInForceField extends IConstrainedCharField {}
export const TIME_IN_FORCE: string[] = ['0', '1', '2', '3', '4', '5'];

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
export class TimeInForceField extends ConstrainedCharField implements ITimeInForceField {

    constructor(raw: string) {
        super(Tag.TimeInForce, raw, TIME_IN_FORCE);
    }

}
