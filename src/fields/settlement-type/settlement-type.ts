import { IStringEnumField, StringEnumField } from '../base/custom/string-enum-field';
import { Tag } from '../base/tag';

export interface ISettlementTypeField extends IStringEnumField {}

/**
 * Field ID (TAG): 63
 * Field Name: SettlmntTyp
 * Format: char
 * Description: Indicates order settlement period. Absence of this field is interpreted as Regular.
 *
 *              Valid values:
 *                  0 = Regular
 *                  1 = Cash
 *                  2 = Next Day
 *                  3 = T+2
 *                  4 = T+3
 *                  5 = T+4
 *                  6 = Future
 *                  7 = When Issued
 *                  8 = Sellers Option
 */
export class SettlementTypeField extends StringEnumField implements ISettlementTypeField {

    constructor(raw: string) {
        super(Tag.SettlmntTyp, raw, {
            0: ['0', 'regular'],
            1: ['1', 'cash'],
            2: ['2', 'next_day'],
            3: ['3', 't_plus_2'],
            4: ['4', 't_plus_3'],
            5: ['5', 't_plus_4'],
            6: ['6', 'future'],
            7: ['7', 'when_issued'],
            8: ['8', 'sellers_option'],
        });
    }

}
