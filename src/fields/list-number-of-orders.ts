import { Tag } from '../tag';
import { FixIntField, IFixIntField } from './base/fix/fix-int-field';

export interface IListNumberOfOrdersField extends IFixIntField {}

/**
 * Field ID (TAG): 68
 * Field Name: ListNoOrds
 * Format: int
 * Description: Total number of orders within list (i.e. ListSeqNo of ListNoOrds, e.g. 2of25,3of25, ...)
 */
export class ListNumberOfOrdersField extends FixIntField implements IListNumberOfOrdersField {

    constructor(raw: string) {
        super(Tag.ListNoOrds, raw);
    }

}
