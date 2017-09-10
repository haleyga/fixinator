import { Tag } from '../../messaging/fields/base/tag';
import { IBeginningOfStringField } from '../../messaging/fields/beginning-of-string/beginning-of-string';
import { IBodyLengthField } from '../../messaging/fields/body-length/body-length';
import { ClientOrderIdField } from '../../messaging/fields/client-order-id/client-order-id';
import { IMessageTypeField, MESSAGE_TYPE } from '../../messaging/fields/message-type/message-type';
import { OrderIdField } from '../../messaging/fields/order-id/order-id';
import { SideField } from '../../messaging/fields/side/side';
import { SymbolSuffixField } from '../../messaging/fields/symbol-suffix/symbol-suffix';
import { SymbolField } from '../../messaging/fields/symbol/symbol';
import {
    IOrderStatusRequestMessage, IProtoOrderStatusRequestMessage, OrderStatusRequestMessage,
    ProtoOrderStatusRequestMessage,
} from '../../messaging/messages/order-status-request';
import { BaseMessageBuilder, BUILDER_EVENT, IBaseMessageBuilder } from './base-message-builder';

export interface IOrderStatusRequestMessageBuilder extends IBaseMessageBuilder {
    message: IOrderStatusRequestMessage;
}

export class OrderStatusRequestMessageBuilder extends BaseMessageBuilder implements IOrderStatusRequestMessageBuilder {

    protected _message: IOrderStatusRequestMessage           = null;
    protected _protoMessage: IProtoOrderStatusRequestMessage = null;

    constructor() {
        super();

        this._protoMessage = new ProtoOrderStatusRequestMessage();
    }

    public get message(): IOrderStatusRequestMessage { return this._message; }

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
            case Tag.ClOrdID:
                this._protoMessage[Tag.ClOrdID] = new ClientOrderIdField(rawValue);
                break;
            case Tag.Symbol:
                this._protoMessage[Tag.Symbol] = new SymbolField(rawValue);
                break;
            case Tag.SymbolSfx:
                this._protoMessage[Tag.SymbolSfx] = new SymbolSuffixField(rawValue);
                break;
            case Tag.Side:
                this._protoMessage[Tag.Side] = new SideField(rawValue);
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
        this._protoMessage = new ProtoOrderStatusRequestMessage();
    }

    protected finalizeAndEmitMessage(): void {
        if (!this.validate()) this.emitError();

        const type    = MESSAGE_TYPE.order_status_request;
        const message = new OrderStatusRequestMessage(this._protoMessage);
        this.emit(BUILDER_EVENT.message_complete, { type, message });
        this._message = message;
    }

    /**
     * Validation rules:
     *
     *      Tag     Field Name          Required?   Comments
     *      ------------------------------------------------------------------------------------------------------------
     *              <Standard Header>   Y           MsgType = H
     *      37      OrderID             N
     *      11      ClOrdID             Y
     *      55      Symbol              Y
     *      65      SymbolSfx           N
     *      54      Side                Y
     *              <Standard Trailer>  Y
     *
     * @returns {boolean}
     */
    protected validate(): boolean {

        // Validate Header
        if (!this.validateHeader()) return false;

        // Verify MsgType
        if (this._protoMessage[Tag.MsgType].formatted !== MESSAGE_TYPE.order_status_request) return false;

        // Check ClOrdID
        if (!this._protoMessage[Tag.ClOrdID]) return false;

        // Check Symbol
        if (!this._protoMessage[Tag.Symbol]) return false;

        // Check Side
        if (!this._protoMessage[Tag.Side]) return false;

        // Validate Trailer
        return this.validateTrailer();
    }
}
