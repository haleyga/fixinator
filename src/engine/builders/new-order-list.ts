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
import {
    ListExecutionInstructionsField,
} from '../../messaging/fields/list-execution-instructions/list-execution-instructions';
import { ListIdField } from '../../messaging/fields/list-id/list-id';
import { ListNumberOfOrdersField } from '../../messaging/fields/list-number-of-orders/list-number-of-orders';
import { ListSequenceNumberField } from '../../messaging/fields/list-sequence-number/list-sequence-number';
import { IMessageTypeField, MESSAGE_TYPE } from '../../messaging/fields/message-type/message-type';
import { OrderQuantityField } from '../../messaging/fields/order-quantity/order-quantity';
import { isLimitOrder, isStopOrder, OrderTypeField } from '../../messaging/fields/order-type/order-type';
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
import { INewOrderListMessage } from '../../messaging/messages/new-order-list';
import {
    IProtoNewOrderListMessage, NewOrderListMessage, ProtoNewOrderListMessage,
} from '../../messaging/messages/new-order-list';
import { FixinatorDate } from '../../util/datetime';
import { BaseMessageBuilder, BUILDER_EVENT, IBaseMessageBuilder } from './base-message-builder';

export interface INewOrderListMessageBuilder extends IBaseMessageBuilder {
    message: INewOrderListMessage;
}

export class NewOrderListMessageBuilder extends BaseMessageBuilder implements INewOrderListMessageBuilder {

    // These private members track state across multiple messages.  Do not reset them when resetting the builder.
    private _sizeOfCurrentSet: number             = null;
    private _numberOfListsReceived: number        = null;
    private _lastListSequence: number             = null;
    private _listIdMap: { [key: string]: number } = null;

    protected _message: INewOrderListMessage           = null;
    protected _protoMessage: IProtoNewOrderListMessage = null;

    constructor() {
        super();

        this._sizeOfCurrentSet      = 0;
        this._numberOfListsReceived = 0;
        this._lastListSequence      = 0;
        this._listIdMap             = {};
        this._protoMessage          = new ProtoNewOrderListMessage();
    }

    public get message(): INewOrderListMessage { return this._message; }

    // tslint:disable:cyclomatic-complexity
    public parseField(token: string): number {
        let rawDataLength = -1;

        const keyValue: string[] = token.split('=');
        const tag: Tag           = Number(keyValue[0]) as Tag;
        const rawValue: string   = keyValue[1];
        let field                = null;
        if (!rawValue) this.emitError();

        switch (tag) {
            case Tag.ListID:
                this._protoMessage[Tag.ListID] = new ListIdField(rawValue);
                break;
            case Tag.ListSeqNo:
                this._protoMessage[Tag.ListSeqNo] = new ListSequenceNumberField(rawValue);
                break;
            case Tag.ListNoOrds:
                this._protoMessage[Tag.ListNoOrds] = new ListNumberOfOrdersField(rawValue);
                break;
            case Tag.ListExecInst:
                this._protoMessage[Tag.ListExecInst] = new ListExecutionInstructionsField(rawValue);
                break;
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
        this._protoMessage = new ProtoNewOrderListMessage();
    }

    protected finalizeAndEmitMessage(): void {
        if (!this.validate()) this.emitError();

        const type    = MESSAGE_TYPE.order_list;
        const message = new NewOrderListMessage(this._protoMessage);
        this.emit(BUILDER_EVENT.message_complete, { type, message });
        this._message = message;
    }

    /**
     * Validation rules:
     *
     *  The new order list message type is used by institutions wishing to electronically submit lists of related orders
     *  to a broker for execution.
     *
     *  The New Order List is intended for use in staging lists to be executed by the broker. If the institution
     *  wishes to work a list using the broker's execution services the orders should be submitted as individual New
     *  Order - Single's.
     *
     *  After staging, the list can be operated on in the following ways:
     *
     *   Execute: The broker can be instructed to release the list for execution by sending the List- Execute message.
     *
     *   Cancel: After the list has been staged with the broker, it can be cancelled via the submission of the List
     *           Cancel message. If the list has not yet been submitted for execution, the List Cancel message will
     *           instruct the broker not to execute it, if the list is being executed, the List Cancel message should
     *           trigger the broker's system to generate cancel requests for the remaining quantities of each order
     *           within the list. Individual orders within the list can be cancelled via the Order Cancel Request
     *           message.
     *
     *   Status: A status of the list can requested via the submission of the List-Status Request message. The
     *           broker will respond with one or more List-Status messages which will report executed quantity,
     *           cancelled quantity and average price for each order in the list.
     *
     *   Replace: Individual orders within the list can be replaced via Order Cancel/Replace Request messages.
     *
     *  Executions against orders within the list will not normally be reported as they occur. (If this feature is
     *  desired the institution and broker should arrange for this reporting as a custom feature using the Execution
     *  message.) Executions against the list will be reported within the List-Status message.
     *
     *  The format for the new order list message is as follows:
     *
     *      Tag     Field Name          Required?   Comments
     *      ------------------------------------------------------------------------------------------------------------
     *              <Standard Header>   Y           MsgType = E
     *      66      ListID              Y           Must be unique, by customer, for the day
     *      67      ListSeqNo           Y
     *      68      ListNoOrds          Y
     *      69      ListExecInst        N           Include only in ListSeqNo = 1 message
     *      11      ClOrdID             Y
     *      1       Account             N
     *      63      SettlmntTyp         N           Absence of this field is interpreted as Regular.
     *      64      FutSettDate         N           Required when SettlmntTyp = 6 (Future) or SettlmntTyp = 8
     *                                              (Sellers Option)
     *      21      HandlInst           Y
     *      18      * ExecInst          N           Can be defined multiple times for complex orders.
     *      100     ExDestination       N
     *      55      Symbol              Y
     *      65      SymbolSfx           N
     *      48      SecurityID          N
     *      22      IDSource            N
     *      54      Side                Y
     *      38      OrderQty            Y
     *      40      OrdType             Y
     *      44      Price               N           Required for limit OrdTypes
     *      99      StopPx              N           Required for stop OrdTypes
     *      15      Currency            N           Message without currency field is interpreted as US dollars
     *      59      TimeInForce         N           Absence of the field indicates Day order
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
        super.validate();

        if (this._sizeOfCurrentSet === 0) {
            this._sizeOfCurrentSet = this._protoMessage[Tag.ListNoOrds].formatted;
        } else if (this._protoMessage[Tag.ListSeqNo].formatted !== this._lastListSequence + 1) {
            return false;
        } else if (this._numberOfListsReceived + 1 > this._sizeOfCurrentSet) {
            return false;
        } else if (this._numberOfListsReceived + 1 === this._sizeOfCurrentSet) {
            this._sizeOfCurrentSet      = 0;
            this._numberOfListsReceived = 0;
            this._lastListSequence      = 0;
        } else {
            this._numberOfListsReceived++;
            this._lastListSequence = this._protoMessage[Tag.ListSeqNo].formatted;
        }

        // Each builder is unique to a session, so the stipulation that the ListID be unique per customer is taken
        // care of by default.  We just need to check the map to ensure the ID itself has not been used today.
        const listId = this._protoMessage[Tag.ListID].formatted;
        if (this._listIdMap[listId] > FixinatorDate.getThisTimeYesterday()) {
            return false;
        } else {
            this._listIdMap[listId] = Date.now();
        }

        if (this._protoMessage[Tag.ListExecInst] && this._protoMessage[Tag.ListSeqNo].formatted > 1) return false;

        if (!this._protoMessage[Tag.SettlmntTyp]) {
            this._protoMessage[Tag.SettlmntTyp] = new SettlementTypeField(SETTLEMENT_TYPE.regular);
        }

        if ((this._protoMessage[Tag.SettlmntTyp].formatted === SETTLEMENT_TYPE.future
             || this._protoMessage[Tag.SettlmntTyp].formatted === SETTLEMENT_TYPE.sellers_option)
            && !this._protoMessage[Tag.FutSettDate])
        {
            return false;
        }

        // Ensure execution instructions align with handling instructions.
        const handlingInstruction   = this._protoMessage[Tag.HandlInst].formatted;
        const applicabilityFunction = handlingInstruction === HANDLING_INSTRUCTIONS.manual_order_best_execution
            ? isApplicableToManualOrder
            : isApplicableToDotOrder;

        for (const instruction of this._protoMessage[Tag.ExecInst]) {
            if (!applicabilityFunction(instruction.formatted)) return false;
        }

        if (isLimitOrder(this._protoMessage[Tag.OrdType].formatted) && !this._protoMessage[Tag.Price]) return false;
        if (isStopOrder(this._protoMessage[Tag.OrdType].formatted) && !this._protoMessage[Tag.StopPx]) return false;

        if (!this._protoMessage[Tag.Currency]) {
            this._protoMessage[Tag.Currency] = new CurrencyField(CURRENCY.USD);
        }

        if (!this._protoMessage[Tag.TimeInForce]) {
            this._protoMessage[Tag.TimeInForce] = new TimeInForceField(TIME_IN_FORCE.day);
        }

        // TODO: Verify CheckSum

        return true;
    }

    // tslint:enable:cyclomatic-complexity
}
