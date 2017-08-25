import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IPossibleDuplicateFlagField extends IConstrainedCharField {}
export const POSSIBLE_DUPLICATE_FLAG_VALUES: string[] = ['Y', 'N'];

/**
 * Field ID (TAG): 43
 * Field Name: PossDupFlag
 * Format: char
 * Description: Indicates possible retransmission of message with this sequence number
 *
 *              Valid values:
 *                  Y = Possible duplicate
 *                  N = Original transmission
 */
export class PossibleDuplicateFlagField extends ConstrainedCharField implements IPossibleDuplicateFlagField {

    constructor(raw: string) {
        super(Tag.PossDupFlag, raw, POSSIBLE_DUPLICATE_FLAG_VALUES);
    }

}
