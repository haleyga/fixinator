import { AccountField } from '../../messaging/fields/account/account';
import { Tag } from '../../messaging/fields/base/tag';
import { IBeginningOfStringField } from '../../messaging/fields/beginning-of-string/beginning-of-string';
import { IBodyLengthField } from '../../messaging/fields/body-length/body-length';
import { ClientOrderIdField } from '../../messaging/fields/client-order-id/client-order-id';
import { CommissionTypeField } from '../../messaging/fields/commission-type/commission-type';
import { CommissionField } from '../../messaging/fields/commission/commission';
import { CurrencyField, CURRENCY } from '../../messaging/fields/currency/currency';
import { ExecutionDestinationField } from '../../messaging/fields/execution-destination/execution-destination';
import {
    isApplicableToDotOrder, isApplicableToManualOrder, ExecutionInstructionsField,
} from '../../messaging/fields/execution-instructions/execution-instructions';
import { FutureSettlementDateField } from '../../messaging/fields/future-settlement-date/future-settlement-date';
import {
    HandlingInstructionsField, HANDLING_INSTRUCTIONS,
} from '../../messaging/fields/handling-instructions/handling-instructions';
import { IdSourceField } from '../../messaging/fields/id-source/id-source';
import { ListIdField } from '../../messaging/fields/list-id/list-id';
import { IMessageTypeField, MESSAGE_TYPE } from '../../messaging/fields/message-type/message-type';
import { OrderIdField } from '../../messaging/fields/order-id/order-id';
import { OrderQuantityField } from '../../messaging/fields/order-quantity/order-quantity';
import { isLimitOrder, isStopOrder, OrderTypeField } from '../../messaging/fields/order-type/order-type';
import { OriginalClientOrderIdField } from '../../messaging/fields/original-client-order-id/original-client-order-id';
import { PriceField } from '../../messaging/fields/price/price';
import { Rule80AField } from '../../messaging/fields/rule-80a/rule-80a';
import { SecurityIdField } from '../../messaging/fields/security-id/security-id';
import { SettlementTypeField, SETTLEMENT_TYPE } from '../../messaging/fields/settlement-type/settlement-type';
import { SideField } from '../../messaging/fields/side/side';
import { StopPriceField } from '../../messaging/fields/stop-price/stop-price';
import { SymbolSuffixField } from '../../messaging/fields/symbol-suffix/symbol-suffix';
import { SymbolField } from '../../messaging/fields/symbol/symbol';
import { TextField } from '../../messaging/fields/text/text';
import { TimeInForceField, TIME_IN_FORCE } from '../../messaging/fields/time-in-force/time-in-force';
import {
    IOrderCancelReplaceRequestMessage, IProtoOrderCancelReplaceRequestMessage, OrderCancelReplaceRequestMessage,
    ProtoOrderCancelReplaceRequestMessage,
} from '../../messaging/messages/order-cancel-replace-request';
import { BaseMessageBuilder, BUILDER_EVENT, IBaseMessageBuilder } from './base-message-builder';

export interface IOrderCancelReplaceRequestMessageBuilder extends IBaseMessageBuilder {
    message: IOrderCancelReplaceRequestMessage;
}

export class OrderCancelReplaceRequestMessageBuilder extends BaseMessageBuilder
    implements IOrderCancelReplaceRequestMessageBuilder {

    protected _message: IOrderCancelReplaceRequestMessage           = null;
    protected _protoMessage: IProtoOrderCancelReplaceRequestMessage = null;

    public get message(): IOrderCancelReplaceRequestMessage { return this._message; }

    // tslint:disable:cyclomatic-complexity
    public parseField(token: string): number {
        let rawDataLength = -1;

        const keyValue: string[] = token.split('=');
        const tag: Tag           = Number(keyValue[0]) as Tag;
        const rawValue: string   = keyValue[1];
        let field                = null;
        if (!rawValue) this.emitError();

        switch (tag) {
            case Tag.OrderID:
                this._protoMessage[Tag.ClOrdID] = new OrderIdField(rawValue);
                break;
            case Tag.OrigClOrdID:
                this._protoMessage[Tag.OrigClOrdID] = new OriginalClientOrderIdField(rawValue);
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
            case Tag.ExecInst:
                field = new ExecutionInstructionsField(rawValue);
                this._protoMessage[Tag.ExecInst]
                    ? this._protoMessage[Tag.ExecInst].push(field)
                    : this._protoMessage[Tag.ExecInst] = [field];
                break;
            case Tag.ExDestination:
                this._protoMessage[Tag.ExDestination] = new ExecutionDestinationField(rawValue);
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
            case Tag.StopPx:
                this._protoMessage[Tag.StopPx] = new StopPriceField(rawValue);
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

    // tslint:enable:cyclomatic-complexity

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
        this._protoMessage = new ProtoOrderCancelReplaceRequestMessage();
    }

    protected finalizeAndEmitMessage(): void {
        if (!this.validate()) this.emitError();

        const type    = MESSAGE_TYPE.order_cancel_replace_request;
        const message = new OrderCancelReplaceRequestMessage(this._protoMessage);
        this.emit(BUILDER_EVENT.message_complete, { type, message });
        this._message = message;
    }

    /**
     * Validation rules:
     *
     *  The order cancel/replace request is used to change the parameters of an existing order.
     *
     *  Do not use this message to cancel the remaining quantity of an outstanding order, use the Cancel Request for
     *  this purpose.
     *
     *  The request will only be accepted if the order can successfully be pulled back from the exchange floor without
     *  executing.
     *
     *  Only a limited number of fields can be changed via the cancel/replace request message. These fields are:
     *      • ExecInst
     *      • OrderQty
     *      • OrdPx
     *      • TimeInForce
     *
     *  The format of the cancel request message is:
     *
     *      Tag     Field Name          Required?   Comments
     *      ------------------------------------------------------------------------------------------------------------
     *              <Standard Header>   Y           MsgType = G
     *      37      OrderID             N           Unique identifier of original order as assigned by broker
     *      41      OrigClOrdID         Y           Unique identifier of original order as assigned by institution.
     *      11      ClOrdID             Y           Unique identifier of replacement order as assigned by institution
     *      66      ListID              N           Required for List Orders
     *      1       Account             N
     *      63      SettlmntTyp         N           Absence of this field is interpreted as Regular.
     *      64      FutSettDate         N           Required when SettlmntTyp = 6 (Future) or SettlmntTyp = 8 (Sellers
     *                                              Option)
     *      21      HandlInst           Y           Must match original order
     *      18      * ExecInst          N           Can be defined multiple times for complex orders. Replacement order
     *                                              will be created with new parameters (i.e. original order values
     *                                              will not be brought forward to replacement order unless
     *                                              redefined within this message).
     *      100     ExDestination       N
     *      55      Symbol              Y           Must match original order
     *      65      SymbolSfx           N
     *      48      SecurityID          N           Must match original order
     *      22      IDSource            N           Must match original order
     *      54      Side                Y           Must match original side, however, Buy and Buy Minus can be
     *                                              interchanged as well as Sell and Sell Plus
     *      38      OrderQty            Y
     *      40      OrdType             Y
     *      44      Price               N           Required for limit OrdTypes
     *      99      StopPx              N           Required for stop OrdTypes
     *      15      Currency            N           Message without currency field is interpreted as US dollars.
     *                                              Must match original order.
     *      59      TimeInForce         N           Absence of this field indicates Day order
     *      12      Commission          N
     *      13      CommType            N
     *      47      Rule80A             N           Must match original order
     *      58      Text                N
     *              <Standard Trailer>  Y
     *
     * @returns {boolean}
     */
    // tslint:disable:cyclomatic-complexity
    protected validate(): boolean {

        // Validate Header
        if (!this.validateHeader()) return false;

        // Verify MsgType
        if (this._protoMessage[Tag.MsgType].formatted !== MESSAGE_TYPE.order_cancel_replace_request) return false;

        // Check OrigClOrdID
        if (!this._protoMessage[Tag.OrigClOrdID]) return false;

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

        // Ensure execution instructions align with handling instructions.
        const handlingInstruction   = this._protoMessage[Tag.HandlInst].formatted;
        const applicabilityFunction = handlingInstruction === HANDLING_INSTRUCTIONS.manual_order_best_execution
            ? isApplicableToManualOrder
            : isApplicableToDotOrder;

        for (const instruction of this._protoMessage[Tag.ExecInst]) {
            if (!applicabilityFunction(instruction.formatted)) return false;
        }

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

        // Check StopPx
        if (isStopOrder(this._protoMessage[Tag.OrdType].formatted) && !this._protoMessage[Tag.StopPx]) return false;

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

    // tslint:enable:cyclomatic-complexity
}
