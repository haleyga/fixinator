import { IAccountField } from '../fields/account/account';
import { IAveragePriceField } from '../fields/average-price/average-price';
import { Tag } from '../fields/base/tag';
import { IClientOrderIdField } from '../fields/client-order-id/client-order-id';
import { ICumulativeQuantityField } from '../fields/cumulative-quantity/cumulative-quantity';
import { ICurrencyField } from '../fields/currency/currency';
import { IExecutionIdField } from '../fields/execution-id/execution-id';
import { IExecutionInstructionsField } from '../fields/execution-instructions/execution-instructions';
import { IExecutionReferenceIdField } from '../fields/execution-reference-id/execution-reference-id';
import { IExecutionTransactionTypeField } from '../fields/execution-transaction-type/execution-transaction-type';
import { IFutureSettlementDateField } from '../fields/future-settlement-date/future-settlement-date';
import { IIdSourceField } from '../fields/id-source/id-source';
import { ILastCapacityField } from '../fields/last-capacity/last-capacity';
import { ILastMarketField } from '../fields/last-market/last-market';
import { ILastPriceField } from '../fields/last-price/last-price';
import { ILastSharesField } from '../fields/last-shares/last-shares';
import { IListIdField } from '../fields/list-id/list-id';
import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import { IOrderIdField } from '../fields/order-id/order-id';
import { IOrderQuantityField } from '../fields/order-quantity/order-quantity';
import { IOrderRejectionReasonField } from '../fields/order-rejection-reason/order-rejection-reason';
import { IOrderStatusField } from '../fields/order-status/order-status';
import { IPriceField } from '../fields/price/price';
import { IRule80AField } from '../fields/rule-80a/rule-80a';
import { ISecurityIdField } from '../fields/security-id/security-id';
import { ISettlementTypeField } from '../fields/settlement-type/settlement-type';
import { ISideField } from '../fields/side/side';
import { IStopPriceField } from '../fields/stop-price/stop-price';
import { ISymbolSuffixField } from '../fields/symbol-suffix/symbol-suffix';
import { ISymbolField } from '../fields/symbol/symbol';
import { ITextField } from '../fields/text/text';
import { ITimeInForceField } from '../fields/time-in-force/time-in-force';
import { ITransactionTimeField } from '../fields/transaction-time/transaction-time';
import {
    BaseApplicationMessage, IBaseApplicationMessage, IProtoBaseApplicationMessage, ProtoBaseApplicationMessage,
} from './base-application-message';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoExecutionReportMessage extends IProtoBaseApplicationMessage {
    37: IOrderIdField;
    11?: IClientOrderIdField;
    66?: IListIdField;
    17: IExecutionIdField;
    20: IExecutionTransactionTypeField;
    19?: IExecutionReferenceIdField;
    39: IOrderStatusField;
    103?: IOrderRejectionReasonField;
    1?: IAccountField;
    63?: ISettlementTypeField;
    64?: IFutureSettlementDateField;
    55: ISymbolField;
    65?: ISymbolSuffixField;
    48?: ISecurityIdField;
    22?: IIdSourceField;
    54: ISideField;
    38: IOrderQuantityField;
    44?: IPriceField;
    99?: IStopPriceField;
    15?: ICurrencyField;
    59?: ITimeInForceField;
    18?: IExecutionInstructionsField[];
    47?: IRule80AField;
    32: ILastSharesField;
    31: ILastPriceField;
    30?: ILastMarketField;
    29?: ILastCapacityField;
    14: ICumulativeQuantityField;
    6: IAveragePriceField;
    60?: ITransactionTimeField;
    58?: ITextField;
}

//tslint:enable:no-magic-numbers

export class ProtoExecutionReportMessage extends ProtoBaseApplicationMessage implements IProtoExecutionReportMessage {
    public 37: IOrderIdField                  = null;
    public 17: IExecutionIdField              = null;
    public 20: IExecutionTransactionTypeField = null;
    public 39: IOrderStatusField              = null;
    public 55: ISymbolField                   = null;
    public 54: ISideField                     = null;
    public 38: IOrderQuantityField            = null;
    public 32: ILastSharesField               = null;
    public 31: ILastPriceField                = null;
    public 14: ICumulativeQuantityField       = null;
    public 6: IAveragePriceField              = null;
}

export interface IExecutionReportMessage extends IBaseApplicationMessage {
    orderId: IOrderIdField;
    clOrdId?: IClientOrderIdField;
    listId?: IListIdField;
    execId?: IExecutionIdField;
    execTransType: IExecutionTransactionTypeField;
    execRefId?: IExecutionReferenceIdField;
    ordStatus: IOrderStatusField;
    ordRejReason?: IOrderRejectionReasonField;
    account?: IAccountField;
    settlmntTyp?: ISettlementTypeField;
    futSettDate?: IFutureSettlementDateField;
    symbol: ISymbolField;
    symbolSfx?: ISymbolSuffixField;
    securityId?: ISecurityIdField;
    idSource?: IIdSourceField;
    side: ISideField;
    orderQty: IOrderQuantityField;
    price?: IPriceField;
    stopPx?: IStopPriceField;
    currency?: ICurrencyField;
    timeInForce?: ITimeInForceField;
    execInst?: IExecutionInstructionsField[];
    rule80A?: IRule80AField;
    lastShares: ILastSharesField;
    lastPx: ILastPriceField;
    lastMkt?: ILastMarketField;
    lastCapacity?: ILastCapacityField;
    cumQty: ICumulativeQuantityField;
    avgPx: IAveragePriceField;
    transactTime?: ITransactionTimeField;
    text?: ITextField;
}

/**
 * The execution report message is used to:
 *  1. confirm the receipt of an order
 *  2. confirm changes to an existing order (i.e. accept cancel and replace requests)
 *  3. relay order status information
 *  4. relay fill information as orders are worked
 *
 *  Execution reports do not replace the end-of-day confirm. Execution reports are to be regarded only as
 *  replacements for the existing fill messages currently communicated via telephone.
 *
 * Each execution message will contain information that will describe the current state of the order and execution
 * status as understood by the broker.
 *
 * Execution report messages can be transmitted as transaction types (ExecTranType) NEW, CANCEL, CORRECT or STATUS.
 * Transaction types CANCEL and CORRECT modify the state of the message identified in field ExecRefID. Transaction
 * type STATUS indicates that the execution message contains no new information, only summary information regarding
 * order status.
 *  • The NEW transaction type indicates that this message represents a new order, a change in status of the order, or
 *    a new fill against an existing order. The combination of the ExecTransType and OrdStatus fields will indicate
 *    how the message is to be applied to an order.
 *  • The CANCEL transaction type applies at the execution level. The Cancel transaction will be used to cancel an
 *    execution which has been reported in error. The incorrect execution will be identified in the ExecRefID field.
 *  • The CORRECT transaction type applies at the execution level and is used to modify an incorrectly reported fill.
 *    The incorrect execution will be identified in the ExecRefID field. FYI: Data reported in the CumQty and AvgPx
 *    fields represent the status of the order as of the time of the correction, not as of the time of the
 *    originally reported execution.
 *
 * The OrdStatus field is used to identify the status of the current order. The order statuses are as follows:
 *
 *  New                         Outstanding order with no executions
 *  Partially Filled            Outstanding order with executions and remaining quantity
 *  Filled                      Order completely filled, no remaining quantity
 *  Done                        Order not, or partially, filled; no further executions forthcoming
 *  Canceled                    Canceled order with or without executions
 *  Replaced                    Replaced order with or without executions
 *  Pending Cancel/Replace      Order with cancel request pending, used ot confirm receipt of cancel or replace
 *                              request.  DOES NOT INDICATE THAT THE ORDER HAS BEEN CANCELED OR REPLACED.
 *  Stopped                     Order has been stopped at the exchange
 *  Rejected                    Order has been rejected by broker.  FYI: An order can be rejected subsequent to
 *                              order acknowledgement, i.e. an order can pass from New to Rejected status.
 *
 * FYI: The canceled and replaced order status are set in response to accepted cancel and replace requests. These
 *      requests are only acted upon when there is an outstanding order quantity. Requests to replace OrderQty to a
 *      level less than the LeavesQty will be rejected (OrderQty = CumQty + LeavesQty). Requests to change price on
 *      a filled order will be rejected (see Order Cancel Reject message type).
 *
 * The field ClOrdID is provided for institutions to affix an identification number to an order to coincide with
 * internal systems. The OrdId field is populated with a broker generated order number.
 *
 * The execution report message format is as follows:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = 8
 *  37      OrderID             Y
 *  11      ClOrdID             N           Required for executions against electronically submitted orders which
 *                                          were assigned an ID by the institution. Not required for orders manually
 *                                          entered by the broker.
 *  66      ListID              N           Required for executions against orders which were submitted as part of a
 *                                          list.
 *  17      ExecID              Y
 *  20      ExecTransType       Y
 *  19      ExecRefID           N           Required for Cancel and Correct ExecTransType messages
 *  39      OrdStatus           Y
 *  103     OrdRejReason        N           For optional use with OrdStatus = 8 (Rejected)
 *  1       Account             N           Required for executions against electronically submitted orders which
 *                                          were assigned an account by the institution
 *  63      SettlmntTyp         N           Absence of this field is interpreted as Regular.
 *  64      FutSettDate         N           Required when SettlmntTyp = 6 (Future) or SettlmntTyp = 8 (Sellers Option)
 *  55      Symbol              Y
 *  65      SymbolSfx           N
 *  48      SecurityID          N
 *  22      IDSource            N
 *  54      Side                Y
 *  38      OrderQty            Y
 *  44      Price               N
 *  99      StopPx              N           Required for OrdType = 4 (Stop Limit).
 *  15      Currency            N           Message without currency field is interpreted as US dollars
 *  59      TimeInForce         N           Absence of this field indicates Day order
 *  18      ExecInst            N           May be defined repeated times in a single message to indicate multiple
 *                                          instructions
 *  47      Rule80A             N
 *  32      LastShares          Y           Not required for OrdStatus = 0 (New) or ExecTransType = 3 (Status)
 *  31      LastPx              Y           Not required for OrdStatus = 0 (New) or ExecTransType = 3 (Status)
 *  30      LastMkt             N
 *  29      LastCapacity        N
 *  14      CumQty              Y           Not required for OrdStatus = 0 (New)
 *  6       AvgPx               Y           Not required for OrdStatus = 0 (New)
 *  60      TransactTime        N
 *  58      Text                N
 *          <Standard Trailer>  Y
 */
export class ExecutionReportMessage extends BaseApplicationMessage implements IExecutionReportMessage {

    private _orderId: IOrderIdField                        = null;
    private _clOrdId: IClientOrderIdField                  = null;
    private _listId: IListIdField                          = null;
    private _execId: IExecutionIdField                     = null;
    private _execTransType: IExecutionTransactionTypeField = null;
    private _execRefId: IExecutionReferenceIdField         = null;
    private _ordStatus: IOrderStatusField                  = null;
    private _ordRejReason: IOrderRejectionReasonField      = null;
    private _account: IAccountField                        = null;
    private _settlmntTyp: ISettlementTypeField             = null;
    private _futSettDate: IFutureSettlementDateField       = null;
    private _symbol: ISymbolField                          = null;
    private _symbolSfx: ISymbolSuffixField                 = null;
    private _securityId: ISecurityIdField                  = null;
    private _idSource: IIdSourceField                      = null;
    private _side: ISideField                              = null;
    private _orderQty: IOrderQuantityField                 = null;
    private _price: IPriceField                            = null;
    private _stopPx: IStopPriceField                       = null;
    private _currency: ICurrencyField                      = null;
    private _timeInForce: ITimeInForceField                = null;
    private _execInst: IExecutionInstructionsField[]       = null;
    private _rule80A: IRule80AField                        = null;
    private _lastShares: ILastSharesField                  = null;
    private _lastPx: ILastPriceField                       = null;
    private _lastMkt: ILastMarketField                     = null;
    private _lastCapacity: ILastCapacityField              = null;
    private _cumQty: ICumulativeQuantityField              = null;
    private _avgPx: IAveragePriceField                     = null;
    private _transactTime: ITransactionTimeField           = null;
    private _text: ITextField                              = null;

    constructor(protoMessage: IProtoExecutionReportMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    // Body Fields

    public get orderId(): IOrderIdField { return this._orderId; }

    public get clOrdId(): IClientOrderIdField { return this._clOrdId; }

    public get listId(): IListIdField { return this._listId; }

    public get execId(): IExecutionIdField { return this._execId; }

    public get execTransType(): IExecutionTransactionTypeField { return this._execTransType; }

    public get execRefId(): IExecutionReferenceIdField { return this._execRefId; }

    public get ordStatus(): IOrderStatusField { return this._ordStatus; }

    public get ordRejReason(): IOrderRejectionReasonField { return this._ordRejReason; }

    public get account(): IAccountField { return this._account; }

    public get settlmntTyp(): ISettlementTypeField { return this._settlmntTyp; }

    public get futSettDate(): IFutureSettlementDateField { return this._futSettDate; }

    public get symbol(): ISymbolField { return this._symbol; }

    public get symbolSfx(): ISymbolSuffixField { return this._symbolSfx; }

    public get securityId(): ISecurityIdField { return this._securityId; }

    public get idSource(): IIdSourceField { return this._idSource; }

    public get side(): ISideField { return this._side; }

    public get orderQty(): IOrderQuantityField { return this._orderQty; }

    public get price(): IPriceField { return this._price; }

    public get stopPx(): IStopPriceField { return this._stopPx; }

    public get currency(): ICurrencyField { return this._currency; }

    public get timeInForce(): ITimeInForceField { return this._timeInForce; }

    public get execInst(): IExecutionInstructionsField[] { return this._execInst; }

    public get rule80A(): IRule80AField { return this._rule80A; }

    public get lastShares(): ILastSharesField { return this._lastShares; }

    public get lastPx(): ILastPriceField { return this._lastPx; }

    public get lastMkt(): ILastMarketField { return this._lastMkt; }

    public get lastCapacity(): ILastCapacityField { return this._lastCapacity; }

    public get cumQty(): ICumulativeQuantityField { return this._cumQty; }

    public get avgPx(): IAveragePriceField { return this._avgPx; }

    public get transactTime(): ITransactionTimeField { return this._transactTime; }

    public get text(): ITextField { return this._text; }


    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPE.execution_report;
    }

    protected construct(protoMessage: IProtoExecutionReportMessage): void {
        this._orderId       = protoMessage[Tag.OrderID];
        this._clOrdId       = protoMessage[Tag.ClOrdID];
        this._listId        = protoMessage[Tag.ListID];
        this._execId        = protoMessage[Tag.ExecID];
        this._execTransType = protoMessage[Tag.ExecTransType];
        this._execRefId     = protoMessage[Tag.ExecRefID];
        this._ordStatus     = protoMessage[Tag.OrdStatus];
        this._ordRejReason  = protoMessage[Tag.OrdRejReason];
        this._account       = protoMessage[Tag.Account];
        this._settlmntTyp   = protoMessage[Tag.SettlmntTyp];
        this._futSettDate   = protoMessage[Tag.FutSettDate];
        this._symbol        = protoMessage[Tag.Symbol];
        this._symbolSfx     = protoMessage[Tag.SymbolSfx];
        this._securityId    = protoMessage[Tag.SecurityID];
        this._idSource      = protoMessage[Tag.IDSource];
        this._side          = protoMessage[Tag.Side];
        this._orderQty      = protoMessage[Tag.OrderQty];
        this._price         = protoMessage[Tag.Price];
        this._stopPx        = protoMessage[Tag.StopPx];
        this._currency      = protoMessage[Tag.Currency];
        this._timeInForce   = protoMessage[Tag.TimeInForce];
        this._execInst      = protoMessage[Tag.ExecInst];
        this._rule80A       = protoMessage[Tag.Rule80A];
        this._lastShares    = protoMessage[Tag.LastShares];
        this._lastPx        = protoMessage[Tag.LastPX];
        this._lastMkt       = protoMessage[Tag.LastMkt];
        this._lastCapacity  = protoMessage[Tag.LastCapacity];
        this._cumQty        = protoMessage[Tag.CumQty];
        this._avgPx         = protoMessage[Tag.AvgPx];
        this._transactTime  = protoMessage[Tag.TransactTime];
        this._text          = protoMessage[Tag.Text];
    }

}
