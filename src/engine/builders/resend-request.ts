import { Tag } from '../../messaging/fields/base/tag';
import { IBeginningOfStringField } from '../../messaging/fields/beginning-of-string/beginning-of-string';
import {
    BeginningSequenceNumberField,
} from '../../messaging/fields/beginning-sequence-number/beginning-sequence-number';
import { IBodyLengthField } from '../../messaging/fields/body-length/body-length';
import { EndingSequenceNumberField } from '../../messaging/fields/ending-sequence-number/ending-sequence-number';
import { IMessageTypeField, MESSAGE_TYPE } from '../../messaging/fields/message-type/message-type';
import {
    IProtoResendRequestMessage, IResendRequestMessage, ProtoResendRequestMessage, ResendRequestMessage,
} from '../../messaging/messages/resend-request';
import { BaseMessageBuilder, BUILDER_EVENT, IBaseMessageBuilder } from './base-message-builder';

export interface IResendRequestMessageBuilder extends IBaseMessageBuilder {
    message: IResendRequestMessage;
}

export class ResendRequestMessageBuilder extends BaseMessageBuilder implements IResendRequestMessageBuilder {

    protected _message: IResendRequestMessage           = null;
    protected _protoMessage: IProtoResendRequestMessage = null;

    constructor() {
        super();

        this._protoMessage = new ProtoResendRequestMessage();
    }

    public get message(): IResendRequestMessage { return this._message; }

    public parseField(token: string): number {
        let rawDataLength = -1;

        const keyValue: string[] = token.split('=');
        const tag: Tag           = Number(keyValue[0]) as Tag;
        const rawValue: string   = keyValue[1];
        if (!rawValue) this.emitError();

        switch (tag) {
            case Tag.BeginSeqNo:
                this._protoMessage[Tag.BeginSeqNo] = new BeginningSequenceNumberField(rawValue);
                break;
            case Tag.EndSeqNo:
                this._protoMessage[Tag.EndSeqNo] = new EndingSequenceNumberField(rawValue);
                break;
            default:
                rawDataLength = super.parseField(token);
                if (this._messageIsComplete) this.finalizeAndEmitMessage();
        }

        return rawDataLength;
    }

    public pushRawData(raw: string): boolean {

        let done: boolean = false;

        if (this._readingRawData) {
            this._rawBuffer += raw;
            if (this._rawBuffer.length === this._expectedRawLength) {

                //  Since we should be reading a raw data field, we can safely assume that #parseField will return
                // -1 (unless a disaster happened).
                this.parseField(this._rawBuffer);

                this._expectedRawLength = 0;
                this._readingRawData    = false;

                done = true;
            }
        } else {
            this._readingRawData = true;
        }

        return done;
    }

    /**
     * This method must be called in order to prepare the builder for a new stream of fields.  It does not reset
     * state members.  It only reinitializes the message and proto message.
     *
     * @param {IBeginningOfStringField} beginningOfStringField
     * @param {IBodyLengthField} bodyLengthField
     * @param {IMessageTypeField} messageTypeField
     */
    public reset(beginningOfStringField: IBeginningOfStringField,
                 bodyLengthField: IBodyLengthField,
                 messageTypeField: IMessageTypeField): void
    {
        super.reset(beginningOfStringField, bodyLengthField, messageTypeField);

        this._message      = null;
        this._protoMessage = new ProtoResendRequestMessage();
    }

    protected finalizeAndEmitMessage(): void {
        if (!this.validate()) this.emitError();

        const type    = MESSAGE_TYPE.resend_request;
        const message = new ResendRequestMessage(this._protoMessage);
        this.emit(BUILDER_EVENT.message_complete, { type, message });
        this._message = message;
    }

    /**
     * Validation rules:
     *
     *      Tag     Field Name          Required?   Comments
     *      ------------------------------------------------------------------------------------------------------------
     *              <Standard Header>   Y           MsgType = 2
     *      7       BeginSeqNo          Y
     *      16      EndSeqNo            Y
     *              <Standard Trailer>  Y
     *
     * @returns {boolean}
     */
    protected validate(): boolean {
        super.validate();

        if (this._protoMessage[Tag.BeginSeqNo] > this._protoMessage[Tag.EndSeqNo]) return false;

        // TODO: Verify CheckSum

        return true;
    }
}
