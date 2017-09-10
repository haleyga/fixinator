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
import { IMessageTypeField, MESSAGE_TYPE } from '../../messaging/fields/message-type/message-type';
import { OrderQuantityField } from '../../messaging/fields/order-quantity/order-quantity';
import { isLimitOrder, isStopOrder, OrderTypeField } from '../../messaging/fields/order-type/order-type';
import { PriceField } from '../../messaging/fields/price/price';
import { ProcessCodeField } from '../../messaging/fields/process-code/process-code';
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
    INewOrderSingleMessage, IProtoNewOrderSingleMessage, NewOrderSingleMessage, ProtoNewOrderSingleMessage,
} from '../../messaging/messages/new-order-single';
import { BaseMessageBuilder, BUILDER_EVENT, IBaseMessageBuilder } from './base-message-builder';

export interface INewOrderSingleMessageBuilder extends IBaseMessageBuilder {
    message: INewOrderSingleMessage;
}

export class NewOrderSingleMessageBuilder extends BaseMessageBuilder implements INewOrderSingleMessageBuilder {

    protected _message: INewOrderSingleMessage           = null;
    protected _protoMessage: IProtoNewOrderSingleMessage = null;

    constructor() {
        super();

        this._protoMessage = new ProtoNewOrderSingleMessage();
    }

    public get message(): INewOrderSingleMessage { return this._message; }

    // tslint:disable:cyclomatic-complexity
    public parseField(token: string): number {
        let rawDataLength = -1;

        const keyValue: string[] = token.split('=');
        const tag: Tag           = Number(keyValue[0]) as Tag;
        const rawValue: string   = keyValue[1];
        let field                = null;
        if (!rawValue) this.emitError();

        switch (tag) {
            case Tag.ClOrdID:
                this._protoMessage[Tag.ClOrdID] = new ClientOrderIdField(rawValue);
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
            case Tag.ProcessCode:
                this._protoMessage[Tag.ProcessCode] = new ProcessCodeField(rawValue);
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
        this._protoMessage = new ProtoNewOrderSingleMessage();
    }

    protected finalizeAndEmitMessage(): void {
        if (!this.validate()) this.emitError();

        const type    = MESSAGE_TYPE.order_single;
        const message = new NewOrderSingleMessage(this._protoMessage);
        this.emit(BUILDER_EVENT.message_complete, { type, message });
        this._message = message;
    }

    /**
     * Validation rules:
     *
     *  The new order message type is used by institutions wishing to electronically submit orders to a broker for
     *  execution.
     *
     *  Orders can be submitted with special handling instructions and execution instructions. Handling instructions
     *  refer to how the broker should handle the order on its trading floor (see HandInst field). Execution
     *  instructions refer to how the order should be handled at the exchange (see ExecInst field).
     *
     *  The format for the new order message is as follows:
     *
     *      Tag     Field Name          Required?   Comments
     *      ------------------------------------------------------------------------------------------------------------
     *              <Standard Header>   Y           MsgType = D
     *      11      ClOrdID             Y
     *      1       Account             N
     *      63      SettlmntTyp         N           Absence of this field is interpreted as Regular.
     *      64      FutSettDate         N           Required when SettlmntTyp = 6 (Future) or SettlmntTyp = 8
     *                                              (Sellers Option)
     *      21      HandlInst           Y
     *      18      * ExecInst          N           Can be defined multiple times for complex orders.
     *      100     ExDestination       N
     *      81      ProcessCode         N           Used to identify soft trades at order entry.
     *      55      Symbol              Y
     *      65      SymbolSfx           N
     *      48      SecurityID          N
     *      22      IDSource            N
     *      54      Side                Y
     *      38      OrderQty            Y
     *      40      OrderType           Y
     *      44      Price               N           Required for limit OrdTypes
     *      99      StopPx              N           Required for stop OrdTypes
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
    // tslint:disable:cyclomatic-complexity
    protected validate(): boolean {

        // Validate Header
        if (!this.validateHeader()) return false;

        // Verify MsgType
        if (this._protoMessage[Tag.MsgType].formatted !== MESSAGE_TYPE.order_single) return false;

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
