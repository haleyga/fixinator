import { BoundedIntField, IBoundedIntField } from '../base/custom/bounded-int';
import { Tag } from '../base/tag';

export interface IMessageSequenceNumberField extends IBoundedIntField {}

export const MIN_SEQUENCE_NUMBER: number = 0;
export const MAX_SEQUENCE_NUMBER: number = 99999;

/**
 * Field ID (TAG): 34
 * Field Name: MsgSeqNum
 * Format: int
 * Description: Integer message sequence number. Incremented for each message except heartbeat.
 *
 *              Valid values: 0 - 99999
 */
export class MessageSequenceNumberField extends BoundedIntField implements IMessageSequenceNumberField {

    constructor(raw: string) {
        super(Tag.MsgSeqNum, raw, MIN_SEQUENCE_NUMBER, MAX_SEQUENCE_NUMBER);
    }

}
