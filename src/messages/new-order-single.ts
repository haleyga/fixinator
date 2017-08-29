import { IAccountField } from '../fields/account/account';
import { IClientOrderIdField } from '../fields/client-order-id/client-order-id';
import { ICommissionTypeField } from '../fields/commission-type/commission-type';
import { ICommissionField } from '../fields/commission/commission';
import { ICurrencyField } from '../fields/currency/currency';
import { IExecutionDestinationField } from '../fields/execution-destination/execution-destination';
import { IExecutionInstructionsField } from '../fields/execution-instructions/execution-instructions';
import { IFutureSettlementDateField } from '../fields/future-settlement-date/future-settlement-date';
import { IHandlingInstructionsField } from '../fields/handling-instructions/handling-instructions';
import { IIdSourceField } from '../fields/id-source/id-source';
import { MESSAGE_TYPES } from '../fields/message-type/message-type';
import { IOrderQuantityField } from '../fields/order-quantity/order-quantity';
import { IOrderTypeField } from '../fields/order-type/order-type';
import { IPriceField } from '../fields/price/price';
import { IProcessCodeField } from '../fields/process-code/process-code';
import { IRule80AField } from '../fields/rule-80a/rule-80a';
import { ISecurityIdField } from '../fields/security-id/security-id';
import { ISettlementTypeField } from '../fields/settlement-type/settlement-type';
import { ISideField } from '../fields/side/side';
import { IStopPriceField } from '../fields/stop-price/stop-price';
import { ISymbolSuffixField } from '../fields/symbol-suffix/symbol-suffix';
import { ISymbolField } from '../fields/symbol/symbol';
import { ITextField } from '../fields/text/text';
import { ITimeInForceField } from '../fields/time-in-force/time-in-force';
import { BaseApplicationMessage, IBaseApplicationMessage } from './base-application-message';

export interface INewOrderSingleMessage extends IBaseApplicationMessage {
    clOrdId: IClientOrderIdField;
    account?: IAccountField;
    settlmntTyp?: ISettlementTypeField;
    futSettDate?: IFutureSettlementDateField;
    handlInst: IHandlingInstructionsField;
    execInst?: IExecutionInstructionsField;
    exDestination?: IExecutionDestinationField;
    processCode?: IProcessCodeField;
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
 * The new order message type is used by institutions wishing to electronically submit orders to a broker for execution.
 *
 * Orders can be submitted with special handling instructions and execution instructions. Handling instructions refer
 * to how the broker should handle the order on its trading floor (see HandInst field). Execution instructions refer
 * to how the order should be handled at the exchange (see ExecInst field).
 *
 * The format for the new order message is as follows:
 *
 *  Tag     Field Name          Required?   Comments
 *  --------------------------------------------------------------------------------------------------------------------
 *          <Standard Header>   Y           MsgType = D
 *  11      CLOrdID             Y
 *  1       Account             N
 *  63      SettlmntTyp         N           Absence of this field is interpreted as Regular.
 *  64      FutSettDate         N           Required when SettlmntTyp = 6 (Future) or SettlmntTyp = 8 (Sellers Option)
 *  21      HandlInst           Y
 *  18      ExecInst            N           Can be defined multiple times for complex orders.
 *  100     ExDestination       N
 *  81      ProcessCode         N           Used to identify soft trades at order entry.
 *  55      Symbol              Y
 *  65      SymbolSfx           N
 *  48      SecurityID          N
 *  22      IDSource            N
 *  54      Side                Y
 *  38      OrderQty            Y
 *  40      OrderType           Y
 *  44      Price               N           Required for limit OrdTypes
 *  99      StopPx              N           Required for stop OrdTypes
 *  15      Currency            N           Message without currency field is interpreted as US dollars
 *  59      TimeInForce         N           Absence of this field indicates Day order
 *  12      Commission          N
 *  13      CommType            N
 *  47      Rule80A             N
 *  58      Text                N
 *          <Standard Trailer>  Y
 */
export class NewOrderSingleMessage extends BaseApplicationMessage implements INewOrderSingleMessage {

    private _clOrdId: IClientOrderIdField              = null;
    private _account: IAccountField                    = null;
    private _settlmntTyp: ISettlementTypeField         = null;
    private _futSettDate: IFutureSettlementDateField   = null;
    private _handlInst: IHandlingInstructionsField     = null;
    private _execInst: IExecutionInstructionsField     = null;
    private _exDestination: IExecutionDestinationField = null;
    private _processCode: IProcessCodeField            = null;
    private _symbol: ISymbolField                      = null;
    private _symbolSfx: ISymbolSuffixField             = null;
    private _securityId: ISecurityIdField              = null;
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

    constructor(raw: string) {
        super(raw);
    }

    // Body Fields

    public get clOrdId(): IClientOrderIdField {
        return this._clOrdId;
    }

    public set clOrdId(value: IClientOrderIdField) {
        this._clOrdId = value;
    }

    public get account(): IAccountField {
        return this._account;
    }

    public set account(value: IAccountField) {
        this._account = value;
    }

    public get settlmntTyp(): ISettlementTypeField {
        return this._settlmntTyp;
    }

    public set settlmntTyp(value: ISettlementTypeField) {
        this._settlmntTyp = value;
    }

    public get futSettDate(): IFutureSettlementDateField {
        return this._futSettDate;
    }

    public set futSettDate(value: IFutureSettlementDateField) {
        this._futSettDate = value;
    }

    public get handlInst(): IHandlingInstructionsField {
        return this._handlInst;
    }

    public set handlInst(value: IHandlingInstructionsField) {
        this._handlInst = value;
    }

    public get execInst(): IExecutionInstructionsField {
        return this._execInst;
    }

    public set execInst(value: IExecutionInstructionsField) {
        this._execInst = value;
    }

    public get exDestination(): IExecutionDestinationField {
        return this._exDestination;
    }

    public set exDestination(value: IExecutionDestinationField) {
        this._exDestination = value;
    }

    public get processCode(): IProcessCodeField {
        return this._processCode;
    }

    public set processCode(value: IProcessCodeField) {
        this._processCode = value;
    }

    public get symbol(): ISymbolField {
        return this._symbol;
    }

    public set symbol(value: ISymbolField) {
        this._symbol = value;
    }

    public get symbolSfx(): ISymbolSuffixField {
        return this._symbolSfx;
    }

    public set symbolSfx(value: ISymbolSuffixField) {
        this._symbolSfx = value;
    }

    public get securityId(): ISecurityIdField {
        return this._securityId;
    }

    public set securityId(value: ISecurityIdField) {
        this._securityId = value;
    }

    public get idSource(): IIdSourceField {
        return this._idSource;
    }

    public set idSource(value: IIdSourceField) {
        this._idSource = value;
    }

    public get side(): ISideField {
        return this._side;
    }

    public set side(value: ISideField) {
        this._side = value;
    }

    public get orderQty(): IOrderQuantityField {
        return this._orderQty;
    }

    public set orderQty(value: IOrderQuantityField) {
        this._orderQty = value;
    }

    public get ordType(): IOrderTypeField {
        return this._ordType;
    }

    public set ordType(value: IOrderTypeField) {
        this._ordType = value;
    }

    public get price(): IPriceField {
        return this._price;
    }

    public set price(value: IPriceField) {
        this._price = value;
    }

    public get stopPx(): IStopPriceField {
        return this._stopPx;
    }

    public set stopPx(value: IStopPriceField) {
        this._stopPx = value;
    }

    public get currency(): ICurrencyField {
        return this._currency;
    }

    public set currency(value: ICurrencyField) {
        this._currency = value;
    }

    public get timeInForce(): ITimeInForceField {
        return this._timeInForce;
    }

    public set timeInForce(value: ITimeInForceField) {
        this._timeInForce = value;
    }

    public get commission(): ICommissionField {
        return this._commission;
    }

    public set commission(value: ICommissionField) {
        this._commission = value;
    }

    public get commType(): ICommissionTypeField {
        return this._commType;
    }

    public set commType(value: ICommissionTypeField) {
        this._commType = value;
    }

    public get rule80A(): IRule80AField {
        return this._rule80A;
    }

    public set rule80A(value: IRule80AField) {
        this._rule80A = value;
    }

    public get text(): ITextField {
        return this._text;
    }

    public set text(value: ITextField) {
        this._text = value;
    }

    // Validation

    // TODO: validate message more completely
    public validate(): boolean {
        if (!(this.validateHeader() && this.validateTrailer())) return false;

        return this._msgType.formatted === MESSAGE_TYPES.order_single;
    }
}
