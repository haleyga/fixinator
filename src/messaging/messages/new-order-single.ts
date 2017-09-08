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
import { MESSAGE_TYPE } from '../fields/message-type/message-type';
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
import {
    BaseApplicationMessage, IBaseApplicationMessage, IProtoBaseApplicationMessage, ProtoBaseApplicationMessage,
} from './base-application-message';

// FIXME: Once TypeScript supports the use of enums as a type signature, redo these magic numbers!
//tslint:disable:no-magic-numbers
export interface IProtoNewOrderSingleMessage extends IProtoBaseApplicationMessage {
    11: IClientOrderIdField;
    1?: IAccountField;
    63?: ISettlementTypeField;
    64?: IFutureSettlementDateField;
    21: IHandlingInstructionsField;
    18?: IExecutionInstructionsField[];
    100?: IExecutionDestinationField;
    81?: IProcessCodeField;
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

export class ProtoNewOrderSingleMessage extends ProtoBaseApplicationMessage implements IProtoNewOrderSingleMessage {
    public 11: IClientOrderIdField        = null;
    public 21: IHandlingInstructionsField = null;
    public 55: ISymbolField               = null;
    public 54: ISideField                 = null;
    public 38: IOrderQuantityField        = null;
    public 40: IOrderTypeField            = null;
}

export interface INewOrderSingleMessage extends IBaseApplicationMessage {
    clOrdId: IClientOrderIdField;
    account?: IAccountField;
    settlmntTyp?: ISettlementTypeField;
    futSettDate?: IFutureSettlementDateField;
    handlInst: IHandlingInstructionsField;
    execInst?: IExecutionInstructionsField[];
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
    private _execInst: IExecutionInstructionsField[]   = null;
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

    constructor(protoMessage: IProtoNewOrderSingleMessage) {
        super(protoMessage);

        this.construct(protoMessage);
    }

    // Body Fields

    public get clOrdId(): IClientOrderIdField { return this._clOrdId; }

    public get account(): IAccountField { return this._account; }

    public get settlmntTyp(): ISettlementTypeField { return this._settlmntTyp; }

    public get futSettDate(): IFutureSettlementDateField { return this._futSettDate; }

    public get handlInst(): IHandlingInstructionsField { return this._handlInst; }

    public get execInst(): IExecutionInstructionsField[] { return this._execInst; }

    public get exDestination(): IExecutionDestinationField { return this._exDestination; }

    public get processCode(): IProcessCodeField { return this._processCode; }

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

        return this._msgType.formatted === MESSAGE_TYPE.order_single;
    }

    protected construct(protoMessage: IProtoNewOrderSingleMessage): void {
        this._clOrdId       = protoMessage[Tag.ClOrdID];
        this._account       = protoMessage[Tag.Account];
        this._settlmntTyp   = protoMessage[Tag.SettlmntTyp];
        this._futSettDate   = protoMessage[Tag.FutSettDate];
        this._handlInst     = protoMessage[Tag.HandlInst];
        this._execInst      = protoMessage[Tag.ExecInst];
        this._exDestination = protoMessage[Tag.ExDestination];
        this._processCode   = protoMessage[Tag.ProcessCode];
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
