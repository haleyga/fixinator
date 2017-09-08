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
import { IListIdField } from '../fields/list-id/list-id';
import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import { IOrderIdField } from '../fields/order-id/order-id';
import { IOrderQuantityField } from '../fields/order-quantity/order-quantity';
import { IOrderTypeField } from '../fields/order-type/order-type';
import { IOriginalClientOrderIdField } from '../fields/original-client-order-id/original-client-order-id';
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
export interface IProtoOrderCancelReplaceRequestMessage extends IProtoBaseApplicationMessage {
    37?: IOrderIdField;
    41: IOriginalClientOrderIdField;
    11: IClientOrderIdField;
    66?: IListIdField;
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

export class ProtoOrderCancelReplaceRequestMessage extends ProtoBaseApplicationMessage
    implements IProtoOrderCancelReplaceRequestMessage
{
    public 41: IOriginalClientOrderIdField = null;
    public 11: IClientOrderIdField         = null;
    public 21: IHandlingInstructionsField  = null;
    public 55: ISymbolField                = null;
    public 54: ISideField                  = null;
    public 38: IOrderQuantityField         = null;
    public 40: IOrderTypeField             = null;
}

export interface IOrderCancelReplaceRequestMessage extends IBaseApplicationMessage {
    orderID?: IOrderIdField;
    origClOrdID: IOriginalClientOrderIdField;
    clOrdID: IClientOrderIdField;
    listID?: IListIdField;
    account?: IAccountField;
    settlmntTyp?: ISettlementTypeField;
    futSettDate?: IFutureSettlementDateField;
    handlInst: IHandlingInstructionsField;
    execInst?: IExecutionInstructionsField[];
    exDestination?: IExecutionDestinationField;
    symbol: ISymbolField;
    symbolSfx?: ISymbolSuffixField;
    securityID?: ISecurityIdField;
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
 * The order cancel/replace request is used to change the parameters of an existing order.
 *
 * Do not use this message to cancel the remaining quantity of an outstanding order, use the Cancel Request for this
 * purpose.
 *
 * The request will only be accepted if the order can successfully be pulled back from the exchange floor without
 * executing.
 *
 * Only a limited number of fields can be changed via the cancel/replace request message. These fields are:
 *  • ExecInst
 *  • OrderQty
 *  • OrdPx
 *  • TimeInForce
 *
 * The format of the cancel request message is:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = G
 *  37      OrderID             N           Unique identifier of original order as assigned by broker
 *  41      OrigClOrdID         Y           Unique identifier of original order as assigned by institution.
 *  11      ClOrdID             Y           Unique identifier of replacement order as assigned by institution
 *  66      ListID              N           Required for List Orders
 *  1       Account             N
 *  63      SettlmntTyp         N           Absence of this field is interpreted as Regular.
 *  64      FutSettDate         N           Required when SettlmntTyp = 6 (Future) or SettlmntTyp = 8 (Sellers
 *                                          Option)
 *  21      HandlInst           Y           Must match original order
 *  18      * ExecInst            N           Can be defined multiple times for complex orders. Replacement order will
 *                                          be created with new parameters (i.e. original order values will not be
 *                                          brought forward to replacement order unless redefined within this message).
 *  100     ExDestination       N
 *  55      Symbol              Y           Must match original order
 *  65      SymbolSfx           N
 *  48      SecurityID          N           Must match original order
 *  22      IDSource            N           Must match original order
 *  54      Side                Y           Must match original side, however, Buy and Buy Minus can be interchanged
 *                                          as well as Sell and Sell Plus
 *  38      OrderQty            Y
 *  40      OrdType             Y
 *  44      Price               N           Required for limit OrdTypes
 *  99      StopPx              N           Required for stop OrdTypes
 *  15      Currency            N           Message without currency field is interpreted as US dollars. Must match
 *                                          original order.
 *  59      TimeInForce         N           Absence of this field indicates Day order
 *  12      Commission          N
 *  13      CommType            N
 *  47      Rule80A             N           Must match original order
 *  58      Text                N
 *          <Standard Trailer>  Y
 */
export class OrderCancelReplaceRequestMessage extends BaseApplicationMessage
    implements IOrderCancelReplaceRequestMessage {

    private _orderID: IOrderIdField                    = null;
    private _origClOrdID: IOriginalClientOrderIdField  = null;
    private _clOrdID: IClientOrderIdField              = null;
    private _listID: IListIdField                      = null;
    private _account: IAccountField                    = null;
    private _settlmntTyp: ISettlementTypeField         = null;
    private _futSettDate: IFutureSettlementDateField   = null;
    private _handlInst: IHandlingInstructionsField     = null;
    private _execInst: IExecutionInstructionsField[]   = null;
    private _exDestination: IExecutionDestinationField = null;
    private _symbol: ISymbolField                      = null;
    private _symbolSfx: ISymbolSuffixField             = null;
    private _securityID: ISecurityIdField              = null;
    private _idSource: IIdSourceField                  = null;
    private _side: ISideField                          = null;
    private _orderQty: IOrderQuantityField             = null;
    private _ordType: IOrderTypeField                  = null;
    private _price: IPriceField                        = null;
    private _stopPx: IStopPriceField                   = null;
    private _currency: ICurrencyField                  = null;
    private _timeInForce: ITimeInForceField            = null;
    private _commission: ICommissionField              = null;
    private _commType: ICommissionTypeField            = null;
    private _rule80A: IRule80AField                    = null;
    private _text: ITextField                          = null;

    constructor(protoMessage: IProtoOrderCancelReplaceRequestMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    // Body Fields

    public get orderID(): IOrderIdField { return this._orderID; }

    public get origClOrdID(): IOriginalClientOrderIdField { return this._origClOrdID; }

    public get clOrdID(): IClientOrderIdField { return this._clOrdID; }

    public get listID(): IListIdField { return this._listID; }

    public get account(): IAccountField { return this._account; }

    public get settlmntTyp(): ISettlementTypeField { return this._settlmntTyp; }

    public get futSettDate(): IFutureSettlementDateField { return this._futSettDate; }

    public get handlInst(): IHandlingInstructionsField { return this._handlInst; }

    public get execInst(): IExecutionInstructionsField[] { return this._execInst; }

    public get exDestination(): IExecutionDestinationField { return this._exDestination; }

    public get symbol(): ISymbolField { return this._symbol; }

    public get symbolSfx(): ISymbolSuffixField { return this._symbolSfx; }

    public get securityID(): ISecurityIdField { return this._securityID; }

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

        return this._msgType.formatted === MESSAGE_TYPE.order_cancel_replace_request;
    }

    protected construct(protoMessage: IProtoOrderCancelReplaceRequestMessage): void {
        this._orderID       = protoMessage[Tag.OrderID];
        this._origClOrdID   = protoMessage[Tag.OrigClOrdID];
        this._clOrdID       = protoMessage[Tag.ClOrdID];
        this._listID        = protoMessage[Tag.ListID];
        this._account       = protoMessage[Tag.Account];
        this._settlmntTyp   = protoMessage[Tag.SettlmntTyp];
        this._futSettDate   = protoMessage[Tag.FutSettDate];
        this._handlInst     = protoMessage[Tag.HandlInst];
        this._execInst      = protoMessage[Tag.ExecInst];
        this._exDestination = protoMessage[Tag.ExDestination];
        this._symbol        = protoMessage[Tag.Symbol];
        this._symbolSfx     = protoMessage[Tag.SymbolSfx];
        this._securityID    = protoMessage[Tag.SecurityID];
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
