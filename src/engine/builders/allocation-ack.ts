import { AllocationIdField } from '../../messaging/fields/allocation-id/allocation-id';
import {
    AllocationRejectionCodeField,
} from '../../messaging/fields/allocation-rejection-code/allocation-rejection-code';
import { AllocationStatusField, ALLOCATION_STATUS } from '../../messaging/fields/allocation-status/allocation-status';
import { Tag } from '../../messaging/fields/base/tag';
import { IBeginningOfStringField } from '../../messaging/fields/beginning-of-string/beginning-of-string';
import { IBodyLengthField } from '../../messaging/fields/body-length/body-length';
import { IMessageTypeField, MESSAGE_TYPE } from '../../messaging/fields/message-type/message-type';
import { TextField } from '../../messaging/fields/text/text';
import {
    AllocationAcknowledgementMessage,
    IAllocationAcknowledgementMessage, IProtoAllocationAcknowledgementMessage, ProtoAllocationAcknowledgementMessage,
} from '../../messaging/messages/allocation-ack';
import { BaseMessageBuilder, BUILDER_EVENT, IBaseMessageBuilder } from './base-message-builder';

export interface IAllocationAcknowledgementMessageBuilder extends IBaseMessageBuilder {
    message: IAllocationAcknowledgementMessage;
}

export class AllocationAcknowledgementMessageBuilder extends BaseMessageBuilder
    implements IAllocationAcknowledgementMessageBuilder {

    protected _message: IAllocationAcknowledgementMessage           = null;
    protected _protoMessage: IProtoAllocationAcknowledgementMessage = null;

    constructor() {
        super();

        this._protoMessage = new ProtoAllocationAcknowledgementMessage();
    }

    public get message(): IAllocationAcknowledgementMessage { return this._message; }

    public parseField(token: string): number {
        let rawDataLength = -1;

        const keyValue: string[] = token.split('=');
        const tag: Tag           = Number(keyValue[0]) as Tag;
        const rawValue: string   = keyValue[1];
        if (!rawValue) this.emitError();

        switch (tag) {
            case Tag.AllocID:
                this._protoMessage[Tag.AllocID] = new AllocationIdField(rawValue);
                break;
            case Tag.AllocStatus:
                this._protoMessage[Tag.AllocStatus] = new AllocationStatusField(rawValue);
                break;
            case Tag.AllocRejCode:
                this._protoMessage[Tag.AllocRejCode] = new AllocationRejectionCodeField(rawValue);
                break;
            case Tag.Text:
                this._protoMessage[Tag.Text] = new TextField(rawValue);
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
        this._protoMessage = new ProtoAllocationAcknowledgementMessage();
    }

    protected finalizeAndEmitMessage(): void {
        if (!this.validate()) this.emitError();

        const message = new AllocationAcknowledgementMessage(this._protoMessage);
        this.emit(BUILDER_EVENT.message_complete, message);
        this._message = message;
    }

    /**
     * Validation rules:
     *
     *  The allocation ACK record is used by the broker to acknowledge the receipt and status of an allocation record
     *  received from the institution.
     *
     *      Tag     Field Name          Required?   Comments
     *      ------------------------------------------------------------------------------------------------------------
     *              <Standard Header>   Y           MsgType = P
     *      70      AllocID             Y
     *      87      AllocStatus         Y
     *      88      AllocRejCode        N           Required for AllocStatus = 1 (rejected)
     *      58      Text                N           Can include explanation for AllocRejCode = 7 (other)
     *              <Standard Trailer>  Y
     *
     * @returns {boolean}
     */
    protected validate(): boolean {

        // Validate Header
        if (!this.validateHeader()) return false;

        // Verify MsgType
        if (this._protoMessage[Tag.MsgType].formatted !== MESSAGE_TYPE.allocation_ack) return false;

        // Check AllocID
        if (!this._protoMessage[Tag.AllocID]) return false;

        // Check AllocStatus
        if (!this._protoMessage[Tag.AllocStatus]) return false;

        // Check AllocRejCode
        if (this._protoMessage[Tag.AllocStatus].formatted === ALLOCATION_STATUS.rejected
            && !this._protoMessage[Tag.AllocRejCode])
        {
            return false;
        }

        // Validate Trailer
        return this.validateTrailer();
    }
}
