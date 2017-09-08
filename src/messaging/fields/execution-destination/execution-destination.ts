import { ConstrainedIntField, IConstrainedIntField } from '../base/custom/constrained-field/constrained-int-field';
import { Tag } from '../base/tag';

export interface IExecutionDestinationField extends IConstrainedIntField {}

//tslint:disable:no-magic-numbers
export const EXECUTION_DESTINATION_VALUES: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//tslint:enable:no-magic-numbers

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
export class ExecutionDestinationField extends ConstrainedIntField implements IExecutionDestinationField {

    constructor(raw: string) {
        super(Tag.ExDestination, raw, EXECUTION_DESTINATION_VALUES);
    }

}
