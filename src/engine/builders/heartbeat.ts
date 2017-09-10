import { Tag } from '../../messaging/fields/base/tag';
import { IBeginningOfStringField } from '../../messaging/fields/beginning-of-string/beginning-of-string';
import { IBodyLengthField } from '../../messaging/fields/body-length/body-length';
import { IMessageTypeField, MESSAGE_TYPE } from '../../messaging/fields/message-type/message-type';
import {
    HeartbeatMessage, IHeartbeatMessage, IProtoHeartbeatMessage, ProtoHeartbeatMessage,
} from '../../messaging/messages/heartbeat';
import { BaseMessageBuilder, BUILDER_EVENT, IBaseMessageBuilder } from './base-message-builder';

export interface IHeartbeatMessageBuilder extends IBaseMessageBuilder {
    message: IHeartbeatMessage;
}

export class HeartbeatMessageBuilder extends BaseMessageBuilder implements IHeartbeatMessageBuilder {

    protected _message: IHeartbeatMessage           = null;
    protected _protoMessage: IProtoHeartbeatMessage = null;

    constructor() {
        super();

        this._protoMessage = new ProtoHeartbeatMessage();
    }

    public get message(): IHeartbeatMessage { return this._message; }

    public parseField(token: string): number {
        return super.parseField(token);
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
        this._protoMessage = new ProtoHeartbeatMessage();
    }

    protected finalizeAndEmitMessage(): void {
        if (!this.validate()) this.emitError();

        const type    = MESSAGE_TYPE.heartbeat;
        const message = new HeartbeatMessage(this._protoMessage);
        this.emit(BUILDER_EVENT.message_complete, { type, message });
        this._message = message;
    }

    /**
     * Validation rules:
     *
     * @returns {boolean}
     */
    protected validate(): boolean {

        // Validate Header
        if (!this.validateHeader()) return false;

        // Verify MsgType
        if (this._protoMessage[Tag.MsgType].formatted !== MESSAGE_TYPE.heartbeat) return false;

        // Validate Trailer
        return this.validateTrailer();
    }
}
