import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';
import { ConstrainedKeyValueMap } from '../../../util/util';

export interface IExecutionInstructionsField extends IConstrainedCharField {}

export const EXECUTION_INSTRUCTIONS_VALUES: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9',
                                                        'A', 'B', 'C', 'D', 'E', 'F', 'G'];
export type ExecutionInstructions =
    'not_held'
    | 'work'
    | 'go_along'
    | 'over_the_day'
    | 'held'
    | 'participate_dont_initiate'
    | 'strict_scale'
    | 'try_to_scale'
    | 'stay_on_bid_side'
    | 'stay_on_offer_side'
    | 'no_cross'
    | 'ok_to_cross'
    | 'call_first'
    | 'percent_of_volume'
    | 'do_not_increase'
    | 'do_not_reduce'
    | 'all_or_none';

export const EXECUTION_INSTRUCTIONS: ConstrainedKeyValueMap<ExecutionInstructions> = {
    all_or_none              : 'G',
    call_first               : 'C',
    do_not_increase          : 'E',
    do_not_reduce            : 'F',
    go_along                 : '3',
    held                     : '5',
    no_cross                 : 'A',
    not_held                 : '1',
    ok_to_cross              : 'B',
    over_the_day             : '4',
    participate_dont_initiate: '6',
    percent_of_volume        : 'D',
    stay_on_bid_side         : '9',
    stay_on_offer_side       : '0',
    strict_scale             : '7',
    try_to_scale             : '8',
    work                     : '2',
};

export function isApplicableToManualOrder(instruction: string): boolean {
    return instruction === EXECUTION_INSTRUCTIONS.not_held
           || instruction === EXECUTION_INSTRUCTIONS.work
           || instruction === EXECUTION_INSTRUCTIONS.over_the_day
           || instruction === EXECUTION_INSTRUCTIONS.held
           || instruction === EXECUTION_INSTRUCTIONS.participate_dont_initiate
           || instruction === EXECUTION_INSTRUCTIONS.strict_scale
           || instruction === EXECUTION_INSTRUCTIONS.try_to_scale
           || instruction === EXECUTION_INSTRUCTIONS.stay_on_bid_side
           || instruction === EXECUTION_INSTRUCTIONS.stay_on_offer_side
           || instruction === EXECUTION_INSTRUCTIONS.no_cross
           || instruction === EXECUTION_INSTRUCTIONS.ok_to_cross
           || instruction === EXECUTION_INSTRUCTIONS.call_first
           || instruction === EXECUTION_INSTRUCTIONS.percent_of_volume;
}

export function isApplicableToDotOrder(instruction: string): boolean {
    return instruction === EXECUTION_INSTRUCTIONS.do_not_increase
           || instruction === EXECUTION_INSTRUCTIONS.do_not_reduce
           || instruction === EXECUTION_INSTRUCTIONS.all_or_none;
}

/**
 * Field ID (TAG): 18
 * Field Name: ExecInst
 * Format: char
 * Description: Instructions for order handling on exchange trading floor. If more than one instruction is
 *              applicable to an order, this field can be defined multiple times in a single message. Some of
 *              following values are only valid for manually handled orders (M), some are only valid for DOT orders
 *              (D), some are applicable to both (MD).
 *                  Valid values:
 *                      1 = Not held (M)
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
