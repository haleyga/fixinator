import { IStringEnumField, StringEnumField } from './base/custom/string-enum-field';
import { Tag } from './base/tag';

export interface IOrderTypeField extends IStringEnumField {}

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
export class OrderTypeField extends StringEnumField implements IOrderTypeField {

    constructor(raw: string) {
        super(Tag.OrdType, raw, {
            1: ['1', 'market'],
            2: ['2', 'limit'],
            3: ['3', 'stop'],
            4: ['4', 'stop_limit'],
            5: ['5', 'market_on_close'],
            6: ['6', 'with_or_without'],
            7: ['7', 'limit_or_better'],
            8: ['8', 'limit_with_or_without'],
            9: ['9', 'on_basis'],
            A: ['A', 'on_close'],
            B: ['B', 'limit_on_close'],
        });
    }

}
