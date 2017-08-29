import { IBeginningSequenceNumberField } from '../fields/beginning-sequence-number/beginning-sequence-number';
import { IEndingSequenceNumberField } from '../fields/ending-sequence-number/ending-sequence-number';
import { MESSAGE_TYPES } from '../fields/message-type/message-type';
import { BaseAdministrativeMessage, IBaseAdministrativeMessage } from './base-administrative-message';

export interface IResendRequest extends IBaseAdministrativeMessage {
    beginSeqNo: IBeginningSequenceNumberField;
    endSeqNo: IEndingSequenceNumberField;
}

/**
 * The resend request is introduced by the receiving application to initiate the retransmission of messages. This
 * function would be utilized if a sequence number gap is detected, if the receiving application lost a message, or
 * as a function of the initialization process. Sequence numbers are not incremented for resend request messages.
 *
 * The resend request can be used to request a single message, a range of messages or all messages subsequent to a
 * particular message.
 *  • To request a single message: BeginSeqNo = EndSeqNo
 *  • To request a range of messages: BeginSeqNo = first message of range, EndSeqNo = last message of range
 *  • To request all messages subsequent to a particular message: BeginSeqNo = first message of range, EndSeqNo = 99999
 *
 * The resend request format is as follows:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = 2
 *  7       BeginSeqNo          Y
 *  16      EndSeqNo            Y
 *          <Standard Trailer>  Y
 */
export abstract class ResendRequest extends BaseAdministrativeMessage implements IResendRequest {

    protected _beginSeqNo: IBeginningSequenceNumberField = null;
    protected _endSeqNo: IEndingSequenceNumberField      = null;

    constructor(raw: string) {
        super(raw);
    }

    // Body Fields

    public get beginSeqNo(): IBeginningSequenceNumberField { return this._beginSeqNo; }

    public set beginSeqNo(field: IBeginningSequenceNumberField) { this._beginSeqNo = field; }

    public get endSeqNo(): IEndingSequenceNumberField { return this._endSeqNo; }

    public set endSeqNo(field: IEndingSequenceNumberField) { this._endSeqNo = field; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        // Ensure the range is appropriate
        if (this._beginSeqNo.formatted > this._endSeqNo.formatted) return false;

        return this._msgType.formatted === MESSAGE_TYPES.resend_request;
    }
}
