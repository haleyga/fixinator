import { ConstrainedKeyToStringMap } from '../../../util/util';
import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface ISettlementTypeField extends IConstrainedCharField {}

export const SETTLEMENT_TYPE_VALUES: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

export type SettlementType =
    'regular'
    | 'cash'
    | 'next_day'
    | 't_plus_2'
    | 't_plus_3'
    | 't_plus_4'
    | 'future'
    | 'when_issued'
    | 'sellers_option';

export const SETTLEMENT_TYPE: ConstrainedKeyToStringMap<SettlementType> = {
    cash          : '1',
    future        : '6',
    next_day      : '2',
    regular       : '0',
    sellers_option: '8',
    t_plus_2      : '3',
    t_plus_3      : '4',
    t_plus_4      : '5',
    when_issued   : '7',
};

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
export class SettlementTypeField extends ConstrainedCharField implements ISettlementTypeField {

    constructor(raw: string) {
        super(Tag.SettlmntTyp, raw, SETTLEMENT_TYPE_VALUES);
    }

}
