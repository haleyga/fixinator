import { Tag } from '../tag';
import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';

export interface IExecutionInstructionsField extends IStringEnumField {}

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
export class ExecutionInstructionsField extends StringEnumField implements IExecutionInstructionsField {

    constructor(raw: string) {
        super(Tag.ExecInst, raw, {
            1: ['1', 'not_held'],
            2: ['2', 'work'],
            3: ['3', 'go_along'],
            4: ['4', 'over_the_day'],
            5: ['5', 'held'],
            6: ['6', 'participate_do_not_initiate'],
            7: ['7', 'strict_scale'],
            8: ['8', 'try_to_scale'],
            9: ['9', 'stay_on_bid_side'],
            0: ['0', 'stay_on_offer_side'],
            A: ['A', 'no_cross'],
            B: ['B', 'ok_to_cross'],
            C: ['C', 'call_first'],
            D: ['D', 'percent_of_volume'],
            E: ['E', 'do_not_increase'],
            F: ['F', 'do_not_reduce'],
            G: ['G', 'all_or_none'],
        });
    }

}
