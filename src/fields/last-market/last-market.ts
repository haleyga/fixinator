import { IStringEnumField, StringEnumField } from '../base/custom/string-enum-field';
import { Tag } from '../base/tag';

export interface ILastMarketField extends IStringEnumField {}

/**
 * Field ID (TAG): 30
 * Field Name: LastMkt
 * Format: char
 * Description: Market of execution for last fill
 *
 *              Valid values:
 *                  A = AMEX
 *                  B = Boston
 *                  D = Cincinnati
 *                  M = Midwest
 *                  N = NYSE
 *                  O = OTC
 *                  P = PCSE
 *                  W = PBW
 */
export class LastMarketField extends StringEnumField implements ILastMarketField {

    constructor(raw: string) {
        super(Tag.LastMkt, raw, {
            A: ['A', 'amex'],
            B: ['B', 'boston'],
            D: ['D', 'cincinnati'],
            M: ['M', 'midwest'],
            N: ['N', 'nyse'],
            O: ['O', 'otc'],
            P: ['P', 'pcse'],
            W: ['W', 'pbw'],
        });
    }

}
