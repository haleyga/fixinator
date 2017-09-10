import { AccountField } from '../../messaging/fields/account/account';
import { Tag } from '../../messaging/fields/base/tag';
import { IBeginningOfStringField } from '../../messaging/fields/beginning-of-string/beginning-of-string';
import { IBodyLengthField } from '../../messaging/fields/body-length/body-length';
import { CancelOrderRequestIdField } from '../../messaging/fields/cancel-order-request-id/cancel-order-request-id';
import { ClientOrderIdField } from '../../messaging/fields/client-order-id/client-order-id';
import { CommissionTypeField } from '../../messaging/fields/commission-type/commission-type';
import { CommissionField } from '../../messaging/fields/commission/commission';
import { CurrencyField, CURRENCY } from '../../messaging/fields/currency/currency';
import { FutureSettlementDateField } from '../../messaging/fields/future-settlement-date/future-settlement-date';
import { HandlingInstructionsField } from '../../messaging/fields/handling-instructions/handling-instructions';
import { IdSourceField } from '../../messaging/fields/id-source/id-source';
import { ListIdField } from '../../messaging/fields/list-id/list-id';
import { IMessageTypeField, MESSAGE_TYPE } from '../../messaging/fields/message-type/message-type';
import { OrderIdField } from '../../messaging/fields/order-id/order-id';
import { OrderQuantityField } from '../../messaging/fields/order-quantity/order-quantity';
import { isLimitOrder, OrderTypeField } from '../../messaging/fields/order-type/order-type';
import { PriceField } from '../../messaging/fields/price/price';
import { Rule80AField } from '../../messaging/fields/rule-80a/rule-80a';
import { SecurityIdField } from '../../messaging/fields/security-id/security-id';
import { SettlementTypeField, SETTLEMENT_TYPE } from '../../messaging/fields/settlement-type/settlement-type';
import { SideField } from '../../messaging/fields/side/side';
import { SymbolSuffixField } from '../../messaging/fields/symbol-suffix/symbol-suffix';
import { SymbolField } from '../../messaging/fields/symbol/symbol';
import { TextField } from '../../messaging/fields/text/text';
import { TimeInForceField, TIME_IN_FORCE } from '../../messaging/fields/time-in-force/time-in-force';
import {
    IOrderCancelRequestMessage, IProtoOrderCancelRequestMessage, OrderCancelRequestMessage,
    ProtoOrderCancelRequestMessage,
} from '../../messaging/messages/order-cancel-request';
import { BaseMessageBuilder, BUILDER_EVENT, IBaseMessageBuilder } from './base-message-builder';

export interface IOrderCancelRequestMessageBuilder extends IBaseMessageBuilder {
    message: IOrderCancelRequestMessage;
}

export class OrderCancelRequestMessageBuilder extends BaseMessageBuilder implements IOrderCancelRequestMessageBuilder {

    protected _message: IOrderCancelRequestMessage           = null;
    protected _protoMessage: IProtoOrderCancelRequestMessage = null;

    constructor() {
        super();

        this._protoMessage = new ProtoOrderCancelRequestMessage();
    }

    public get message(): IOrderCancelRequestMessage { return this._message; }

    //tslint:disable:cyclomatic-complexity
    public parseField(token: string): number {
        let rawDataLength = -1;

        const keyValue: string[] = token.split('=');
        const tag: Tag           = Number(keyValue[0]) as Tag;
        const rawValue: string   = keyValue[1];
        if (!rawValue) this.emitError();

        switch (tag) {
            case Tag.CxlOrdReqId:
                this._protoMessage[Tag.CxlOrdReqId] = new CancelOrderRequestIdField(rawValue);
                break;
            case Tag.OrderID:
                this._protoMessage[Tag.OrderID] = new OrderIdField(rawValue);
                break;
            case Tag.ClOrdID:
                this._protoMessage[Tag.ClOrdID] = new ClientOrderIdField(rawValue);
                break;
            case Tag.ListID:
                this._protoMessage[Tag.ListID] = new ListIdField(rawValue);
                break;
            case Tag.Account:
                this._protoMessage[Tag.Account] = new AccountField(rawValue);
                break;
            case Tag.SettlmntTyp:
                this._protoMessage[Tag.SettlmntTyp] = new SettlementTypeField(rawValue);
                break;
            case Tag.FutSettDate:
                this._protoMessage[Tag.FutSettDate] = new FutureSettlementDateField(rawValue);
                break;
            case Tag.HandlInst:
                this._protoMessage[Tag.HandlInst] = new HandlingInstructionsField(rawValue);
                break;
            case Tag.Symbol:
                this._protoMessage[Tag.Symbol] = new SymbolField(rawValue);
                break;
            case Tag.SymbolSfx:
                this._protoMessage[Tag.SymbolSfx] = new SymbolSuffixField(rawValue);
                break;
            case Tag.SecurityID:
                this._protoMessage[Tag.SecurityID] = new SecurityIdField(rawValue);
                break;
            case Tag.IDSource:
                this._protoMessage[Tag.IDSource] = new IdSourceField(rawValue);
                break;
            case Tag.Side:
                this._protoMessage[Tag.Side] = new SideField(rawValue);
                break;
            case Tag.OrderQty:
                this._protoMessage[Tag.OrderQty] = new OrderQuantityField(rawValue);
                break;
            case Tag.OrdType:
                this._protoMessage[Tag.OrdType] = new OrderTypeField(rawValue);
                break;
            case Tag.Price:
                this._protoMessage[Tag.Price] = new PriceField(rawValue);
                break;
            case Tag.Currency:
                this._protoMessage[Tag.Currency] = new CurrencyField(rawValue);
                break;
            case Tag.TimeInForce:
                this._protoMessage[Tag.TimeInForce] = new TimeInForceField(rawValue);
                break;
            case Tag.Commission:
                this._protoMessage[Tag.Commission] = new CommissionField(rawValue);
                break;
            case Tag.CommType:
                this._protoMessage[Tag.CommType] = new CommissionTypeField(rawValue);
                break;
            case Tag.Rule80A:
                this._protoMessage[Tag.Rule80A] = new Rule80AField(rawValue);
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

    //tslint:enable:cyclomatic-complexity

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
        this._protoMessage = new ProtoOrderCancelRequestMessage();
    }

    protected finalizeAndEmitMessage(): void {
        if (!this.validate()) this.emitError();

        const type    = MESSAGE_TYPE.order_cancel_request;
        const message = new OrderCancelRequestMessage(this._protoMessage);
        this.emit(BUILDER_EVENT.message_complete, { type, message });
        this._message = message;
    }

    /**
     * Validation rules:
     *
     *      Tag     Field Name          Required?   Comments
     *      ------------------------------------------------------------------------------------------------------------
     *              <Standard Header>   Y           MsgType = F
     *      101     CxlOrdReqId         Y           Unique ID of Cancel Request
     *      37      OrderID             N           Broker ID of original order
     *      11      ClOrdID             Y           Client ID of original order
     *      66      ListID              N           Required for List Orders
     *      1       Account             N
     *      63      SettlmntTyp         N           Absence of this field is interpreted as Regular.
     *      64      FutSettDate         N           Required when SettlmntTyp = 6 (Future) or SettlmntTyp = 8 (Sellers
     *                                              Option)
     *      21      HandlInst           Y
     *      55      Symbol              Y
     *      65      SymbolSfx           N
     *      48      SecurityID          N
     *      22      IDSource            N
     *      54      Side                Y
     *      38      OrderQty            Y
     *      40      OrdType             Y
     *      44      Price               N           Required for limit and stop OrdTypes
     *      15      Currency            N           Message without currency field is interpreted as US dollars
     *      59      TimeInForce         N           Absence of this field indicates Day order
     *      12      Commission          N
     *      13      CommType            N
     *      47      Rule80A             N
     *      58      Text                N
     *              <Standard Trailer>  Y
     *
     * @returns {boolean}
     */
    protected validate(): boolean {

        // Validate Header
        if (!this.validateHeader()) return false;

        // Verify MsgType
        if (this._protoMessage[Tag.MsgType].formatted !== MESSAGE_TYPE.order_cancel_request) return false;

        // Check CxlOrdReqId
        if (!this._protoMessage[Tag.CxlOrdReqId]) return false;

        // Check ClOrdID
        if (!this._protoMessage[Tag.ClOrdID]) return false;

        // Set SettlmntType to default is not present
        if (!this._protoMessage[Tag.SettlmntTyp]) {
            this._protoMessage[Tag.SettlmntTyp] = new SettlementTypeField(SETTLEMENT_TYPE.regular);
        }

        // Check FutSettDate
        if ((this._protoMessage[Tag.SettlmntTyp].formatted === SETTLEMENT_TYPE.future
             || this._protoMessage[Tag.SettlmntTyp].formatted === SETTLEMENT_TYPE.sellers_option)
            && !this._protoMessage[Tag.FutSettDate])
        {
            return false;
        }

        // Check HandlInst
        if (!this._protoMessage[Tag.HandlInst]) return false;

        // Check Symbol
        if (!this._protoMessage[Tag.Symbol]) return false;

        // Check Side
        if (!this._protoMessage[Tag.Side]) return false;

        // Check OrderQty
        if (!this._protoMessage[Tag.OrderQty]) return false;

        // Check OrdType
        if (!this._protoMessage[Tag.OrdType]) return false;

        // Check Price
        if (isLimitOrder(this._protoMessage[Tag.OrdType].formatted) && !this._protoMessage[Tag.Price]) return false;

        // Set Currency to default if not present
        if (!this._protoMessage[Tag.Currency]) {
            this._protoMessage[Tag.Currency] = new CurrencyField(CURRENCY.USD);
        }

        // Set TimeInForce to default if not present
        if (!this._protoMessage[Tag.TimeInForce]) {
            this._protoMessage[Tag.TimeInForce] = new TimeInForceField(TIME_IN_FORCE.day);
        }

        // Validate Trailer
        return this.validateTrailer();
    }
}
