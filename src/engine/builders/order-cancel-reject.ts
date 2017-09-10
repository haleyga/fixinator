import { Tag } from '../../messaging/fields/base/tag';
import { IBeginningOfStringField } from '../../messaging/fields/beginning-of-string/beginning-of-string';
import { IBodyLengthField } from '../../messaging/fields/body-length/body-length';
import { CancelOrderRequestIdField } from '../../messaging/fields/cancel-order-request-id/cancel-order-request-id';
import { CancelRejectionReasonField } from '../../messaging/fields/cancel-rejection-reason/cancel-rejection-reason';
import { ListIdField } from '../../messaging/fields/list-id/list-id';
import { IMessageTypeField, MESSAGE_TYPE } from '../../messaging/fields/message-type/message-type';
import { OrderIdField } from '../../messaging/fields/order-id/order-id';
import { TextField } from '../../messaging/fields/text/text';
import {
    IOrderCancelRejectMessage, IProtoOrderCancelRejectMessage, OrderCancelRejectMessage, ProtoOrderCancelRejectMessage,
} from '../../messaging/messages/order-cancel-reject';
import { BaseMessageBuilder, BUILDER_EVENT, IBaseMessageBuilder } from './base-message-builder';

export interface IOrderCancelRejectMessageBuilder extends IBaseMessageBuilder {
    message: IOrderCancelRejectMessage;
}

// TODO: Perform field order verification here
export class OrderCancelRejectMessageBuilder extends BaseMessageBuilder implements IOrderCancelRejectMessageBuilder {

    protected _message: IOrderCancelRejectMessage           = null;
    protected _protoMessage: IProtoOrderCancelRejectMessage = null;

    constructor() {
        super();

        this._protoMessage = new ProtoOrderCancelRejectMessage();
    }

    public get message(): IOrderCancelRejectMessage { return this._message; }

    public parseField(token: string): number {
        let rawDataLength = -1;

        const keyValue: string[] = token.split('=');
        const tag: Tag           = Number(keyValue[0]) as Tag;
        const rawValue: string   = keyValue[1];
        if (!rawValue) this.emitError();

        switch (tag) {
            case Tag.OrderID:
                this._protoMessage[Tag.OrderID] = new OrderIdField(rawValue);
                break;
            case Tag.CxlOrdReqId:
                this._protoMessage[Tag.CxlOrdReqId] = new CancelOrderRequestIdField(rawValue);
                break;
            case Tag.ListID:
                this._protoMessage[Tag.ListID] = new ListIdField(rawValue);
                break;
            case Tag.CxlRejReason:
                this._protoMessage[Tag.CxlRejReason] = new CancelRejectionReasonField(rawValue);
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
        this._protoMessage = new ProtoOrderCancelRejectMessage();
    }

    protected finalizeAndEmitMessage(): void {
        if (!this.validate()) this.emitError();

        const type    = MESSAGE_TYPE.order_cancel_reject;
        const message = new OrderCancelRejectMessage(this._protoMessage);
        this.emit(BUILDER_EVENT.message_complete, { type, message });
        this._message = message;
    }

    /**
     * Validation rules:
     *
     *      Tag     Field Name          Required?   Comments
     *      ------------------------------------------------------------------------------------------------------------
     *              <Standard Header>   Y           MsgType = 9
     *      37      OrderID             Y
     *      101     CxlOrdReqId         Y           ID of Cancel Request
     *      66      ListID              N           Required for rejects against orders which were submitted as part
     *                                              of a list.
     *      102     CxlRejReason        N
     *      58      Text                N
     *              <Standard Trailer>  Y
     *
     * @returns {boolean}
     */
    protected validate(): boolean {

        // Validate Header
        if (!this.validateHeader()) return false;

        // Verify MsgType
        if (this._protoMessage[Tag.MsgType].formatted !== MESSAGE_TYPE.order_cancel_reject) return false;

        // Check OrderID
        if (!this._protoMessage[Tag.OrderID]) return false;

        // Check CxlOrdReqId
        if (!this._protoMessage[Tag.CxlOrdReqId]) return false;

        // Validate Trailer
        return this.validateTrailer();
    }
}
