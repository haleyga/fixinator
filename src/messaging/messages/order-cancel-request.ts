import { IAccountField } from '../fields/account/account';
import { Tag } from '../fields/base/tag';
import { ICancelOrderRequestIdField } from '../fields/cancel-order-request-id/cancel-order-request-id';
import { IClientOrderIdField } from '../fields/client-order-id/client-order-id';
import { ICommissionTypeField } from '../fields/commission-type/commission-type';
import { ICommissionField } from '../fields/commission/commission';
import { ICurrencyField } from '../fields/currency/currency';
import { IFutureSettlementDateField } from '../fields/future-settlement-date/future-settlement-date';
import { IHandlingInstructionsField } from '../fields/handling-instructions/handling-instructions';
import { IIdSourceField } from '../fields/id-source/id-source';
import { IListIdField } from '../fields/list-id/list-id';
import { MESSAGE_TYPE } from '../fields/message-type/message-type';
import { IOrderIdField } from '../fields/order-id/order-id';
import { IOrderQuantityField } from '../fields/order-quantity/order-quantity';
import { IOrderTypeField } from '../fields/order-type/order-type';
import { IPriceField } from '../fields/price/price';
import { IRule80AField } from '../fields/rule-80a/rule-80a';
import { ISecurityIdField } from '../fields/security-id/security-id';
import { ISettlementTypeField } from '../fields/settlement-type/settlement-type';
import { ISideField } from '../fields/side/side';
import { ISymbolSuffixField } from '../fields/symbol-suffix/symbol-suffix';
import { ISymbolField } from '../fields/symbol/symbol';
import { ITextField } from '../fields/text/text';
import { ITimeInForceField } from '../fields/time-in-force/time-in-force';
import {
    BaseApplicationMessage, IBaseApplicationMessage, IProtoBaseApplicationMessage, ProtoBaseApplicationMessage,
} from './base-application-message';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoOrderCancelRequestMessage extends IProtoBaseApplicationMessage {
    101: ICancelOrderRequestIdField;
    37?: IOrderIdField;
    11: IClientOrderIdField;
    66?: IListIdField;
    1?: IAccountField;
    63?: ISettlementTypeField;
    64?: IFutureSettlementDateField;
    21: IHandlingInstructionsField;
    55: ISymbolField;
    65?: ISymbolSuffixField;
    48?: ISecurityIdField;
    22?: IIdSourceField;
    54: ISideField;
    38: IOrderQuantityField;
    40: IOrderTypeField;
    44?: IPriceField;
    15?: ICurrencyField;
    59?: ITimeInForceField;
    12?: ICommissionField;
    13?: ICommissionTypeField;
    47?: IRule80AField;
    58?: ITextField;
}

// tslint:enable:no-magic-numbers

export class ProtoOrderCancelRequestMessage extends ProtoBaseApplicationMessage
    implements IProtoOrderCancelRequestMessage
{
    public 101: ICancelOrderRequestIdField = null;
    public 11: IClientOrderIdField         = null;
    public 21: IHandlingInstructionsField  = null;
    public 55: ISymbolField                = null;
    public 54: ISideField                  = null;
    public 38: IOrderQuantityField         = null;
    public 40: IOrderTypeField             = null;
}

export interface IOrderCancelRequestMessage extends IBaseApplicationMessage {
    cxlOrdReqId: ICancelOrderRequestIdField;
    orderID?: IOrderIdField;
    clOrdID: IClientOrderIdField;
    listId?: IListIdField;
    account?: IAccountField;
    settlmntTyp?: ISettlementTypeField;
    futSettDate?: IFutureSettlementDateField;
    handlInst: IHandlingInstructionsField;
    symbol: ISymbolField;
    symbolSfx?: ISymbolSuffixField;
    securityId?: ISecurityIdField;
    idSource?: IIdSourceField;
    side: ISideField;
    orderQty: IOrderQuantityField;
    ordType: IOrderTypeField;
    price?: IPriceField;
    currency?: ICurrencyField;
    timeInForce?: ITimeInForceField;
    commission?: ICommissionField;
    commType?: ICommissionTypeField;
    rule80A?: IRule80AField;
    text?: ITextField;
}

/**
 * The order cancel request message is used to request the cancellation of all remaining quantity of an existing order.
 *
 * Do not use this message to reduce the quantity of (i.e. partially cancel) an outstanding order, use the
 * Cancel/Replace Request for this purpose.
 *
 * The request will only be accepted if the order can successfully be pulled back from the exchange floor without
 * executing.
 *
 * The format of the cancel request message is:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = F
 *  101     CxlOrdReqId         Y           Unique ID of Cancel Request
 *  37      OrderID             N           Broker ID of original order
 *  11      ClOrdID             Y           Client ID of original order
 *  66      ListID              N           Required for List Orders
 *  1       Account             N
 *  63      SettlmntTyp         N           Absence of this field is interpreted as Regular.
 *  64      FutSettDate         N           Required when SettlmntTyp = 6 (Future) or SettlmntTyp = 8 (Sellers
 *                                          Option)
 *  21      HandlInst           Y
 *  55      Symbol              Y
 *  65      SymbolSfx           N
 *  48      SecurityID          N
 *  22      IDSource            N
 *  54      Side                Y
 *  38      OrderQty            Y
 *  40      OrdType             Y
 *  44      Price               N           Required for limit and stop OrdTypes
 *  15      Currency            N           Message without currency field is interpreted as US dollars
 *  59      TimeInForce         N           Absence of this field indicates Day order
 *  12      Commission          N
 *  13      CommType            N
 *  47      Rule80A             N
 *  58      Text                N
 *          <Standard Trailer>  Y
 */
export class OrderCancelRequestMessage extends BaseApplicationMessage implements IOrderCancelRequestMessage {

    private _cxlOrdReqId: ICancelOrderRequestIdField = null;
    private _orderID: IOrderIdField                  = null;
    private _clOrdID: IClientOrderIdField            = null;
    private _listId: IListIdField                    = null;
    private _account: IAccountField                  = null;
    private _settlmntTyp: ISettlementTypeField       = null;
    private _futSettDate: IFutureSettlementDateField = null;
    private _handlInst: IHandlingInstructionsField   = null;
    private _symbol: ISymbolField                    = null;
    private _symbolSfx: ISymbolSuffixField           = null;
    private _securityId: ISecurityIdField            = null;
    private _idSource: IIdSourceField                = null;
    private _side: ISideField                        = null;
    private _orderQty: IOrderQuantityField           = null;
    private _ordType: IOrderTypeField                = null;
    private _price: IPriceField                      = null;
    private _currency: ICurrencyField                = null;
    private _timeInForce: ITimeInForceField          = null;
    private _commission: ICommissionField            = null;
    private _commType: ICommissionTypeField          = null;
    private _rule80A: IRule80AField                  = null;
    private _text: ITextField                        = null;

    constructor(protoMessage: IProtoOrderCancelRequestMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    // Body Fields

    public get cxlOrdReqId(): ICancelOrderRequestIdField { return this._cxlOrdReqId; }

    public get orderID(): IOrderIdField { return this._orderID; }

    public get clOrdID(): IClientOrderIdField { return this._clOrdID; }

    public get listId(): IListIdField { return this._listId; }

    public get account(): IAccountField { return this._account; }

    public get settlmntTyp(): ISettlementTypeField { return this._settlmntTyp; }

    public get futSettDate(): IFutureSettlementDateField { return this._futSettDate; }

    public get handlInst(): IHandlingInstructionsField { return this._handlInst; }

    public get symbol(): ISymbolField { return this._symbol; }

    public get symbolSfx(): ISymbolSuffixField { return this._symbolSfx; }

    public get securityId(): ISecurityIdField { return this._securityId; }

    public get idSource(): IIdSourceField { return this._idSource; }

    public get side(): ISideField { return this._side; }

    public get orderQty(): IOrderQuantityField { return this._orderQty; }

    public get ordType(): IOrderTypeField { return this._ordType; }

    public get price(): IPriceField { return this._price; }

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

        return this._msgType.formatted === MESSAGE_TYPE.order_cancel_request;
    }

    protected construct(protoMessage: IProtoOrderCancelRequestMessage): void {
        this._cxlOrdReqId = protoMessage[Tag.CxlOrdReqId];
        this._orderID     = protoMessage[Tag.OrderID];
        this._clOrdID     = protoMessage[Tag.ClOrdID];
        this._listId      = protoMessage[Tag.ListID];
        this._account     = protoMessage[Tag.Account];
        this._settlmntTyp = protoMessage[Tag.SettlmntTyp];
        this._futSettDate = protoMessage[Tag.FutSettDate];
        this._handlInst   = protoMessage[Tag.HandlInst];
        this._symbol      = protoMessage[Tag.Symbol];
        this._symbolSfx   = protoMessage[Tag.SymbolSfx];
        this._securityId  = protoMessage[Tag.SecurityID];
        this._idSource    = protoMessage[Tag.IDSource];
        this._side        = protoMessage[Tag.Side];
        this._orderQty    = protoMessage[Tag.OrderQty];
        this._ordType     = protoMessage[Tag.OrdType];
        this._price       = protoMessage[Tag.Price];
        this._currency    = protoMessage[Tag.Currency];
        this._timeInForce = protoMessage[Tag.TimeInForce];
        this._commission  = protoMessage[Tag.Commission];
        this._commType    = protoMessage[Tag.CommType];
        this._rule80A     = protoMessage[Tag.Rule80A];
        this._text        = protoMessage[Tag.Text];
    }
}
