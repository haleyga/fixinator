import { INumberEnumField, NumberEnumField } from '../base/custom/number-enum-field';
import { Tag } from '../base/tag';

export interface IExecutionDestinationField extends INumberEnumField {}

/**
 * Field ID (TAG): 100
 * Field Name: ExDestination
 * Format: int
 * Description: Execution destination as defined by institution when order is entered.
 *
 *              Valid values:
 *                  0 = None
 *                  1 = NYSE/AMEX
 *                  2 = Midwest
 *                  3 = Boston
 *                  4 = Posit
 *                  5 = Instinet
 *                  6 = Cincinnati
 *                  7 = PCSE
 *                  8 = PBW
 *                  9 = OTC
 */
export class ExecutionDestinationField extends NumberEnumField implements IExecutionDestinationField {

    //tslint:disable:no-magic-numbers
    constructor(raw: string) {
        super(Tag.ExDestination, raw, {
            0: [0, 'none'],
            1: [1, 'nyse/amex'],
            2: [2, 'midwest'],
            3: [3, 'boston'],
            4: [4, 'posit'],
            5: [5, 'instinet'],
            6: [6, 'cincinnati'],
            7: [7, 'pcse'],
            8: [8, 'pbw'],
            9: [9, 'otc'],
        });
    }

}
