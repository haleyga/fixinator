import { IBeginningOfStringField } from '../fields/beginning-of-string/beginning-of-string';
import { IBodyLengthField } from '../fields/body-length/body-length';
import { IMessageSequenceNumberField } from '../fields/message-sequence-number/message-sequence-number';
import { IMessageTypeField } from '../fields/message-type/message-type';
import { IPossibleDuplicateFlagField } from '../fields/possible-duplicate-flag/possible-duplicate-flag';
import { IPossibleResendField } from '../fields/possible-resend/possible-resend';
import { ISecureDataField } from '../fields/secure-data/secure-data';
import { ISecureDataLengthField } from '../fields/secure-data-length/secure-data-length';
import { ISenderCompanyIdField } from '../fields/sender-company-id/sender-company-id';
import { ISenderSubordinateIdField } from '../fields/sender-subordinate-id/sender-subordinate-id';
import { ISendingDateField } from '../fields/sending-date/sending-date';
import { ISendingTimeField } from '../fields/sending-time/sending-time';
import { ITargetCompanyIdField } from '../fields/target-company-id/target-company-id';
import { ITargetSubordinateIdField } from '../fields/target-subordinate-id/target-subordinate-id';

export interface IStandardHeader {
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
}

export class StandardHeader implements IStandardHeader {

    protected readonly _beginString: IBeginningOfStringField      = null;
    protected readonly _bodyLength: IBodyLengthField              = null;
    protected readonly _msgType: IMessageTypeField                = null;
    protected readonly _senderCompId: ISenderCompanyIdField       = null;
    protected readonly _senderSubId?: ISenderSubordinateIdField   = null;
    protected readonly _targetCompId: ITargetCompanyIdField       = null;
    protected readonly _targetSubId?: ITargetSubordinateIdField   = null;
    protected readonly _secureDataLen?: ISecureDataLengthField    = null;
    protected readonly _secureData?: ISecureDataField             = null;
    protected readonly _msgSeqNum: IMessageSequenceNumberField    = null;
    protected readonly _possDupFlag?: IPossibleDuplicateFlagField = null;
    protected readonly _possResendFlag?: IPossibleResendField     = null;
    protected readonly _sendingTime: ISendingTimeField            = null;
    protected readonly _sendingDate: ISendingDateField            = null;


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

}
