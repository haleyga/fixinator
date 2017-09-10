import { ConstrainedCharField, IConstrainedCharField } from '../base/custom/constrained-field/constrained-char-field';
import { Tag } from '../base/tag';
import { ConstrainedKeyToStringMap } from '../../../util/util';

export interface IOrderTypeField extends IConstrainedCharField {}

export const ORDER_TYPE_VALUES: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9',
                                            'A', 'B'];

export type OrderType =
    'market'
    | 'limit'
    | 'stop'
    | 'stop_limit'
    | 'market_on_close'
    | 'with_or_without'
    | 'limit_or_better'
    | 'limit_with_or_without'
    | 'on_basis'
    | 'on_close'
    | 'limit_on_close';

export const ORDER_TYPE: ConstrainedKeyToStringMap<OrderType> = {
    limit                : '2',
    limit_on_close       : 'B',
    limit_or_better      : '7',
    limit_with_or_without: '8',
    market               : '1',
    market_on_close      : '5',
    on_basis             : '9',
    on_close             : 'A',
    stop                 : '3',
    stop_limit           : '4',
    with_or_without      : '6',
};

export function isLimitOrder(orderType: string): boolean {
    return orderType === ORDER_TYPE.limit || orderType === ORDER_TYPE.limit_on_close
           || orderType === ORDER_TYPE.limit_or_better || orderType === ORDER_TYPE.limit_with_or_without
           || orderType === ORDER_TYPE.stop_limit;
}

export function isStopOrder(orderType: string): boolean {
    return orderType === ORDER_TYPE.stop || orderType === ORDER_TYPE.stop_limit;
}

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
