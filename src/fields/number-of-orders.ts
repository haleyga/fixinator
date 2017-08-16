import { Tag } from '../tag';
import { FixIntField, IFixIntField } from './base/fix/fix-int-field';

export interface INumberOfOrdersField extends IFixIntField {}

/**
 * Field ID (TAG): 73
 * Field Name: NoOrders
 * Format: int
 * Description: Indicates number of orders to be combined for average pricing and allocation.
 */
export class NumberOfOrdersField extends FixIntField implements INumberOfOrdersField {

    constructor(raw: string) {
        super(Tag.NoOrders, raw);
    }

}