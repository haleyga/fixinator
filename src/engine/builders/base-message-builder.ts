import { EventEmitter } from 'events';
import { Tag } from '../../messaging/fields/base/tag';
import {
    BeginningOfStringField,
    IBeginningOfStringField,
} from '../../messaging/fields/beginning-of-string/beginning-of-string';
import { BodyLengthField, IBodyLengthField } from '../../messaging/fields/body-length/body-length';
import { ChecksumField } from '../../messaging/fields/checksum/checksum';
import {
    MessageSequenceNumberField,
} from '../../messaging/fields/message-sequence-number/message-sequence-number';
import { IMessageTypeField, MessageType, MessageTypeField } from '../../messaging/fields/message-type/message-type';
import { PossibleDuplicateFlagField } from '../../messaging/fields/possible-duplicate-flag/possible-duplicate-flag';
import { PossibleResendField } from '../../messaging/fields/possible-resend/possible-resend';
import { SecureDataLengthField } from '../../messaging/fields/secure-data-length/secure-data-length';
import { SecureDataField } from '../../messaging/fields/secure-data/secure-data';
import { SenderCompanyIdField } from '../../messaging/fields/sender-company-id/sender-company-id';
import { SenderSubordinateIdField } from '../../messaging/fields/sender-subordinate-id/sender-subordinate-id';
import { SendingDateField } from '../../messaging/fields/sending-date/sending-date';
import { SendingTimeField } from '../../messaging/fields/sending-time/sending-time';
import { SignatureLengthField } from '../../messaging/fields/signature-length/signature-length';
import { SignatureField } from '../../messaging/fields/signature/signature';
import { TargetCompanyIdField } from '../../messaging/fields/target-company-id/target-company-id';
import { TargetSubordinateIdField } from '../../messaging/fields/target-subordinate-id/target-subordinate-id';
import { IBaseMessage, IProtoBaseMessage } from '../../messaging/messages/base-message';
import { IEventEmitter, UnionKeyToValue } from '../../util/util';

// Define the event type strings
export type BuilderEventType =
    'open'
    | 'closed'
    | 'error'
    | 'trailer_received'
    | 'header_received'
    | 'message_complete';

export const BUILDER_EVENT: UnionKeyToValue<BuilderEventType> = {
    closed          : 'closed',
    error           : 'error',
    header_received : 'header_received',
    message_complete: 'message_complete',
    open            : 'open',
    trailer_received: 'trailer_received',
};

export interface IBaseMessageBuilder extends IEventEmitter {
    message: IBaseMessage;

    parseField(raw: string): number;

    pushRawData(raw: string): boolean;

    reset(beginningOfStringField: IBeginningOfStringField,
          bodyLengthField: IBodyLengthField,
          messageTypeField: IMessageTypeField): void;
}

export interface INewMessageEvent {
    type: MessageType;
    message: IBaseMessage;
}

export interface IBuilderErrorEvent {

}

/**
 * This class can emit the following events:
 *  - closed
 *  - error
 *  - header_received
 *  - open
 *  - trailer_received
 */
export abstract class BaseMessageBuilder extends EventEmitter implements IBaseMessageBuilder {

    protected _message: IBaseMessage           = null;
    protected _protoMessage: IProtoBaseMessage = null;

    protected _rawBuffer: string          = null;
    protected _expectedRawLength: number  = null;
    protected _readingRawData: boolean    = null;
    protected _messageIsComplete: boolean = null;

    protected _beginningOfStringField: IBeginningOfStringField = null;
    protected _bodyLengthField: IBodyLengthField               = null;
    protected _messageTypeField: IMessageTypeField             = null;

    constructor() {
        super();

        this._rawBuffer         = '';
        this._expectedRawLength = 0;
        this._readingRawData    = false;
        this._messageIsComplete = false;
    }

    public get message(): IBaseMessage { return this._message; }

    /**
     * This function returns a number indicating the number of bytes expected for the next field.  Usually, this will be
     * -1, since subsequent fields may come in any order.  However, if the most recently parsed field indicates a length
     * for an upcoming FixRaw field, #parseField will return the expected length of the raw data so that the message
     * parser handles the standard delimiter correctly.
     *
     * This only works if the sender follows the specification.  Whenever a raw data field is upcoming, it must
     * immediately follow a length field.  Since raw data may contain the standard field/message delimiter within
     * its contents, without the length field parsing would get fatally skewed.
     *
     * This method assumes correct message order from the sender.  Logic is implemented to detect incoming message
     * issues, but only to a certain extent.  The engine only needs to detect possible duplications and resends, and
     * it makes little attempt to guide the sender when parsing gets fowled outside of the basic recovery mechanisms
     * described in the spec.
     *
     * @param {string} token
     * @returns {number}
     */
    public parseField(token: string): number {
        let rawDataLength = -1;

        const keyValue: string[] = token.split('=');
        const tag: Tag = Number(keyValue[0]) as Tag;
        const rawValue: string = keyValue[1];
        if (!rawValue) this.emitError();

        switch (tag) {
            case Tag.BeginString:
                this._protoMessage[Tag.BeginString] = new BeginningOfStringField(rawValue);
                break;
            case Tag.BodyLength:
                this._protoMessage[Tag.BodyLength] = new BodyLengthField(rawValue);
                break;
            case Tag.MsgType:
                this._protoMessage[Tag.MsgType] = new MessageTypeField(rawValue);
                break;
            case Tag.SenderCompID:
                this._protoMessage[Tag.SenderCompID] = new SenderCompanyIdField(rawValue);
                break;
            case Tag.SenderSubID:
                this._protoMessage[Tag.SenderSubID] = new SenderSubordinateIdField(rawValue);
                break;
            case Tag.TargetCompID:
                this._protoMessage[Tag.TargetCompID] = new TargetCompanyIdField(rawValue);
                break;
            case Tag.TargetSubID:
                this._protoMessage[Tag.TargetSubID] = new TargetSubordinateIdField(rawValue);
                break;
            case Tag.SecureDataLen:
                this._protoMessage[Tag.SecureDataLen] = new SecureDataLengthField(rawValue);
                rawDataLength                         = this._protoMessage[Tag.SecureDataLen].formatted;
                break;
            case Tag.SecureData:
                this._protoMessage[Tag.SecureData] = new SecureDataField(rawValue);
                break;
            case Tag.MsgSeqNum:
                this._protoMessage[Tag.MsgSeqNum] = new MessageSequenceNumberField(rawValue);
                break;
            case Tag.PossDupFlag:
                this._protoMessage[Tag.PossDupFlag] = new PossibleDuplicateFlagField(rawValue);
                break;
            case Tag.PossResend:
                this._protoMessage[Tag.PossResend] = new PossibleResendField(rawValue);
                break;
            case Tag.SendingTime:
                this._protoMessage[Tag.SendingTime] = new SendingTimeField(rawValue);
                break;
            case Tag.SendingDate:
                this._protoMessage[Tag.SendingDate] = new SendingDateField(rawValue);
                break;
            case Tag.SignatureLength:
                this._protoMessage[Tag.SignatureLength] = new SignatureLengthField(rawValue);
                rawDataLength                           = this._protoMessage[Tag.SignatureLength].formatted;
                break;
            case Tag.Signature:
                this._protoMessage[Tag.Signature] = new SignatureField(rawValue);
                break;
            case Tag.CheckSum:
                this._protoMessage[Tag.CheckSum] = new ChecksumField(rawValue);
                this._messageIsComplete          = true;
                break;
            default:
                this.emitError();
        }

        return rawDataLength;
    }

    /**
     * This function is used to push raw bytes into a buffer while the builder waits for the complete field.  If
     * more data is needed, false is returned.  If the raw data field can be completely constructed, #pushRawData
     * will return true (for 'completed').
     *
     * Each implementation of this method will likely call the local (most derived) form of #parseField as well.
     * The implementation may often contain identical code, but it is the requirement to call the derived method
     * that necessitates re-implementing the method in all derived classes.
     *
     * @param {string} raw
     * @returns {boolean}
     */
    public abstract pushRawData(raw: string): boolean;

    /**
     * This method must be called in order to prepare the builder for a new stream of fields.
     *
     * @param {IBeginningOfStringField} beginningOfStringField
     * @param {IBodyLengthField} bodyLengthField
     * @param {IMessageTypeField} messageTypeField
     */
    public reset(beginningOfStringField: IBeginningOfStringField,
                 bodyLengthField: IBodyLengthField,
                 messageTypeField: IMessageTypeField): void
    {
        this._rawBuffer         = '';
        this._expectedRawLength = 0;
        this._messageIsComplete = false;

        this._beginningOfStringField = beginningOfStringField;
        this._bodyLengthField        = bodyLengthField;
        this._messageTypeField       = messageTypeField;
    }

    protected abstract finalizeAndEmitMessage(): void;

    protected abstract validate(): boolean;

    /**
     * Validation rules:
     *
     *      Tag     Field Name          Required?   Comments
     *      ------------------------------------------------------------------------------------------------------------
     *      8       BeginString         Y           FIX.2.7 (Always unencrypted)
     *      9       BodyLength          Y           (Always unencrypted)
     *      35      MsgType             Y           (Always unencrypted)
     *      49      SenderCompID        Y           (Always unencrypted)
     *      50      SenderSubID         N           (Always unencrypted)
     *      56      TargetCompID        Y           (Always unencrypted)
     *      57      TargetSubID         N           “ADMIN” reserved for administrative messages not intended for a
     *                                              specific user. (Always unencrypted)
     *      90      SecureDataLen       N           Required to identify length of encrypted section of message. (Always
     *                                              unencrypted)
     *      91      SecureData          N           Required when message body is encrypted. Always immediately follows
     *                                              SecureDataLen field.
     *      34      MsgSeqNum           Y           (Can be embedded within encrypted data section.)
     *      43      PossDupFlag         N           Always required for retransmissions, whether prompted by the sending
     *                                              system or as the result of a resend request. (Can be embedded within
     *                                              encrypted data section.)
     *      97      PossResendFlag      N           Required when message may be duplicate of another message sent under
     *                                              a different sequence number. (Can be embedded within encrypted
     *                                              data section.)
     *      52      SendingTime         Y           (Can be embedded within encrypted data section.)
     *      51      SendingDate         Y           (Can be embedded within encrypted data section.)
     *
     * @returns {boolean}
     */
    protected validateHeader(): boolean {

        // Check BeginString
        // TODO: check BeginString against the FIX version used in this session
        if (!this._protoMessage[Tag.BeginString]) return false;

        // Check BodyLength
        // TODO: verify BodyLength with parsed byte length
        if (!this._protoMessage[Tag.BodyLength]) return false;

        // Check MsgType
        if (!this._protoMessage[Tag.MsgType]) return false;

        // Check SenderCompID
        if (!this._protoMessage[Tag.SenderCompID]) return false;

        // Check TargetCompID
        if (!this._protoMessage[Tag.TargetCompID]) return false;

        // Check SecureDataLength and SecureData - if one exists, so should the other
        if ((this._protoMessage[Tag.SecureDataLen] && !this._protoMessage[Tag.SecureData])
            || (this._protoMessage[Tag.SecureData] && !this._protoMessage[Tag.SecureDataLen]))
        {
            return false;
        }

        // Check MsgSeqNum
        // TODO: verify MsgSeqNum is properly increasing
        if (!this._protoMessage[Tag.MsgSeqNum]) return false;

        // Check SendingTime
        if (!this._protoMessage[Tag.SendingTime]) return false;

        // Check SendingDate
        if (!this._protoMessage[Tag.SendingDate]) return false;
    }

    /**
     * Validation rules:
     *
     *      Tag     Field Name          Required?   Comments
     *      ------------------------------------------------------------------------------------------------------------
     *      93      SignatureLength     N           Required when trailer contains signature.
     *      89      Signature           N
     *      10      CheckSum            Y           (Always unencrypted)
     *
     * @returns {boolean}
     */
    protected validateTrailer(): boolean {

        // Check SignatureLength and Signature - if one exists, so should the other
        if ((this._protoMessage[Tag.SignatureLength] && !this._protoMessage[Tag.Signature])
            || (this._protoMessage[Tag.Signature] && !this._protoMessage[Tag.SignatureLength]))
        {
            return false;
        }

        // Check CheckSum
        // TODO: Verify CheckSum
        if (!this._protoMessage[Tag.CheckSum]) return false;
    }

    protected emitError(errorCode: string = BUILDER_EVENT.error, message: IBuilderErrorEvent = null): void {
        this.emit(BUILDER_EVENT.error, { errorCode, message });
    }
}
