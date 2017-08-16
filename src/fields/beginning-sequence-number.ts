import { Tag } from '../tag';
import { FixIntField, IFixIntField } from './base/fix/fix-int-field';

export interface IBeginningSequenceNumberField extends IFixIntField {}

/**
 * Field ID (TAG): 7
 * Field Name: BeginSeqNo
 * Format: int
 * Description: Message sequence number of first record in range to be resent
 */
export class BeginningSequenceNumberField extends FixIntField implements IBeginningSequenceNumberField {

    constructor(raw: string) {
        super(Tag.BeginSeqNo, raw);
    }

}
