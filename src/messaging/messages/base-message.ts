import { Tag } from '../fields/base/tag';
import { IBeginningOfStringField } from '../fields/beginning-of-string/beginning-of-string';
import { IBodyLengthField } from '../fields/body-length/body-length';
import { IChecksumField } from '../fields/checksum/checksum';
import { IMessageSequenceNumberField } from '../fields/message-sequence-number/message-sequence-number';
import { IMessageTypeField } from '../fields/message-type/message-type';
import { IPossibleDuplicateFlagField } from '../fields/possible-duplicate-flag/possible-duplicate-flag';
import { IPossibleResendField } from '../fields/possible-resend/possible-resend';
import { ISecureDataLengthField } from '../fields/secure-data-length/secure-data-length';
import { ISecureDataField } from '../fields/secure-data/secure-data';
import { ISenderCompanyIdField } from '../fields/sender-company-id/sender-company-id';
import { ISenderSubordinateIdField } from '../fields/sender-subordinate-id/sender-subordinate-id';
import { ISendingDateField } from '../fields/sending-date/sending-date';
import { ISendingTimeField } from '../fields/sending-time/sending-time';
import { ISignatureLengthField } from '../fields/signature-length/signature-length';
import { ISignatureField } from '../fields/signature/signature';
import { ITargetCompanyIdField } from '../fields/target-company-id/target-company-id';
import { ITargetSubordinateIdField } from '../fields/target-subordinate-id/target-subordinate-id';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoBaseMessage {
    raw: string;
    8: IBeginningOfStringField;
    9: IBodyLengthField;
    35: IMessageTypeField;
    49: ISenderCompanyIdField;
    50?: ISenderSubordinateIdField;
    56: ITargetCompanyIdField;
    57?: ITargetSubordinateIdField;
    90?: ISecureDataLengthField;
    91?: ISecureDataField;
    34: IMessageSequenceNumberField;
    43?: IPossibleDuplicateFlagField;
    97?: IPossibleResendField;
    52: ISendingTimeField;
    51: ISendingDateField;
    93?: ISignatureLengthField;
    89?: ISignatureField;
    10: IChecksumField;
}

//tslint:enable:no-magic-numbers

export class ProtoBaseMessage implements IProtoBaseMessage {
    public raw: string                     = null;
    public 8: IBeginningOfStringField      = null;
    public 9: IBodyLengthField             = null;
    public 35: IMessageTypeField           = null;
    public 49: ISenderCompanyIdField       = null;
    public 56: ITargetCompanyIdField       = null;
    public 34: IMessageSequenceNumberField = null;
    public 52: ISendingTimeField           = null;
    public 51: ISendingDateField           = null;
    public 10: IChecksumField              = null;
}

export interface IBaseMessage {
    raw: string;

    beginString: IBeginningOfStringField;
    bodyLength: IBodyLengthField;
    msgType: IMessageTypeField;
    senderCompId: ISenderCompanyIdField;
    senderSubId?: ISenderSubordinateIdField;
    targetCompId: ITargetCompanyIdField;
    targetSubId?: ITargetSubordinateIdField;
    secureDataLen?: ISecureDataLengthField;
    secureData?: ISecureDataField;
    msgSeqNum: IMessageSequenceNumberField;
    possDupFlag?: IPossibleDuplicateFlagField;
    possResendFlag?: IPossibleResendField;
    sendingTime: ISendingTimeField;
    sendingDate: ISendingDateField;

    signatureLength?: ISignatureLengthField;
    signature?: ISignatureField;
    checkSum: IChecksumField;

    validate(): boolean;
}

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * MESSAGE HEADER
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * Each message, administrative or application, is preceded by a standard header. The header is used to identify the
 * message type, length, destination, sequence number, origination point and time.
 *
 * Format:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *  8       BeginString         Y           FIX.2.7 (Always unencrypted)
 *  9       BodyLength          Y           (Always unencrypted)
 *  35      MsgType             Y           (Always unencrypted)
 *  49      SenderCompID        Y           (Always unencrypted)
 *  50      SenderSubID         N           (Always unencrypted)
 *  56      TargetCompID        Y           (Always unencrypted)
 *  57      TargetSubID         N           “ADMIN” reserved for administrative messages not intended for a specific
 *                                          user. (Always unencrypted)
 *  90      SecureDataLen       N           Required to identify length of encrypted section of message. (Always
 *                                          unencrypted)
 *  91      SecureData          N           Required when message body is encrypted. Always immediately follows
 *                                          SecureDataLen field.
 *  34      MsgSeqNum           Y           (Can be embedded within encrypted data section.)
 *  43      PossDupFlag         N           Always required for retransmissions, whether prompted by the sending
 *                                          system or as the result of a resend request. (Can be embedded within
 *                                          encrypted data section.)
 *  97      PossResendFlag      N           Required when message may be duplicate of another message sent under a
 *                                          different sequence number. (Can be embedded within encrypted data section.)
 *  52      SendingTime         Y           (Can be embedded within encrypted data section.)
 *  51      SendingDate         Y           (Can be embedded within encrypted data section.)
 *
 *
 * ---------------------------------------------------------------------------------------------------------------------
 * BODY
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * Body fields are defined and managed by subclass of BaseMessage.
 *
 *
 * ---------------------------------------------------------------------------------------------------------------------
 * MESSAGE TRAILER
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * Each message, administrative or application, is terminated by a standard trailer. The trailer is used to
 * segregate messages and contains the three digit character representation of the Checksum value.
 *
 * Format:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *  93      SignatureLength     N           Required when trailer contains signature.
 *  89      Signature           N
 *  10      CheckSum            Y           (Always unencrypted)
 */
export abstract class BaseMessage implements IBaseMessage {

    protected _raw: string = null;

    protected _beginString: IBeginningOfStringField      = null;
    protected _bodyLength: IBodyLengthField              = null;
    protected _msgType: IMessageTypeField                = null;
    protected _senderCompId: ISenderCompanyIdField       = null;
    protected _senderSubId?: ISenderSubordinateIdField   = null;
    protected _targetCompId: ITargetCompanyIdField       = null;
    protected _targetSubId?: ITargetSubordinateIdField   = null;
    protected _secureDataLen?: ISecureDataLengthField    = null;
    protected _secureData?: ISecureDataField             = null;
    protected _msgSeqNum: IMessageSequenceNumberField    = null;
    protected _possDupFlag?: IPossibleDuplicateFlagField = null;
    protected _possResendFlag?: IPossibleResendField     = null;
    protected _sendingTime: ISendingTimeField            = null;
    protected _sendingDate: ISendingDateField            = null;

    protected _signatureLength?: ISignatureLengthField = null;
    protected _signature?: ISignatureField             = null;
    protected _checkSum: IChecksumField                = null;

    constructor(protoMessage: IProtoBaseMessage) {
        this.construct(protoMessage);
    }

    public get raw(): string { return this._raw; }

    // Standard Header

    public get beginString(): IBeginningOfStringField { return this._beginString; }

    public get bodyLength(): IBodyLengthField { return this._bodyLength; }

    public get msgType(): IMessageTypeField { return this._msgType; }

    public get senderCompId(): ISenderCompanyIdField {return this._senderCompId; }

    public get senderSubId(): ISenderSubordinateIdField {return this._senderSubId; }

    public get targetCompId(): ITargetCompanyIdField {return this._targetCompId; }

    public get targetSubId(): ITargetSubordinateIdField {return this._targetSubId; }

    public get secureDataLen(): ISecureDataLengthField {return this._secureDataLen; }

    public get secureData(): ISecureDataField {return this._secureData; }

    public get msgSeqNum(): IMessageSequenceNumberField {return this._msgSeqNum; }

    public get possDupFlag(): IPossibleDuplicateFlagField {return this._possDupFlag; }

    public get possResendFlag(): IPossibleResendField {return this._possResendFlag; }

    public get sendingTime(): ISendingTimeField {return this._sendingTime; }

    public get sendingDate(): ISendingDateField {return this._sendingDate; }

    // Standard Trailer

    public get signatureLength(): ISignatureLengthField { return this._signatureLength; }

    public get signature(): ISignatureField { return this._signature; }

    public get checkSum(): IChecksumField { return this._checkSum; }

    // Validation

    public abstract validate(): boolean;

    protected construct(protoMessage: IProtoBaseMessage): void {
        this._raw = protoMessage.raw;

        this._beginString    = protoMessage[Tag.BeginString];
        this._bodyLength     = protoMessage[Tag.BodyLength];
        this._msgType        = protoMessage[Tag.MsgType];
        this._senderCompId   = protoMessage[Tag.SenderCompID];
        this._senderSubId    = protoMessage[Tag.SenderSubID];
        this._targetCompId   = protoMessage[Tag.TargetCompID];
        this._targetSubId    = protoMessage[Tag.TargetSubID];
        this._secureDataLen  = protoMessage[Tag.SecureDataLen];
        this._secureData     = protoMessage[Tag.SecureData];
        this._msgSeqNum      = protoMessage[Tag.MsgSeqNum];
        this._possDupFlag    = protoMessage[Tag.PossDupFlag];
        this._possResendFlag = protoMessage[Tag.PossResend];
        this._sendingTime    = protoMessage[Tag.SendingTime];
        this._sendingDate    = protoMessage[Tag.SendingDate];

        this._signatureLength = protoMessage[Tag.SignatureLength];
        this._signature       = protoMessage[Tag.Signature];
        this._checkSum        = protoMessage[Tag.CheckSum];
    }

    protected validateHeader(): boolean {
        return true;
    }

    protected validateTrailer(): boolean {
        return true;
    }

}
