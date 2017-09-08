import { IAccountField } from '../fields/account/account';
import { Tag } from '../fields/base/tag';
import { IClientOrderIdField } from '../fields/client-order-id/client-order-id';
import { ICommissionTypeField } from '../fields/commission-type/commission-type';
import { ICommissionField } from '../fields/commission/commission';
import { ICurrencyField } from '../fields/currency/currency';
import { IExecutionDestinationField } from '../fields/execution-destination/execution-destination';
import { IExecutionInstructionsField } from '../fields/execution-instructions/execution-instructions';
import { IFutureSettlementDateField } from '../fields/future-settlement-date/future-settlement-date';
import { IHandlingInstructionsField } from '../fields/handling-instructions/handling-instructions';
import { IIdSourceField } from '../fields/id-source/id-source';
import { IListExecutionInstructionsField } from '../fields/list-execution-instructions/list-execution-instructions';
import { IListIdField } from '../fields/list-id/list-id';
import { IListNumberOfOrdersField } from '../fields/list-number-of-orders/list-number-of-orders';
import { IListSequenceNumberField } from '../fields/list-sequence-number/list-sequence-number';
import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import { IOrderQuantityField } from '../fields/order-quantity/order-quantity';
import { IOrderTypeField } from '../fields/order-type/order-type';
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
import {
    BaseApplicationMessage, IBaseApplicationMessage, IProtoBaseApplicationMessage, ProtoBaseApplicationMessage,
} from './base-application-message';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoNewOrderListMessage extends IProtoBaseApplicationMessage {
    66: IListIdField;
    67: IListSequenceNumberField;
    68: IListNumberOfOrdersField;
    69?: IListExecutionInstructionsField;
    11: IClientOrderIdField;
    1?: IAccountField;
    63?: ISettlementTypeField;
    64?: IFutureSettlementDateField;
    21: IHandlingInstructionsField;
    18?: IExecutionInstructionsField[];
    100?: IExecutionDestinationField;
    55: ISymbolField;
    65?: ISymbolSuffixField;
    48?: ISecurityIdField;
    22?: IIdSourceField;
    54: ISideField;
    38: IOrderQuantityField;
    40: IOrderTypeField;
    44?: IPriceField;
    99?: IStopPriceField;
    15?: ICurrencyField;
    59?: ITimeInForceField;
    12?: ICommissionField;
    13?: ICommissionTypeField;
    47?: IRule80AField;
    58?: ITextField;
}

// tslint:enable:no-magic-numbers

export class ProtoNewOrderListMessage extends ProtoBaseApplicationMessage implements IProtoNewOrderListMessage {
    public 66: IListIdField               = null;
    public 67: IListSequenceNumberField   = null;
    public 68: IListNumberOfOrdersField   = null;
    public 11: IClientOrderIdField        = null;
    public 21: IHandlingInstructionsField = null;
    public 55: ISymbolField               = null;
    public 54: ISideField                 = null;
    public 38: IOrderQuantityField        = null;
    public 40: IOrderTypeField            = null;
}

export interface INewOrderListMessage extends IBaseApplicationMessage {
    listId: IListIdField;
    listSeqNo: IListSequenceNumberField;
    listNoOrds: IListNumberOfOrdersField;
    listExecInst?: IListExecutionInstructionsField;
    clOrdId: IClientOrderIdField;
    account?: IAccountField;
    settlemntTyp?: ISettlementTypeField;
    futSettDate?: IFutureSettlementDateField;
    handlInst: IHandlingInstructionsField;
    execInst?: IExecutionInstructionsField[];
    exDestination?: IExecutionDestinationField;
    symbol: ISymbolField;
    symbolSfx?: ISymbolSuffixField;
    securityId?: ISecurityIdField;
    idSource?: IIdSourceField;
    side: ISideField;
    orderQty: IOrderQuantityField;
    ordType: IOrderTypeField;
    price?: IPriceField;
    stopPx?: IStopPriceField;
    currency?: ICurrencyField;
    timeInForce?: ITimeInForceField;
    commission?: ICommissionField;
    commType?: ICommissionTypeField;
    rule80A?: IRule80AField;
    text?: ITextField;
}

/**
 * The new order list message type is used by institutions wishing to electronically submit lists of related orders
 * to a broker for execution.
 *
 * The New Order List is intended for use in staging lists to be executed by the broker. If the institution wishes to
 * work a list using the broker's execution services the orders should be submitted as individual New Order - Single's.
 *
 * After staging, the list can be operated on in the following ways:
 *
 *  Execute: The broker can be instructed to release the list for execution by sending the List- Execute message.
 *
 *  Cancel: After the list has been staged with the broker, it can be cancelled via the submission of the List Cancel
 *          message. If the list has not yet been submitted for execution, the List Cancel message will instruct the
 *          broker not to execute it, if the list is being executed, the List Cancel message should trigger the
 *          broker's system to generate cancel requests for the remaining quantities of each order within the list.
 *          Individual orders within the list can be cancelled via the Order Cancel Request message.
 *
 *  Status: A status of the list can requested via the submission of the List-Status Request message. The broker will
 *          respond with one or more List-Status messages which will report executed quantity, cancelled quantity
 *          and average price for each order in the list.
 *
 *  Replace: Individual orders within the list can be replaced via Order Cancel/Replace Request messages.
 *
 * Executions against orders within the list will not normally be reported as they occur. (If this feature is desired
 * the institution and broker should arrange for this reporting as a custom feature using the Execution message.)
 * Executions against the list will be reported within the List-Status message.
 *
 * The format for the new order list message is as follows:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = E
 *  66      ListID              Y           Must be unique, by customer, for the day
 *  67      ListSeqNo           Y
 *  68      ListNoOrds          Y
 *  69      ListExecInst        N           Include only in ListSeqNo = 1 message
 *  11      ClOrdID             Y
 *  1       Account             N
 *  63      SettlmntTyp         N           Absence of this field is interpreted as Regular.
 *  64      FutSettDate         N           Required when SettlmntTyp = 6 (Future) or SettlmntTyp = 8 (Sellers Option)
 *  21      HandlInst           Y
 *  18      * ExecInst          N           Can be defined multiple times for complex orders.
 *  100     ExDestination       N
 *  55      Symbol              Y
 *  65      SymbolSfx           N
 *  48      SecurityID          N
 *  22      IDSource            N
 *  54      Side                Y
 *  38      OrderQty            Y
 *  40      OrdType             Y
 *  44      Price               N           Required for limit OrdTypes
 *  99      StopPx              N           Required for stop OrdTypes
 *  15      Currency            N           Message without currency field is interpreted as US dollars
 *  59      TimeInForce         N           Absence of the field indicates Day order
 *  12      Commission          N
 *  13      CommType            N
 *  47      Rule80A             N
 *  58      Text                N
 *          <Standard Trailer>  Y
 */
export class NewOrderListMessage extends BaseApplicationMessage implements INewOrderListMessage {

    private _listId: IListIdField                          = null;
    private _listSeqNo: IListSequenceNumberField           = null;
    private _listNoOrds: IListNumberOfOrdersField          = null;
    private _listExecInst: IListExecutionInstructionsField = null;
    private _clOrdId: IClientOrderIdField                  = null;
    private _account: IAccountField                        = null;
    private _settlemntTyp: ISettlementTypeField            = null;
    private _futSettDate: IFutureSettlementDateField       = null;
    private _handlInst: IHandlingInstructionsField         = null;
    private _execInst: IExecutionInstructionsField[]       = null;
    private _exDestination: IExecutionDestinationField     = null;
    private _symbol: ISymbolField                          = null;
    private _symbolSfx: ISymbolSuffixField                 = null;
    private _securityId: ISecurityIdField                  = null;
    private _idSource: IIdSourceField                      = null;
    private _side: ISideField                              = null;
    private _orderQty: IOrderQuantityField                 = null;
    private _ordType: IOrderTypeField                      = null;
    private _price: IPriceField                            = null;
    private _stopPx: IStopPriceField                       = null;
    private _currency: ICurrencyField                      = null;
    private _timeInForce: ITimeInForceField                = null;
    private _commission: ICommissionField                  = null;
    private _commType: ICommissionTypeField                = null;
    private _rule80A: IRule80AField                        = null;
    private _text: ITextField                              = null;

    constructor(protoMessage: IProtoNewOrderListMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    // Body Fields

    public get listId(): IListIdField { return this._listId; }

    public get listSeqNo(): IListSequenceNumberField { return this._listSeqNo; }

    public get listNoOrds(): IListNumberOfOrdersField { return this._listNoOrds; }

    public get listExecInst(): IListExecutionInstructionsField { return this._listExecInst; }

    public get clOrdId(): IClientOrderIdField { return this._clOrdId; }

    public get account(): IAccountField { return this._account; }

    public get settlemntTyp(): ISettlementTypeField { return this._settlemntTyp; }

    public get futSettDate(): IFutureSettlementDateField { return this._futSettDate; }

    public get handlInst(): IHandlingInstructionsField { return this._handlInst; }

    public get execInst(): IExecutionInstructionsField[] { return this._execInst; }

    public get exDestination(): IExecutionDestinationField { return this._exDestination; }

    public get symbol(): ISymbolField { return this._symbol; }

    public get symbolSfx(): ISymbolSuffixField { return this._symbolSfx; }

    public get securityId(): ISecurityIdField { return this._securityId; }

    public get idSource(): IIdSourceField { return this._idSource; }

    public get side(): ISideField { return this._side; }

    public get orderQty(): IOrderQuantityField { return this._orderQty; }

    public get ordType(): IOrderTypeField { return this._ordType; }

    public get price(): IPriceField { return this._price; }

    public get stopPx(): IStopPriceField { return this._stopPx; }

    public get currency(): ICurrencyField { return this._currency; }

    public get timeInForce(): ITimeInForceField { return this._timeInForce; }

    public get commission(): ICommissionField { return this._commission; }

    public get commType(): ICommissionTypeField { return this._commType; }

    public get rule80A(): IRule80AField { return this._rule80A; }

    public get text(): ITextField { return this._text; }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPE.order_list;
    }

    protected construct(protoMessage: IProtoNewOrderListMessage): void {
        this._listId        = protoMessage[Tag.ListID];
        this._listSeqNo     = protoMessage[Tag.ListSeqNo];
        this._listNoOrds    = protoMessage[Tag.ListNoOrds];
        this._listExecInst  = protoMessage[Tag.ListExecInst];
        this._clOrdId       = protoMessage[Tag.ClOrdID];
        this._account       = protoMessage[Tag.Account];
        this._settlemntTyp  = protoMessage[Tag.SettlmntTyp];
        this._futSettDate   = protoMessage[Tag.FutSettDate];
        this._handlInst     = protoMessage[Tag.HandlInst];
        this._execInst      = protoMessage[Tag.ExecInst];
        this._exDestination = protoMessage[Tag.ExDestination];
        this._symbol        = protoMessage[Tag.Symbol];
        this._symbolSfx     = protoMessage[Tag.SymbolSfx];
        this._securityId    = protoMessage[Tag.SecurityID];
        this._idSource      = protoMessage[Tag.IDSource];
        this._side          = protoMessage[Tag.Side];
        this._orderQty      = protoMessage[Tag.OrderQty];
        this._ordType       = protoMessage[Tag.OrdType];
        this._price         = protoMessage[Tag.Price];
        this._stopPx        = protoMessage[Tag.StopPx];
        this._currency      = protoMessage[Tag.Currency];
        this._timeInForce   = protoMessage[Tag.TimeInForce];
        this._commission    = protoMessage[Tag.Commission];
        this._commType      = protoMessage[Tag.CommType];
        this._rule80A       = protoMessage[Tag.Rule80A];
        this._text          = protoMessage[Tag.Text];
    }
}
