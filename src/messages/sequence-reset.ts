import { MESSAGE_TYPES } from '../fields/message-type/message-type';
import { INewSequenceNumberField } from '../fields/new-sequence-number/new-sequence-number';
import { BaseAdministrativeMessage, IBaseAdministrativeMessage } from './base-administrative-message';

export interface ISequenceResetMessage extends IBaseAdministrativeMessage {
    newSeqNum: INewSequenceNumberField;
}

/**
 * The sequence reset message is used to reestablish the incoming sequence number on the opposing side. In the event
 * of an application failure it may be necessary to resync sequence numbers on the sending and receiving sides.
 *
 * The sending application will initiate the sequence reset. The message is used to reset the value of the last
 * sequence number sent (which on the receiving side will reset the value of the next expected sequence number).
 *
 * It is assumed that the purpose of the sequence reset message is to recover from an out-of- sequence condition,
 * therefore, the MsgSeqNum in the header should be ignored (i.e. the receipt of a sequence reset message with an
 * out of sequence MsgSeqNum should not generate resend requests).
 *
 * The sequence reset can only increase the sequence number; if a sequence reset is received attempting to decrease
 * the next expected sequence number the message should be rejected.
 *
 * The sequence reset format is as follows:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = 4
 *  36      NewSeqNum           Y
 *          <Standard Trailer>  Y
 */
export class SequenceResetMessage extends BaseAdministrativeMessage implements ISequenceResetMessage {

    protected _newSeqNum: INewSequenceNumberField = null;

    constructor(raw: string) {
        super(raw);
    }

    // Body Fields

    public get newSeqNum(): INewSequenceNumberField { return this._newSeqNum; }

    public set newSeqNum(field: INewSequenceNumberField) { this._newSeqNum = field; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPES.sequence_reset;
    }
}
