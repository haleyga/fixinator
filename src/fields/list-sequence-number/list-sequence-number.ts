import { FixIntField, IFixIntField } from '../base/fix/fix-int-field';
import { Tag } from '../base/tag';

export interface IListSequenceNumberField extends IFixIntField {}

/**
 * Field ID (TAG): 67
 * Field Name: ListSeqNo
 * Format: int
 * Description: Sequence of individual order within list (i.e. ListSeqNo of ListNoOrds,2of25,3of25, ...)
 */
export class ListSequenceNumberField extends FixIntField implements IListSequenceNumberField {

    constructor(raw: string) {
        super(Tag.ListSeqNo, raw);
    }

}
