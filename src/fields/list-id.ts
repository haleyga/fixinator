import { Tag } from '../tag';
import { FixCharField, IFixCharField } from './base/fix/fix-char-field';

export interface IListIdField extends IFixCharField {}

/**
 * Field ID (TAG): 66
 * Field Name: ListID
 * Format: char
 * Description: Customer assigned list identifier used to associate multiple individual orders.
 */
export class ListIdField extends FixCharField implements IListIdField {

    constructor(raw: string) {
        super(Tag.ListID, raw);
    }

}
