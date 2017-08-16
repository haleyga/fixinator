import { Tag } from '../tag';
import { FixIntField, IFixIntField } from './base/fix/fix-int-field';

export interface IEndingSequenceNumberField extends IFixIntField {}

/**
 * Field ID (TAG): 16
 * Field Name: BeginSeqNo
 * Format: int
 * Description: Message sequence number of last record in range to be resent. If request is for a single record
 *              BeginSeqNo = EndSeqNo. If request is for all messages subsequent to a particular message, EndSeqNo =
 *              "99999"
 */
export class EndingSequenceNumberField extends FixIntField implements IEndingSequenceNumberField {

    constructor(raw: string) {
        super(Tag.EndSeqNo, raw);
    }

}
