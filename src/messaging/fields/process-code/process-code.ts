import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IProcessCodeField extends IConstrainedCharField {}
export const PROCESS_CODE_VALUES: string[] = ['0', '1', '2', '3', '4', '5'];

/**
 * Field ID (TAG): 81
 * Field Name: ProcessCode
 * Format: char
 * Description: Processing code for sub-account. Absence of this field in AllocAccount / AllocShares / ProcessCode
 *              instance indicates regular trade.
 *
 *              Valid values:
 *                  0 = regular
 *                  1 = soft dollar
 *                  2 = step-in
 *                  3 = step-out
 *                  4 = soft-dollar step-in
 *                  5 = soft-dollar step-out
 */
export class ProcessCodeField extends ConstrainedCharField implements IProcessCodeField {

    constructor(raw: string) {
        super(Tag.ProcessCode, raw, PROCESS_CODE_VALUES);
    }

    // TODO: validate use with other fields like AllocAccount, AllocShares
//    public validate(): boolean {}
}
