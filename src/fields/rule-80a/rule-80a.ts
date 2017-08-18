import { IStringEnumField, StringEnumField } from '../base/custom/string-enum-field';
import { Tag } from '../base/tag';

export interface IRule80AField extends IStringEnumField {}

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
export class Rule80AField extends StringEnumField implements IRule80AField {

    constructor(raw: string) {
        super(Tag.Rule80A, raw, {
            A: ['A', 'agency_single'],
            C: ['C', 'program_non_index_member'],
            D: ['D', 'program_index_member'],
            I: ['I', 'individual_single'],
            J: ['J', 'program_index_individual'],
            K: ['K', 'program_non_index_individual'],
            M: ['M', 'program_index_other_member'],
            N: ['N', 'program_non_index_other_member'],
            U: ['U', 'program_index_other_agency'],
            W: ['W', 'all_other'],
            Y: ['Y', 'program_non_index_other_agency'],
        });
    }

}
