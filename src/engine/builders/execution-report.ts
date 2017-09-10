import { AccountField } from '../../messaging/fields/account/account';
import { AveragePriceField } from '../../messaging/fields/average-price/average-price';
import { Tag } from '../../messaging/fields/base/tag';
import { IBeginningOfStringField } from '../../messaging/fields/beginning-of-string/beginning-of-string';
import { IBodyLengthField } from '../../messaging/fields/body-length/body-length';
import { ClientOrderIdField } from '../../messaging/fields/client-order-id/client-order-id';
import { CumulativeQuantityField } from '../../messaging/fields/cumulative-quantity/cumulative-quantity';
import { CURRENCY, CurrencyField } from '../../messaging/fields/currency/currency';
import { ExecutionIdField } from '../../messaging/fields/execution-id/execution-id';
import { ExecutionInstructionsField } from '../../messaging/fields/execution-instructions/execution-instructions';
import { ExecutionReferenceIdField } from '../../messaging/fields/execution-reference-id/execution-reference-id';
import {
    EXECUTION_TRANSACTION_TYPE,
    ExecutionTransactionTypeField,
} from '../../messaging/fields/execution-transaction-type/execution-transaction-type';
import { FutureSettlementDateField } from '../../messaging/fields/future-settlement-date/future-settlement-date';
import { IdSourceField } from '../../messaging/fields/id-source/id-source';
import { LastCapacityField } from '../../messaging/fields/last-capacity/last-capacity';
import { LastMarketField } from '../../messaging/fields/last-market/last-market';
import { LastPriceField } from '../../messaging/fields/last-price/last-price';
import { LastSharesField } from '../../messaging/fields/last-shares/last-shares';
import { ListIdField } from '../../messaging/fields/list-id/list-id';
import { IMessageTypeField, MESSAGE_TYPE } from '../../messaging/fields/message-type/message-type';
import { OrderIdField } from '../../messaging/fields/order-id/order-id';
import { OrderQuantityField } from '../../messaging/fields/order-quantity/order-quantity';
import { ORDER_STATUS, OrderStatusField } from '../../messaging/fields/order-status/order-status';
import { PriceField } from '../../messaging/fields/price/price';
import { Rule80AField } from '../../messaging/fields/rule-80a/rule-80a';
import { SecurityIdField } from '../../messaging/fields/security-id/security-id';
import { SETTLEMENT_TYPE, SettlementTypeField } from '../../messaging/fields/settlement-type/settlement-type';
import { SideField } from '../../messaging/fields/side/side';
import { StopPriceField } from '../../messaging/fields/stop-price/stop-price';
import { SymbolSuffixField } from '../../messaging/fields/symbol-suffix/symbol-suffix';
import { SymbolField } from '../../messaging/fields/symbol/symbol';
import { TextField } from '../../messaging/fields/text/text';
import { TIME_IN_FORCE, TimeInForceField } from '../../messaging/fields/time-in-force/time-in-force';
import { TransactionTimeField } from '../../messaging/fields/transaction-time/transaction-time';
import {
    ExecutionReportMessage,
    IExecutionReportMessage, IProtoExecutionReportMessage, ProtoExecutionReportMessage,
} from '../../messaging/messages/execution-report';
import { BaseMessageBuilder, BUILDER_EVENT, IBaseMessageBuilder } from './base-message-builder';
import { isStopOrder } from '../../messaging/fields/order-type/order-type';

export interface IExecutionReportMessageBuilder extends IBaseMessageBuilder {
    message: IExecutionReportMessage;
}

export class ExecutionReportMessageBuilder extends BaseMessageBuilder implements IExecutionReportMessageBuilder {

    protected _message: IExecutionReportMessage           = null;
    protected _protoMessage: IProtoExecutionReportMessage = null;

    constructor() {
        super();

        this._protoMessage = new ProtoExecutionReportMessage();
    }

    public get message(): IExecutionReportMessage { return this._message; }

    //tslint:disable:cyclomatic-complexity
    public parseField(token: string): number {
        let rawDataLength = -1;

        const keyValue: string[] = token.split('=');
        const tag: Tag           = Number(keyValue[0]) as Tag;
        const rawValue: string   = keyValue[1];
        let field                = null;
        if (!rawValue) this.emitError();

        switch (tag) {
            case Tag.OrderID:
                this._protoMessage[Tag.OrderID] = new OrderIdField(rawValue);
                break;
            case Tag.ClOrdID:
                this._protoMessage[Tag.ClOrdID] = new ClientOrderIdField(rawValue);
                break;
            case Tag.ListID:
                this._protoMessage[Tag.ListID] = new ListIdField(rawValue);
                break;
            case Tag.ExecID:
                this._protoMessage[Tag.ExecID] = new ExecutionIdField(rawValue);
                break;
            case Tag.ExecTransType:
                this._protoMessage[Tag.ExecTransType] = new ExecutionTransactionTypeField(rawValue);
                break;
            case Tag.ExecRefID:
                this._protoMessage[Tag.ExecRefID] = new ExecutionReferenceIdField(rawValue);
                break;
            case Tag.OrdStatus:
                this._protoMessage[Tag.OrdStatus] = new OrderStatusField(rawValue);
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
            case Tag.ExecInst:
                field = new ExecutionInstructionsField(rawValue);
                this._protoMessage[Tag.ExecInst]
                    ? this._protoMessage[Tag.ExecInst].push(field)
                    : this._protoMessage[Tag.ExecInst] = [field];
                break;
            case Tag.Rule80A:
                this._protoMessage[Tag.Rule80A] = new Rule80AField(rawValue);
                break;
            case Tag.LastShares:
                this._protoMessage[Tag.LastShares] = new LastSharesField(rawValue);
                break;
            case Tag.LastPX:
                this._protoMessage[Tag.LastPX] = new LastPriceField(rawValue);
                break;
            case Tag.LastMkt:
                this._protoMessage[Tag.LastMkt] = new LastMarketField(rawValue);
                break;
            case Tag.LastCapacity:
                this._protoMessage[Tag.LastCapacity] = new LastCapacityField(rawValue);
                break;
            case Tag.CumQty:
                this._protoMessage[Tag.CumQty] = new CumulativeQuantityField(rawValue);
                break;
            case Tag.AvgPx:
                this._protoMessage[Tag.AvgPx] = new AveragePriceField(rawValue);
                break;
            case Tag.TransactTime:
                this._protoMessage[Tag.TransactTime] = new TransactionTimeField(rawValue);
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
        this._protoMessage = new ProtoExecutionReportMessage();
    }

    protected finalizeAndEmitMessage(): void {
        if (!this.validate()) this.emitError();

        const type    = MESSAGE_TYPE.execution_report;
        const message = new ExecutionReportMessage(this._protoMessage);
        this.emit(BUILDER_EVENT.message_complete, { type, message });
        this._message = message;
    }

    /**
     * Validation rules:
     *
     *  The execution report message is used to:
     *      1. confirm the receipt of an order
     *      2. confirm changes to an existing order (i.e. accept cancel and replace requests)
     *      3. relay order status information
     *      4. relay fill information as orders are worked
     *
     *      Execution reports do not replace the end-of-day confirm. Execution reports are to be regarded only as
     *      replacements for the existing fill messages currently communicated via telephone.
     *
     *  Each execution message will contain information that will describe the current state of the order and execution
     *  status as understood by the broker.
     *
     *  Execution report messages can be transmitted as transaction types (ExecTranType) NEW, CANCEL, CORRECT or STATUS.
     *  Transaction types CANCEL and CORRECT modify the state of the message identified in field ExecRefID. Transaction
     *  type STATUS indicates that the execution message contains no new information, only summary information regarding
     *  order status.
     *      • The NEW transaction type indicates that this message represents a new order, a change in status of the
     *        order, or a new fill against an existing order. The combination of the ExecTransType and OrdStatus
     *        fields will indicate how the message is to be applied to an order.
     *      • The CANCEL transaction type applies at the execution level. The Cancel transaction will be used to
     *        cancel an execution which has been reported in error. The incorrect execution will be identified in
     *        the ExecRefID field.
     *      • The CORRECT transaction type applies at the execution level and is used to modify an incorrectly
     *        reported fill. The incorrect execution will be identified in the ExecRefID field. FYI: Data reported
     *        in the CumQty and AvgPx fields represent the status of the order as of the time of the correction, not
     *        as of the time of the originally reported execution.
     *
     *  The OrdStatus field is used to identify the status of the current order. The order statuses are as follows:
     *
     *      New                         Outstanding order with no executions
     *      Partially Filled            Outstanding order with executions and remaining quantity
     *      Filled                      Order completely filled, no remaining quantity
     *      Done                        Order not, or partially, filled; no further executions forthcoming
     *      Canceled                    Canceled order with or without executions
     *      Replaced                    Replaced order with or without executions
     *      Pending Cancel/Replace      Order with cancel request pending, used ot confirm receipt of cancel or replace
     *                                  request.  DOES NOT INDICATE THAT THE ORDER HAS BEEN CANCELED OR REPLACED.
     *      Stopped                     Order has been stopped at the exchange
     *      Rejected                    Order has been rejected by broker.  FYI: An order can be rejected subsequent to
     *                                  order acknowledgement, i.e. an order can pass from New to Rejected status.
     *
     *  FYI: The canceled and replaced order status are set in response to accepted cancel and replace requests. These
     *       requests are only acted upon when there is an outstanding order quantity. Requests to replace OrderQty to a
     *       level less than the LeavesQty will be rejected (OrderQty = CumQty + LeavesQty). Requests to change price on
     *       a filled order will be rejected (see Order Cancel Reject message type).
     *
     *  The field ClOrdID is provided for institutions to affix an identification number to an order to coincide with
     *  internal systems. The OrdId field is populated with a broker generated order number.
     *
     *  The execution report message format is as follows:
     *
     *      Tag     Field Name          Required?   Comments
     *      ------------------------------------------------------------------------------------------------------------
     *              <Standard Header>   Y           MsgType = 8
     *      37      OrderID             Y
     *      11      ClOrdID             N           Required for executions against electronically submitted orders
     *                                              which were assigned an ID by the institution. Not required for
     *                                              orders manually entered by the broker.
     *      66      ListID              N           Required for executions against orders which were submitted as
     *                                              part of a list.
     *      17      ExecID              Y
     *      20      ExecTransType       Y
     *      19      ExecRefID           N           Required for Cancel and Correct ExecTransType messages
     *      39      OrdStatus           Y
     *      103     OrdRejReason        N           For optional use with OrdStatus = 8 (Rejected)
     *      1       Account             N           Required for executions against electronically submitted orders
     *                                              which were assigned an account by the institution
     *      63      SettlmntTyp         N           Absence of this field is interpreted as Regular.
     *      64      FutSettDate         N           Required when SettlmntTyp = 6 (Future) or SettlmntTyp = 8
     *                                              (Sellers Option)
     *      55      Symbol              Y
     *      65      SymbolSfx           N
     *      48      SecurityID          N
     *      22      IDSource            N
     *      54      Side                Y
     *      38      OrderQty            Y
     *      44      Price               N
     *      99      StopPx              N           Required for OrdType = 4 (Stop Limit).
     *      15      Currency            N           Message without currency field is interpreted as US dollars
     *      59      TimeInForce         N           Absence of this field indicates Day order
     *      18      * ExecInst          N           May be defined repeated times in a single message to indicate
     *                                              multiple instructions
     *      47      Rule80A             N
     *      32      LastShares          Y           Not required for OrdStatus = 0 (New) or ExecTransType = 3 (Status)
     *      31      LastPx              Y           Not required for OrdStatus = 0 (New) or ExecTransType = 3 (Status)
     *      30      LastMkt             N
     *      29      LastCapacity        N
     *      14      CumQty              Y           Not required for OrdStatus = 0 (New)
     *      6       AvgPx               Y           Not required for OrdStatus = 0 (New)
     *      60      TransactTime        N
     *      58      Text                N
     *              <Standard Trailer>  Y
     *
     * @returns {boolean}
     */
    //tslint:disable:cyclomatic-complexity
    protected validate(): boolean {
        super.validate();

        // Check OrderID
        if (!this._protoMessage[Tag.OrderID]) return false;

        // Check ExecID
        if (!this._protoMessage[Tag.ExecID]) return false;

        // Check ExecTransType
        if (!this._protoMessage[Tag.ExecTransType]) return false;

        // Check ExecRefID
        const type = this._protoMessage[Tag.ExecTransType].formatted;
        if ((type === EXECUTION_TRANSACTION_TYPE.cancel || type === EXECUTION_TRANSACTION_TYPE.correct)
            && !this._protoMessage[Tag.ExecRefID])
        {
            return false;
        }

        // Check OrdStatus
        if (!this._protoMessage[Tag.OrdStatus]) return false;

        // Set SettlmntTyp to default if not present
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

        // This check is strange in the documentation because the Execution Report message does not include the OrdType
        // if (isStopOrder(this._protoMessage[Tag.OrdType].formatted) && !this._protoMessage[Tag.StopPx]) return false;

        // Set Currency to default if not present
        if (!this._protoMessage[Tag.Currency]) {
            this._protoMessage[Tag.Currency] = new CurrencyField(CURRENCY.USD);
        }

        // Set TimeInForce to default if not present
        if (!this._protoMessage[Tag.TimeInForce]) {
            this._protoMessage[Tag.TimeInForce] = new TimeInForceField(TIME_IN_FORCE.day);
        }

        // Check LastShares
        if (!this._protoMessage[Tag.LastShares]
            && (this._protoMessage[Tag.OrdStatus].formatted !== ORDER_STATUS.new
                || this._protoMessage[Tag.ExecTransType].formatted !== EXECUTION_TRANSACTION_TYPE.status))
        {
            return false;
        }

        // Check LastPX
        if (!this._protoMessage[Tag.LastPX]
            && (this._protoMessage[Tag.OrdStatus].formatted !== ORDER_STATUS.new
                || this._protoMessage[Tag.ExecTransType].formatted !== EXECUTION_TRANSACTION_TYPE.status))
        {
            return false;
        }

        // Check CumQty
        if (!this._protoMessage[Tag.CumQty] && this._protoMessage[Tag.OrdStatus].formatted !== ORDER_STATUS.new) {
            return false;
        }

        // Check AvgPx
        if (!this._protoMessage[Tag.AvgPx] && this._protoMessage[Tag.OrdStatus].formatted !== ORDER_STATUS.new) {
            return false;
        }

        // TODO: Verify CheckSum

        return true;
    }

    //tslint:enable:cyclomatic-complexity
}
