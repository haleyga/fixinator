import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IExecutionInstructionsField extends IConstrainedCharField {}
export const EXECUTION_INSTRUCTIONS_VALUES: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9',
                                                        'A', 'B', 'C', 'D', 'E', 'F', 'G'];

/**
 * Field ID (TAG): 18
 * Field Name: ExecInst
 * Format: char
 * Description: Instructions for order handling on exchange trading floor. If more than one instruction is
 *              applicable to an order, this field can be defined multiple times in a single message. Some of
 *              following values are only valid for manually handled orders (M), some are only valid for DOT orders
 *              (D), some are applicable to both (MD).
 *                  Valid values:
 *                      1 = Notheld (M)
 *                      2 = Work (M)
 *                      3 = Go along
 *                      4 = Over the day (M)
 *                      5 = Held (M)
 *                      6 = Participate dont initiate (M)
 *                      7 = Strict scale (M)
 *                      8 = Try to scale (M)
 *                      9 = Stay on bidside (M)
 *                      0 = Stay on offerside (M)
 *                      A = No cross (M)
 *                      B = OK to cross (M)
 *                      C = Call first (M)
 *                      D = Percent of volume (M)
 *                      E = Do not increase - DNI (D)
 *                      F = Do not reduce - DNR (D)
 *                      G = All or none - AON (D)
 */
export class ExecutionInstructionsField extends ConstrainedCharField implements IExecutionInstructionsField {

    constructor(raw: string) {
        super(Tag.ExecInst, raw, EXECUTION_INSTRUCTIONS_VALUES);
    }

}
