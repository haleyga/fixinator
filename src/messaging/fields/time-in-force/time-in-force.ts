import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';
import { ConstrainedKeyValueMap } from '../../../util/util';

export interface ITimeInForceField extends IConstrainedCharField {}

export const TIME_IN_FORCE_VALUES: string[] = ['0', '1', '2', '3', '4', '5'];

export type TimeInForce = 'day' | 'gtc' | 'opg' | 'oc' | 'fok' | 'gtx';
export const TIME_IN_FORCE: ConstrainedKeyValueMap<TimeInForce> = {
    day: '0',
    fok: '4',
    gtc: '1',
    gtx: '5',
    oc : '3',
    opg: '2',
};

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
        super(Tag.TimeInForce, raw, TIME_IN_FORCE_VALUES);
    }

}
