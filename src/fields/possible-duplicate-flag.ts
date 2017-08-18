import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';
import { Tag } from './base/tag';

export interface IPossibleDuplicateFlagField extends IStringEnumField {}

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
export class PossibleDuplicateFlagField extends StringEnumField implements IPossibleDuplicateFlagField {

    constructor(raw: string) {
        super(Tag.PossDupFlag, raw, {
            N: ['N', 'original_transmission'],
            Y: ['Y', 'possible_duplicate'],
        });
    }

}
