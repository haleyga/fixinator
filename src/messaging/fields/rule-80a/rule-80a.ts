import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IRule80AField extends IConstrainedCharField {}
export const RULE_80A_VALUES: string[] = ['A', 'I', 'D', 'C', 'J', 'K', 'U', 'Y', 'M', 'N', 'W'];

/**
 * Field ID (TAG): 47
 * Field Name: Rule80A
 * Format: char
 * Description: Indicates order type upon which exchange Rule 80A is applied.
 *
 *              Valid values:
 *                  A = Agency single order
 *                  I = IndividualInvestor,singleorder
 *                  D = Program Order, index arb, for Member firm/org
 *                  C = Program Order, non-index arb, for Member firm/org
 *                  J = Program Order, index arb, for individual customer
 *                  K = Program Order, non-index arb, for individual customer
 *                  U = Program Order, index arb, for other agency
 *                  Y = Program Order, non-index arb, for other agency
 *                  M = Program Order, index arb, for other member
 *                  N = Program Order, non-index arb, for other member
 *                  W = All other orders as agent for other member
 */
export class Rule80AField extends ConstrainedCharField implements IRule80AField {

    constructor(raw: string) {
        super(Tag.Rule80A, raw, RULE_80A_VALUES);
    }

}
