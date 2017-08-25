import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';

export interface IOrderTypeField extends IConstrainedCharField {}
export const ORDER_TYPE_VALUES: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9',
                                            'A', 'B'];

/**
 * Field ID (TAG): 40
 * Field Name: OrdType
 * Format: char
 * Description: Order type.
 *
 *              Valid values:
 *                  1 = Market
 *                  2 = Limit
 *                  3 = Stop
 *                  4 = Stop limit
 *                  5 = Market on close
 *                  6 = With or without
 *                  7 = Limit or better
 *                  8 = Limit with or without
 *                  9 = On basis
 *                  A = On close
 *                  B = Limit on close
 */
export class OrderTypeField extends ConstrainedCharField implements IOrderTypeField {

    constructor(raw: string) {
        super(Tag.OrdType, raw, ORDER_TYPE_VALUES);
    }

}
